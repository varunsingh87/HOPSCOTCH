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
  title: v.string(),
  description: v.string(),
}

export const joinRequest = {
  user: v.id('users'),
  teamConsent: v.boolean(),
  userConsent: v.boolean(),
  pitch: v.string(),
}

const team = {
  competition: v.id('competitions'),
  submission: v.optional(v.object(submission)),
  joinRequests: v.array(v.object(joinRequest)),
}

const user = {
  name: v.string(),
  tokenIdentifier: v.string(),
  pictureURL: v.string(),
  bio: v.string(),
}

const participant = {
  team: v.id('teams'),
  user: v.id('users'),
}

const message = {
  team: v.id('teams'),
  sender: v.id('users'),
  message: v.string(),
}

export default defineSchema({
  users: defineTable(user).index('primary', ['tokenIdentifier']),
  competitions: defineTable(competition),
  teams: defineTable(team).index('by_competition', ['competition']),
  participants: defineTable(participant)
    .index('by_user', ['user'])
    .index('by_team', ['team']),
  messages: defineTable(message).index('by_team', ['team']),
})
