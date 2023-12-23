import { mutation, query } from './_generated/server'
import { submission } from './schema'
import { v } from 'convex/values'

export const addSubmission = mutation({
  args: { submission: v.object(submission) },
  handler: async ({ db }, { submission }) => {
    await db.insert('submissions', submission)
  },
})

export const listSubmissions = query({
  args: {
    competitionId: v.id('competitions'),
  },
  handler: ({ db }, { competitionId }) => {
    return db
      .query('submissions')
      .filter((submission) =>
        submission.eq(submission.field('competition'), competitionId)
      )
      .collect()
  },
})
