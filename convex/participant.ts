import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { getUser, verifyUser } from './user'
import { GenericDatabaseReader } from 'convex/server'
import { DataModel, Id } from './_generated/dataModel'

/**
 * Create a new empty team for a competition and adds the user to the competition through that team
 * @return Id of new participants table row if successful
 */
export const joinCompetition = mutation({
  args: { id: v.id('competitions') },
  handler: async ({ db, auth }, { id }) => {
    const user = await verifyUser(db, auth)
    const team = await db.insert('teams', {
      competition: id,
    })

    return await db.insert('participants', { user: user._id, team })
  },
})

/**
 * Adds a user to an existing team and removes user from singleton team
 */
export const joinTeam = mutation({
  args: { id: v.id('teams') },
  handler: async ({ db, auth }, { id }) => {
    const user = await verifyUser(db, auth)
    const newTeam = await db.get(id)
    if (!newTeam) {
      throw new Error('That team does not exist')
    }
    const competitionId = newTeam.competition

    const team = await findTeamOfUser(db, user, competitionId)
    const teamCount = team.members.length
    if (teamCount <= 1) {
      await db.delete(team._id)
    }

    return await db.patch(team.userMembership, { team: id })
  },
})

export const leaveCompetition = mutation({
  args: { id: v.id('competitions') },
  handler: async ({ db, auth }, { id }) => {
    const competition = await db.get(id)
    if (!competition) {
      throw new Error('That competition does not exist')
    }

    const user = await verifyUser(db, auth)
    const team = await findTeamOfUser(db, user, id)
    if (team.members.length == 1) {
      await db.delete(team._id)
    }

    // Remove the user from the team and the competition
    await db.delete(team.userMembership)

    // Add user to "banned" to stop the user from rejoining
    competition.banned.push(user._id)
    await db.replace(competition._id, competition)
  },
})

/**
 * Utility function for getting the information about a team
 * Precondition: User has already been verified
 * @param db
 * @param user
 * @param competition
 */
async function findTeamOfUser(
  db: GenericDatabaseReader<DataModel>,
  user: { _id: Id<'users'> },
  competition: Id<'competitions'>
) {
  const participations = await db
    .query('participants')
    .withIndex('by_user', (q) => q.eq('user', user._id))
    .collect()

  for (const participation of participations) {
    const team = await db.get(participation.team)
    if (!team) continue

    const currentCompetition = await db.get(team.competition)
    if (!currentCompetition) continue

    if (currentCompetition._id == competition) {
      const members = await db
        .query('participants')
        .withIndex('by_team', (q) => q.eq('team', team._id))
        .collect()
      return { members, ...team, userMembership: participation._id }
    }
  }

  throw new Error('The user does not have a team for that competition')
}
