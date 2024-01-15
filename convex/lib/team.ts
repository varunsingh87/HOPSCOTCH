import { GenericDatabaseReader, GenericDatabaseWriter } from 'convex/server'
import { DataModel, Doc, Id } from '../_generated/dataModel'
import { RequestValidity } from '../../shared/info'
import { ConvexError } from 'convex/values'

/**
 * Lists the teams and competition a user is in
 * @param db The database object. Note: must be a writer for the above side effect
 * @param user The user whose teams/competitions are getting listed
 */
export async function listOwnParticipations(
  db: GenericDatabaseReader<DataModel>,
  user: Doc<'users'>
) {
  const participations = await db
    .query('participants')
    .withIndex('by_user', (q) => q.eq('user', user._id))
    .collect()

  return Promise.all(
    participations.map(async (item) => {
      const team = await db.get(item.team)
      if (!team) return [] // Skip if the team does not exist

      const competition = await db.get(team.competition)
      if (!competition) return [] // Skip if the competition does not exist

      return [
        {
          participation: item,
          team,
          competition,
        },
      ]
    })
  ).then((item) => item.flat())
}

/**
 * Efficient utility function for getting the information about a team given a user and competition
 * @param db The database reader object
 * @param user A user on the team
 * @param competition The competition this team is entered in
 * @return object containing information about team or false if the team does not exist
 */
export async function findTeamOfUser(
  db: GenericDatabaseReader<DataModel>,
  user: Doc<'users'>,
  competition: Id<'competitions'>
) {
  const ownParticipations = await listOwnParticipations(db, user)
  const currentParticipation = ownParticipations.find(
    (item) => item?.competition?._id == competition
  )
  if (!currentParticipation || !currentParticipation.team) return false

  const teamAndMembers = await verifyTeam(db, currentParticipation.team._id)

  return {
    ...teamAndMembers,
    userMembership: currentParticipation.participation,
  }
}

/**
 * Determines whether a join *request* for a user to a team is valid or invalid
 * and specifies the invalidity of the request
 *
 * Precondition: The team exists
 * @param db The database
 * @param inviterTeam The team that the user would like to join
 * @param joiner The user who would like to join the team
 * @return The validity of the join request
 *
 * @throws Error If one of the following conditions is true:
 * - The user is not in the competition that the team is in
 */
export async function validateTeamJoinRequest(
  db: GenericDatabaseReader<DataModel>,
  inviterTeam: Doc<'teams'>,
  joiner: Doc<'users'>
): Promise<RequestValidity> {
  const inviterTeamParticipants = await db
    .query('participants')
    .withIndex('by_team', (q) => q.eq('team', inviterTeam._id))
    .collect()
  const requestorMembership = inviterTeamParticipants.findIndex(
    (item) => item.user == joiner._id
  )
  if (requestorMembership > -1) {
    return RequestValidity.BACKWARDS
  }

  if (inviterTeamParticipants.length >= 4) {
    return RequestValidity.FULL
  }

  const joinerTeam = await findTeamOfUser(db, joiner, inviterTeam.competition)
  if (!joinerTeam) {
    throw new ConvexError('The user is not in the competition')
  }
  if (joinerTeam.members.length > 1) {
    return RequestValidity.COMMITTED
  }

  const joinRequest = inviterTeam.joinRequests.find(
    (item) => item.user == joiner._id
  )
  if (!joinRequest) {
    return RequestValidity.VALID
  } else if (joinRequest.teamConsent && joinRequest.userConsent) {
    return RequestValidity.ACCEPTED
  } else if (joinRequest.teamConsent && !joinRequest.userConsent) {
    return RequestValidity.INVITED
  } else if (!joinRequest.teamConsent && joinRequest.userConsent) {
    return RequestValidity.REQUESTED
  } else {
    return RequestValidity.VALID
  }
}

/**
 * Adds the user to a team and clears the join request
 *
 * Preconditions:
 *  - Both parties have consented to adding the user (a join request indicating this exists for the team)
 *  - User is in the competition
 *
 * Postconditions:
 * - The join request for the user to the team no longer exists
 * - the user's team is team
 * @param db The database object
 * @param user The user joining the team
 * @param invitingTeam The team the user will be added to
 * @throws ConvexError If the preconditions are not met
 */
export async function addUserToTeam(
  db: GenericDatabaseWriter<DataModel>,
  user: Doc<'users'>,
  invitingTeam: Doc<'teams'>
) {
  const joinRequestIndex = invitingTeam.joinRequests.findIndex(
    (item) => item.user == user._id
  )
  const joinRequest = invitingTeam.joinRequests[joinRequestIndex]

  if (
    joinRequestIndex < 0 ||
    !joinRequest.teamConsent ||
    !joinRequest.userConsent
  ) {
    throw new ConvexError(
      'At least one party has not consented to the user joining the team'
    )
  }

  // Clear join request
  delete invitingTeam.joinRequests[joinRequestIndex]
  await db.patch(invitingTeam._id, { joinRequests: invitingTeam.joinRequests })

  const teamOfJoiner = await findTeamOfUser(db, user, invitingTeam.competition)
  if (!teamOfJoiner) {
    throw new ConvexError('The user is not in the competition')
  }

  const participations = await db
    .query('participants')
    .withIndex('by_team', (q) => q.eq('team', teamOfJoiner._id))
    .collect()
  const joinerParticipation = participations.find(
    (item) => item.user == user._id
  )
  if (!joinerParticipation) {
    throw new ConvexError('An internal server error occurred')
  }

  // Assigns the new team to the user
  await db.patch(joinerParticipation._id, { team: invitingTeam._id })
}

/**
 * Gets a list of the teams in a competition with the participants
 * @param db
 * @param competitionId
 */
export async function listCompetitionTeams(
  db: GenericDatabaseReader<DataModel>,
  competitionId: Id<'competitions'>
) {
  const teamRows = await db
    .query('teams')
    .withIndex('by_competition', (q) => q.eq('competition', competitionId))
    .collect()
  const fullTeamInfo = teamRows.map(async (item) => verifyTeam(db, item._id))

  return Promise.all(fullTeamInfo)
}

/**
 * Gets the information on a team independent of a user
 * @param db Database object
 * @param teamId Id of the team getting read
 * @return object containing the team info (top-level properties) and members (array)
 */
export async function verifyTeam(
  db: GenericDatabaseReader<DataModel>,
  teamId: Id<'teams'>
) {
  const team = await db.get(teamId)
  if (!team)
    throw new ConvexError({ code: 404, message: 'The team does not exist' })

  const memberRows = await db
    .query('participants')
    .withIndex('by_team', (q) => q.eq('team', teamId))
    .collect()
  const memberUserList = memberRows.map(async (item) => {
    const user = await db.get(item.user)
    if (!user) return []
    return [user]
  })
  const members = await Promise.all(memberUserList).then((item) => item.flat())

  return {
    ...team,
    members,
  }
}
