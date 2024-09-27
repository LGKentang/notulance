import { db } from "@/firebase/firebase";
import { collection, doc, getDoc , addDoc} from "firebase/firestore";
import { getNoteById } from "./note-api";
import { Bundle } from "@/interfaces/transaction/cart";

async function getBundleById(bundleId: string) {
    try {
        const bundleDocRef = doc(db, 'bundles', bundleId);
        const bundleDoc = await getDoc(bundleDocRef);

        if (bundleDoc.exists()) {
            return { id: bundleDoc.id, ...bundleDoc.data() } as Bundle;
        } else {
            console.error("No such note exists!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching note by ID:", error);
        throw error;
    }
}


// TODO : Validate that the bundle created cannot be duplicate, 
// so make a validation that checks if all the bundles item is exactly same as the input

async function createBundle(notesId : string[], discount : number): Promise<string> {
    try {
        const bundleCollection = collection(db, 'bundles'); 
        const notes = await Promise.all(notesId.map(id => getNoteById(id)));
        const validNotes = notes.filter(note => note !== null) as { id: string; price: number }[];

        if (validNotes.length === 0) {
            throw new Error("No valid notes found for the bundle.");
        }

        const totalNotePrice = validNotes.reduce((sum, note) => sum + note.price, 0);
        const discountedPrice = totalNotePrice - (totalNotePrice * (discount / 100));


        const bundleDocRef = await addDoc(bundleCollection, {
            noteIds: validNotes.map(note => note.id),
            bundlePrice: discountedPrice, 
            discount: discount
        });

    
        return bundleDocRef.id; 

    } catch (error) {
        console.error("Error creating bundle:", error);
        throw new Error("Failed to create bundle");
    }
}

export {getBundleById, createBundle}