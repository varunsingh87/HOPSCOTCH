import { ConvexError } from 'convex/values'

export default {
  providers: [
    {
      domain: process.env.AUTH0_DOMAIN,
      applicationID: process.env.AUTH0_CLIENT_ID,
    },
  ],
  /**
   * @param auth
   * @return user identity
   */
  verify: async (auth) => {
    const identity = await auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError('Authentication not present')
    }
    return identity
  },
}
