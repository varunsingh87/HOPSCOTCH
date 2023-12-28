import { mutation } from './_generated/server'
import { v } from 'convex/values'
import { verifyUser } from './user'
import {
  findTeamOfUser,
  addUserToTeam,
  validateTeamJoinRequest,
} from './lib/team'
import { RequestValidity } from '../shared/info'

/**
 * Create a new empty team for a competition and adds the user to the competition through that team
 * @return Id of new participants table row if successful
 */
export const joinCompetition = mutation({
  args: { id: v.id('competitions') },
  handler: async ({ db, auth }, { id }) => {
    const user = await verifyUser(db, auth)

    const competition = await db.get(id)
    if (!competition) {
      throw new Error('That competition does not exist')
    }

    // Stop users who have left the competition and banned users from rejoining the competition
    if (competition.banned.includes(user._id)) {
      throw new Error('You are not permitted to enter this competition')
    }

    const team = await db.insert('teams', {
      competition: id,
      joinRequests: [],
    })

    return await db.insert('participants', { user: user._id, team })
  },
})

/**
 * Records request for a user to join a team OR adds the user to the tam
 *
 * Precondition: User's participation in the competition is valid
 *
 * Postcondition: If the joiner was already invited, adds the user to the team because both sides have consented.
 * If no such join request exists, records the join request.
 * The user also cannot request to join any other team
 * @param id The id of the team that the user would like to join
 */
export const requestJoin = mutation({
  args: { id: v.id('teams') },
  handler: async ({ db, auth }, { id }) => {
    const user = await verifyUser(db, auth)
    const inviterTeam = await db.get(id)
    if (!inviterTeam) {
      throw new Error('The inviting team does not exist')
    }

    const requestValidity = await validateTeamJoinRequest(db, inviterTeam, user)
    switch (requestValidity) {
      // Repeat request
      case RequestValidity.REQUESTED:
        throw new Error('The request has already been made')
      case RequestValidity.VALID:
        // Record the join request
        inviterTeam.joinRequests.push({
          user: user._id,
          userConsent: true,
          teamConsent: false,
        })
        return await db.replace(inviterTeam._id, inviterTeam)
      case RequestValidity.INVITED:
        return await addUserToTeam(db, user, id)
      default:
        return requestValidity
    }
  },
})

/**
 * Records a join request with the team's consent to an invitee OR adds a user to the team
 *
 * Postcondition: If a join request by the joiner is already made, adds the user to the team because both sides have consented.
 * If no such join request exists, records the join request.
 *
 * @param joiner The user who is not on the team
 * @param competitionId The id of the competition that the team is in
 */
export const inviteToTeam = mutation({
  args: { joinerId: v.id('users'), competitionId: v.id('competitions') },
  handler: async ({ db, auth }, { joinerId, competitionId }) => {
    const inviter = await verifyUser(db, auth)
    const inviterTeam = await findTeamOfUser(db, inviter, competitionId)

    const joiner = await db.get(joinerId)
    if (!joiner) {
      throw new Error('The user getting invited does not exist')
    }

    // Add user to team if the join request was in
    const validation = await validateTeamJoinRequest(db, inviterTeam, joiner)
    if (!validation) {
      return addUserToTeam(db, joiner, inviterTeam._id)
    }

    // Record the join request
    inviterTeam.joinRequests.push({
      user: joiner._id,
      userConsent: true,
      teamConsent: false,
    })
    return await db.replace(inviterTeam._id, inviterTeam)
  },
})

/**
 * Leaves a competition
 * @param id The id of the competition
 */
export const leaveCompetition = mutation({
  args: { id: v.id('competitions') },
  handler: async ({ db, auth }, { id }) => {
    const competition = await db.get(id)
    if (!competition) {
      throw new Error('That competition does not exist')
    }

    const user = await verifyUser(db, auth)
    const team = await findTeamOfUser(db, user, id)
    if (team.members.length == 1) {
      await db.delete(team._id)
    }

    // Remove the user from the team and the competition
    await db.delete(team.userMembership)

    // Add user to "banned" to stop the user from rejoining
    competition.banned.push(user._id)
    await db.replace(competition._id, competition)
  },
})
