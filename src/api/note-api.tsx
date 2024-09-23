import { collection, getDocs, doc, getDoc, setDoc, addDoc, where, query, documentId } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { Note } from "@/interfaces/note"; 

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

async function getAllNotes() {
    try {
        const notesCollection = collection(db, 'notes');
        const notesSnapshot = await getDocs(notesCollection);

        const notesList = notesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return notesList;
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
}

async function getNoteById(noteId: string) {
    try {
        const noteDocRef = doc(db, 'notes', noteId);
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

async function getNotesByIds(noteIds: string[]) {
    try {
        const notesCollection = collection(db, 'notes');
        const notesQuery = query(notesCollection, where(documentId(), 'in', noteIds)); // Using Firestore's 'in' operator

        const noteSnapshot = await getDocs(notesQuery);
        const notesList = noteSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return notesList; // Return an array of notes
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

async function searchNotes(searchTerm: string) {
    try {
        const notesCollection = collection(db, 'notes');
        const q = query(
            notesCollection,
            where('title', '>=', searchTerm), 
            where('title', '<=', searchTerm + '\uf8ff') 
        );

        const notesSnapshot = await getDocs(q);
        const notesList = notesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return notesList;
    } catch (error) {
        console.error("Error searching notes:", error);
        throw error;
    }
}


export { createNote, getAllNotes, getNoteById, updateNoteById, searchNotes};
