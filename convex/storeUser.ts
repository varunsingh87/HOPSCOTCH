import { mutation } from "./_generated/server";
import { Document, Id } from "./_generated/dataModel";

export default mutation(async ({ db, auth }, bio: string=""): Promise<Id<"users">> => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Called storeUser without authentication present");
  }

  // Check if we've already stored this identity before.
  //filter for users
  const user: Document<"users"> | null = await db
    .table("users")
    .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
    .first();
  if (user !== null) {
    // If we've seen this identity before but the name has changed, patch the value.
    if (user.name != identity.name) {
      db.patch<"users">(user._id, { name: identity.name! });
    }
    if (user.pictureURL != identity.pictureUrl) {
        db.patch<"users">(user._id, { pictureURL: identity.pictureUrl! });
    }
    if (user.bio != bio) {
        db.patch<"users">(user._id, { name: bio! });
    }
    return user._id;
  }
  // If it's a new identity, create a new `User`.
  return db.insert("users", {
    name: identity.name!,
    tokenIdentifier: identity.tokenIdentifier,
    pictureURL: identity.pictureUrl!,
    bio: bio
    // The `_id` field will be assigned by the backend.
  });
});