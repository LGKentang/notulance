import { createBundle } from "@/api/bundle-api";
import { updateNoteBundleIdInBatches } from "@/api/note-api";

async function handleCreateBundle(notesId: string[], discount: number) {
    const bundleId: string | null = await createBundle(notesId, discount)

    if (bundleId == null) {
        throw new Error("Bundle does not exist")
    }

    await updateNoteBundleIdInBatches(bundleId, notesId);
}

export { handleCreateBundle }