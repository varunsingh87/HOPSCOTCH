import { query } from './_generated/server'
import { Document, Id } from "./_generated/dataModel";

export default query(async ({ db, auth }): Promise<string | null> => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
        throw new Error("Called storeUser without authentication present");
    }
    console.log(identity);
    const user: Document<"users"> | null = await db
        .table("users")
        .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
        .first();
    return user != null ? user.bio : null;
})
