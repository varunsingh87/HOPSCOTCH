import { query } from './_generated/server'

export default query({
  args: {},
  handler: async ({ db, auth }) => {
    const identity = await auth.getUserIdentity()
    if (!identity) {
      throw new Error('Called storeUser without authentication present')
    }
    const user = await db
      .query('users')
      .filter((q) => q.eq(q.field('tokenIdentifier'), identity.tokenIdentifier))
      .first()
    return user != null ? user : null
  },
})
