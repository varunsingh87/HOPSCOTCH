import { query } from './_generated/server'
import { ConvexError, v } from 'convex/values'
import { verifyUser } from './user'
import { listOwnParticipations } from './lib/team'

export const listTeams = query({
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

    // TODO: listCompetitionTeams
  },
})
