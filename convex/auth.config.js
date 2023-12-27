import {Auth, UserIdentity} from "convex/server";

export default {
  providers: [
    {
      domain: process.env.AUTH0_DOMAIN,
      applicationID: process.env.AUTH0_CLIENT_ID,
    },
  ],
  /**
   * @param {Auth} auth
   * @return Promise<UserIdentity>
   */
  verify: async (auth) => {
    const identity = await auth.getUserIdentity()
    if (!identity) {
      throw new Error('Authentication not present')
    }
    return identity
  },
}
