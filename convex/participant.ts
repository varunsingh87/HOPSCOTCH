import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const joinCompetition = mutation({
  args: { id: v.id('competitions') },
  handler: async ({ db, auth }, { id }) => {
    const identity = await auth.getUserIdentity()
    if (!identity) {
      throw new Error('Authentication not present')
    }
  },
})
