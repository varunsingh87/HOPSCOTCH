import { mutation } from "./_generated/server";

export default mutation(({ db }, submission) => {
    console.log('works in addSubmission convex');
    db.insert("submissions", submission);
});