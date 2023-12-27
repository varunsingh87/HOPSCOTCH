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
  rules: v.optional(v.string()),
  thumbnail: v.string(),
  banned: v.array(v.id('users')),
}

export const submission = {
  competition: v.id('teams'),
  name: v.string(),
  title: v.string(),
  description: v.string(),
}

const user = {
  name: v.string(),
  tokenIdentifier: v.string(),
  pictureURL: v.string(),
  bio: v.string(),
}

export default defineSchema({
  users: defineTable(user).index('primary', ['tokenIdentifier']),
  competitions: defineTable(competition),
  teams: defineTable({
    competition: v.id('competitions'),
    submission: v.optional(v.object(submission)),
  }).index('by_competition', ['competition']),
  participants: defineTable({
    team: v.id('teams'),
    user: v.id('users'),
  })
    .index('by_user', ['user'])
    .index('by_team', ['team']),
})
