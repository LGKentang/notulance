import { collection, getDocs, doc, getDoc, setDoc, addDoc, where, query, documentId, writeBatch } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { Note, SimpleNote } from "@/interfaces/general/note"; 

async function createNote(note: Note) {
    try {
        const notesCollection = collection(db, 'notes');
        const noteDocRef = await addDoc(notesCollection, note);

        console.log("Note created successfully with ID:", noteDocRef.id);
        return noteDocRef.id;
    } catch (error) {
        console.error("Error creating note:", error);
        throw error;
    }
}

async function updateNoteBundleIdInBatches(bundleId: string, noteIds: string[]) {
    const batch = writeBatch(db); 

    try {
        noteIds.forEach((noteId) => {
            const noteRef = doc(db, 'notes', noteId);

            batch.update(noteRef, { bundleId: bundleId });
        });

        await batch.commit();
        console.log("Batch update successful");

    } catch (error) {
        console.error("Error updating notes in batch: ", error);
        throw error; 
    }
}

async function getAllNotes(titleOnly?: boolean) : Promise<Note[] | SimpleNote[]> {
    try {
        const notesCollection = collection(db, 'notes');
        const notesSnapshot = await getDocs(notesCollection);

        const notesList = notesSnapshot.docs.map(doc => {
            return titleOnly ? 
                { id: doc.id, title: doc.data().title } as SimpleNote: 
                { id: doc.id, ...doc.data() } as Note; 
        });

        return notesList;
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
}





async function getNoteById(noteId: string) : Promise<Note | null>{
    try {
        const noteDocRef = doc(db, 'notes', noteId);
        const noteDoc = await getDoc(noteDocRef);

        if (noteDoc.exists()) {
            return { id: noteDoc.id, ...noteDoc.data() } as Note;
        } else {
            console.error("No such note exists!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching note by ID:", error);
        throw error;
    }
}

async function getNotesByIds(noteIds: string[]) {
    try {
        const notesCollection = collection(db, 'notes');
        const notesList: any[] = [];
        const chunks = [];
        for (let i = 0; i < noteIds.length; i += 10) {
            chunks.push(noteIds.slice(i, i + 10));
        }

        for (const chunk of chunks) {
            const notesQuery = query(notesCollection, where(documentId(), 'in', chunk));
            const noteSnapshot = await getDocs(notesQuery);

            notesList.push(...noteSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })));
        }
        return notesList;
    } catch (error) {
        console.error("Error fetching notes by IDs:", error);
        throw error;
    }
}

async function updateNoteById(noteId: string, updatedNote: Partial<Note>) {
    try {
        const noteDocRef = doc(db, 'notes', noteId);
        await setDoc(noteDocRef, updatedNote, { merge: true });

        console.log("Note updated successfully:", noteId);
    } catch (error) {
        console.error("Error updating note:", error);
        throw error;
    }
}



export { createNote, getAllNotes, getNoteById, updateNoteById, getNotesByIds, updateNoteBundleIdInBatches};
