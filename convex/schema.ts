// To start using a schema, rename this file to schema.ts
import { defineSchema, defineTable, s, SchemaType } from "convex/schema";

export default defineSchema({
  messages: defineTable({
    author: s.string(),
    body: s.string(),
  }),
  counters: defineTable({
    name: s.string(),
    counter: s.number(),
  }),
  users: defineTable({
    name: s.string(),
    tokenIdentifier: s.string(),
    pictureURL: s.string(),
    bio: s.string()
  }),
  competitions: defineTable({
    competition: s.object({
      name: s.string(), 
      organizer: s.string(), 
      access: s.string(), 
      prizeList: s.array(s.string()), 
      address: s.string(), 
      description: s.string(), 
      locationCategory: s.string(), 
      totalPrizeValue: s.number() 
    })
  }),
  submissions: defineTable({
    submission: s.object({
      competition: s.id("competitions"), 
      name: s.string(), 
      title: s.string(), 
      description: s.string()
    })
  })
});