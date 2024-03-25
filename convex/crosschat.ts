import { mutation, query } from './_generated/server'
import { ConvexError, v } from 'convex/values'
import { verifyUser } from './user'
import { validateCrossChatParticipation } from './lib/team'
import { DELETED_USER } from './lib/helpers'

/**
 * Sends a message to a cross-chat regarding a join request
 * @return id of the message if successful
 * @throws ConvexError If the user is not part of the cross-chat
 */
export const sendMessage = mutation({
  args: { joinRequest: v.id('join_requests'), message: v.string() },
  handler: async ({ db, auth }, { joinRequest, message}) => {
    const sender = await verifyUser(db, auth)

    const joinRequestInfo = await db.get(joinRequest)
    if (!joinRequestInfo)
      throw new ConvexError({ code: 404, msg: 'No join request exists for the chat'})

    const userIsInChat = await validateCrossChatParticipation(db, joinRequestInfo, sender._id)
    if (!userIsInChat)
      throw new ConvexError({ code: 403, msg: 'Permission denied: Not in chat' })

    return await db.insert('join_messages', {
      join_request: joinRequest,
      message,
      sender: sender._id
    })
  }
})

/**
 * Gets a cross chat including documents of each user
 * @return List of messages in the cross chat associated with the join request including document for each sender
 * @throws ConvexError If the join request does not exist or the user does not have permission to view the cross chat,
 * which is the case when the user is not on the team and not the joiner in the join request
 */
export const listMessages = query({
  args: { request: v.id('join_requests')},
  handler: async ({ db, auth }, { request }) => {
    const joinRequest = await db.get(request)
    const viewer = await verifyUser(db, auth)
    if (!joinRequest)
      throw new ConvexError({ code: 404, msg: 'Request not found' })

    const userIsInChat = await validateCrossChatParticipation(db, joinRequest, viewer._id)
    if (!userIsInChat)
      throw new ConvexError({ code: 403, msg: 'Permission denied: Not in chat' })

    const messages = await db
      .query('join_messages')
      .withIndex('by_request',
          q => q.eq('join_request', joinRequest._id)
      ).collect()

    return Promise.all(messages.map(async message => {
      return {
        ...message,
        ownMessage: message.sender == viewer._id,
        sender: await db.get(message.sender) ?? DELETED_USER,
      }
    }))
  }
})