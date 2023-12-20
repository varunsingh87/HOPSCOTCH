import { v } from 'convex/values'
import { query } from './_generated/server'
import { mutation } from './_generated/server'
import { competition } from './schema'

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
  args: { competition: v.object(competition) },
  handler: async ({ db }, { competition }) => {
    await db.insert('competitions', competition)
  },
})

export const deleteCompetition = mutation({
  args: { id: v.id('competitions') },
  handler: async ({ db }, { id }) => {
    await db.delete(id)
  },
})
