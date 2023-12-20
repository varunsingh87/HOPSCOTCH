import { mutation } from './_generated/server'
import { submission } from './schema'
import { v } from 'convex/values'

export default mutation({
  args: { submission: v.object(submission) },
  handler: async ({ db }, { submission }) => {
    console.log('works in addSubmission convex')
    await db.insert('submissions', submission)
  },
})
