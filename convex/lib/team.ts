import { GenericDatabaseReader, GenericDatabaseWriter } from 'convex/server'
import { DataModel, Id } from '../_generated/dataModel'
import { RequestValidity } from '../../shared/info'

/**
 * Efficient utility function for getting the information about a team given a user and competition
 * @param db The database reader object
 * @param user A user on the team
 * @param competition The competition this team is entered in
 * @return object containing information about team
 * @throws Error if the user is not in the competition
 */
export async function findTeamOfUser(
  db: GenericDatabaseReader<DataModel>,
  user: { _id: Id<'users'> },
  competition: Id<'competitions'>
) {
  const participations = await db
    .query('participants')
    .withIndex('by_user', (q) => q.eq('user', user._id))
    .collect()

  for (const participation of participations) {
    const team = await db.get(participation.team)
    if (!team) continue

    const currentCompetition = await db.get(team.competition)
    if (!currentCompetition) continue

    if (currentCompetition._id == competition) {
      const members = await db
        .query('participants')
        .withIndex('by_team', (q) => q.eq('team', team._id))
        .collect()
      return { members, ...team, userMembership: participation._id }
    }
  }

  throw new Error('The user is not in that competition')
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
  inviterTeam: {
    _id: Id<'teams'>
    competition: Id<'competitions'>
    joinRequests: Array<{
      user: Id<'users'>
      teamConsent: boolean
      userConsent: boolean
    }>
  },
  joiner: {
    _id: Id<'users'>
  }
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
 * @param db The database object
 * @param user The user joining the team
 * @param teamId The team id
 * @throws Error
 */
export async function addUserToTeam(
  db: GenericDatabaseWriter<DataModel>,
  user: { _id: Id<'users'> },
  teamId: Id<'teams'>
) {
  const team = await db.get(teamId)
  if (!team) throw new Error('The team does not exist')

  const joinIndex = team.joinRequests.findIndex((item) => item.user == user._id)
  if (
    team.joinRequests[joinIndex].teamConsent &&
    team.joinRequests[joinIndex].userConsent
  ) {
    return
  }

  throw new Error(
    'At least one party has not consented to the user joining the team'
  )
}
