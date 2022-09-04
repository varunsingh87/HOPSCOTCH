import { mutation } from "./_generated/server";

export default mutation(({ db }, id) => {
    db.delete(id);
});