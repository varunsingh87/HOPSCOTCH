import { v } from 'convex/values'
import { mutation } from './_generated/server'

export default mutation({
  args: { id: v.id('competitions'), newSrc: v.string() },
  handler: async ({ db }, args) => {
    await db.patch<'competitions'>(args.id, { thumbnail: args.newSrc })
  },
})
