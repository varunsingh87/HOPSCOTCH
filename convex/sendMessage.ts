import { mutation } from "./_generated/server";

// Send a chat message.
export default mutation(({ db }, body: string, author: string, competition: string) => {
  const message = { body, author, competition };
  db.insert("messages", message);
});
