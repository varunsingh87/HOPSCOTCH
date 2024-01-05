import { v } from 'convex/values'
import { query } from './_generated/server'
import { mutation } from './_generated/server'
import { listOwnParticipations } from './lib/team'
import { verifyUser } from './user'

export const listParticipatingCompetitions = query({
  args: {},
  handler: async ({ db, auth }) => {
    const user = await verifyUser(db, auth)
    return listOwnParticipations(db, user)
  },
})

export const listCompetitions = query({
  handler: async ({ db }) => {
    return await db.query('competitions').order('desc').collect()
  },
})

export const getCompetition = query({
  args: { id: v.id('competitions') },
  handler: async ({ db }, { id }) => {
    return (await db.get(id)) ?? {}
  },
})

export const addCompetition = mutation({
  args: {
    name: v.string(),
    organizer: v.string(),
    access: v.string(),
    prizeList: v.array(v.string()),
    address: v.string(),
    description: v.string(),
    locationCategory: v.string(),
    totalPrizeValue: v.number(),
    rules: v.string(),
    thumbnail: v.string(),
  },
  handler: async ({ db }, args) => {
    await db.insert('competitions', {
      ...args,
      banned: [],
    })
  },
})

export const deleteCompetition = mutation({
  args: { id: v.id('competitions') },
  handler: async ({ db }, { id }) => {
    await db.delete(id)
  },
})

export const updateThumbnail = mutation({
  args: { id: v.id('competitions'), newSrc: v.string() },
  handler: async ({ db }, args) => {
    await db.patch<'competitions'>(args.id, { thumbnail: args.newSrc })
  },
})
