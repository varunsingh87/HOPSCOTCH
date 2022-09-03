import { mutation } from "./_generated/server";

export default mutation(({ db }, submissions) => {
    console.log('works in addSubmission convex');
    db.insert("submissions", submissions);
});