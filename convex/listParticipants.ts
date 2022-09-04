import { query } from "./_generated/server"

export default query(async ({ db }, competitionId) => {
    return await db.table('submissions').filter(item => item.eq(item.field('_id'), competitionId)).collect()
})