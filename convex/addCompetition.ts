import { mutation } from "./_generated/server";

// Send a chat message.
export default mutation(({ db }, competition) => {
    db.insert("competitions", competition);
});
