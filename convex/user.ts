import { query } from './_generated/server'
import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const getUser = query({
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

export const storeUser = mutation({
  args: { bio: v.string() },
  handler: async ({ db, auth }, { bio }) => {
    const identity = await auth.getUserIdentity()
    if (!identity) {
      throw new Error('Called storeUser without authentication present')
    }

    // Check if we've already stored this identity before.
    //filter for users
    const user = await db
      .query('users')
      .filter((q) => q.eq(q.field('tokenIdentifier'), identity.tokenIdentifier))
      .first()
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name != identity.name) {
        await db.patch<'users'>(user._id, { name: identity.name! })
      }
      if (user.pictureURL != identity.pictureUrl) {
        await db.patch<'users'>(user._id, { pictureURL: identity.pictureUrl! })
      }
      if (user.bio != bio && bio != '') {
        await db.patch<'users'>(user._id, { bio: bio! })
      }
      return user._id
    }
    // If it's a new identity, create a new `User`.
    return db.insert('users', {
      name: identity.name!,
      tokenIdentifier: identity.tokenIdentifier,
      pictureURL: identity.pictureUrl!,
      bio: bio || '',
      // The `_id` field will be assigned by the backend.
    })
  },
})
