import Fuse from 'fuse.js';
import { Filter } from "@/interfaces/general/filter";
import { getAllNotes } from '@/api/note-api';
import { Note, SimpleNote } from "@/interfaces/general/note";

const fuseOptions = {
    keys: ['title'],
    threshold: 0.4,
};

async function searchNotes(query: string, useFilter: boolean, filter?: Filter): Promise<string[] | null> {
    try {
        const notes: Note[] | SimpleNote[] = await getAllNotes(useFilter);

        let filteredNotes: (Note | SimpleNote)[] = notes;

        if (query) {
            const fuse = new Fuse(notes, fuseOptions);
            const fuzzyResults = fuse.search(query);
            filteredNotes = fuzzyResults.map(result => result.item);
        }

        if (useFilter && filter && filteredNotes.length > 0) {
            filteredNotes.sort((a, b) => {
                const noteA = a as Note;
                const noteB = b as Note;

                console.log(noteA, noteB)

                const safeCompare = (valA: any, valB: any, order: 'asc' | 'desc') => {
                    if (valA === undefined) return order === 'asc' ? -1 : 1; 
                    if (valB === undefined) return order === 'asc' ? 1 : -1;  
                    return order === 'asc' ? valA - valB : valB - valA;
                };

                if (filter.grade) {
                    return filter.grade === 'asc'
                        ? safeCompare(noteA.grade, noteB.grade, 'asc')
                        : safeCompare(noteB.grade, noteA.grade, 'desc');
                }

                if (filter.price) {
                    return filter.price === 'asc'
                        ? safeCompare(noteA.price, noteB.price, 'asc')
                        : safeCompare(noteB.price, noteA.price, 'desc');
                }

                if (filter.subject) {
                    return filter.subject === 'asc'
                        ? noteA.subject?.localeCompare(noteB.subject || '') || 0 
                        : noteB.subject?.localeCompare(noteA.subject || '') || 0; 
                }

                if (filter.university) {
                    return filter.university === 'asc'
                        ? noteA.university?.localeCompare(noteB.university || '') || 0 
                        : noteB.university?.localeCompare(noteA.university || '') || 0; 
                }

                if (filter.ranking) {
                    return filter.ranking === 'asc'
                        ? safeCompare(noteA.ranking, noteB.ranking, 'asc')
                        : safeCompare(noteB.ranking, noteA.ranking, 'desc');
                }

                return 0; 
            });
        }

        console.log(filteredNotes);

        return filteredNotes.length > 0 ? filteredNotes.map(note => note.title) : null;

    } catch (error) {
        console.error("Error searching notes:", error);
        return null; 
    }
}

export { searchNotes };
