import { v } from 'convex/values'
import { query } from './_generated/server'

export default query({
  args: {
    competitionId: v.id('competitions'),
  },
  handler: async ({ db }, { competitionId }) => {
    return await db.get(competitionId)
  },
})
