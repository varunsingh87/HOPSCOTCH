import { GenericId } from '@convex-dev/common'
import { query } from './_generated/server'

export default query(async ({ db }, id: string): Promise<Object> => {
    const data = await db.get(new GenericId('competitions', id))
    console.log(data)
    return data ?? {}
})
