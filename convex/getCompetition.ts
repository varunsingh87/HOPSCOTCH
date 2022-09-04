import { GenericId } from '@convex-dev/common'
import { query } from './_generated/server'

export default query(async ({ db }, id: string): Promise<Object> => {
    return await db.get(new GenericId('competitions', id)) ?? {}
})
