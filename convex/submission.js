import { mutation, query } from './_generated/server'
import { submission } from './schema'
import { v } from 'convex/values'

export const addSubmission = mutation({
  args: { teamId: v.id('teams'), submission: v.object(submission) },
  handler: async ({ db }, { teamId, submission }) => {
    return await db.patch(teamId, { submission })
  },
})

export const listSubmissions = query({
  args: {
    competitionId: v.id('competitions'),
  },
  handler: ({ db }, { competitionId }) => {
    return db
      .query('teams')
      .withIndex('by_competition', (q) => q.eq('competition', competitionId))
      .collect()
  },
})
