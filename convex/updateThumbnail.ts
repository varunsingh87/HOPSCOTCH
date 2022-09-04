import { GenericId } from "@convex-dev/common";
import { mutation } from "./_generated/server";

export default mutation(({ db }, id: GenericId<"competitions">, newSrc: string) => {
    db.patch<"competitions">(id, { thumbnail: newSrc })
})