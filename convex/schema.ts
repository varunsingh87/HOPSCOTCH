import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export const competition = {
  name: v.string(),
  organizer: v.string(),
  access: v.string(),
  prizeList: v.array(v.string()),
  address: v.string(),
  description: v.string(),
  locationCategory: v.string(),
  totalPrizeValue: v.number(),
  thumbnail: v.string(),
}

export const submission = {
  competition: v.id('competitions'),
  name: v.string(),
  title: v.string(),
  description: v.string(),
}

export default defineSchema({
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
    pictureURL: v.string(),
    bio: v.string(),
  }),
  competitions: defineTable(competition),
  submissions: defineTable(submission),
})
