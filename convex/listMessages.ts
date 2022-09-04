import { query } from "./_generated/server";

export default query(async ({ db }, competitionID) => {
  return await db.table("messages").filter(q => q.eq(q.field("competition"), competitionID)).collect();
});
