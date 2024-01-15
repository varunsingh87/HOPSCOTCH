import { mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'
import { verifyUser } from './user'
import {
  findTeamOfUser,
  listCompetitionTeams,
  listOwnParticipations,
  verifyTeam,
} from './lib/team'

/**
 * List teams in a competition
 */
export const list = query({
  args: { competitionId: v.id('competitions') },
  handler: async ({ db, auth }, { competitionId }) => {
    const user = await verifyUser(db, auth)
    const participants = await listOwnParticipations(db, user)
    const userIsInCompetition = participants.some(
      (item) => item.competition?._id == competitionId
    )
    if (!userIsInCompetition) {
      throw new ConvexError('User is not in the competition')
    }

    return await listCompetitionTeams(db, competitionId)
  },
})

/**
 * Gets the team the user is on
 */
export const get = query({
  args: { competitionId: v.id('competitions') },
  handler: async ({ db, auth }, { competitionId }) => {
    const user = await verifyUser(db, auth)
    return await findTeamOfUser(db, user, competitionId)
  },
})

export const sendMessage = mutation({
  args: { teamId: v.id('teams'), message: v.string() },
  handler: async ({ db, auth }, { teamId, message }) => {
    const user = await verifyUser(db, auth)
    const team = await verifyTeam(db, teamId)

    const userIsOnTeam = team.members.some((item) => item.user == user._id)
    if (!userIsOnTeam) {
      throw new ConvexError({
        code: 403,
        message:
          'Permission denied: You can only send chat messages to your own team',
      })
    }

    return await db.insert('messages', {
      team: teamId,
      sender: user._id,
      message,
    })
  },
})

export const listMessages = query({
  args: { teamId: v.id('teams') },
  handler: async ({ db, auth }, { teamId }) => {
    const user = await verifyUser(db, auth)
    const team = await verifyTeam(db, teamId)

    const userIsOnTeam = team.members.some((item) => item.user == user._id)
    if (!userIsOnTeam) {
      throw new ConvexError({
        code: 403,
        message:
          'Permission denied: You may only see the chat of your own team',
      })
    }

    return await db
      .query('messages')
      .withIndex('by_team', (q) => q.eq('team', teamId))
      .collect()
  },
})
