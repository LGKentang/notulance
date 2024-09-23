import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

async function getBundleById(bundleId: string) {
    try {
        const noteDocRef = doc(db, 'notes', bundleId);
        const noteDoc = await getDoc(noteDocRef);

        if (noteDoc.exists()) {
            return { id: noteDoc.id, ...noteDoc.data() };
        } else {
            console.error("No such note exists!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching note by ID:", error);
        throw error;
    }
}