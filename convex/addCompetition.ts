import { mutation } from "./_generated/server";

// Send a chat message.
export default mutation(({ db }, name: string, organizer: string) => {
    const competition = { name, organizer };
    db.insert("competitions", competition);
});
