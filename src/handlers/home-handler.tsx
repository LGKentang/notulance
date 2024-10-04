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
        const notes: Note[] | SimpleNote[] = await getAllNotes(!!useFilter);
        console.log(notes)
        let filteredNotes: (Note | SimpleNote)[] = notes;

        if (query) {
            const fuse = new Fuse(notes, fuseOptions);
            const fuzzyResults = fuse.search(query);
            filteredNotes = fuzzyResults.map(result => result.item);
        }

        if (useFilter && filter && filteredNotes.length > 0) {
            console.log('test')
            console.log(filteredNotes)
            filteredNotes.sort((a, b) => {
                const noteA = a as Note; // Assuming this is a valid type assertion
                const noteB = b as Note;

                console.log(noteA)
        
                const safeCompare = (valA: any, valB: any) => {
                    if (valA === undefined) return 1; // Push undefined values to the end
                    if (valB === undefined) return -1; // Push undefined values to the end
                    return valA < valB ? -1 : valA > valB ? 1 : 0; // Standard comparison
                };
        
                if (filter.grade) {
                    return filter.grade === 'asc' 
                        ? safeCompare(noteA.grade, noteB.grade) 
                        : safeCompare(noteB.grade, noteA.grade);
                }
        
                if (filter.price) {
                    return filter.price === 'asc' 
                        ? safeCompare(noteA.price, noteB.price) 
                        : safeCompare(noteB.price, noteA.price);
                }
        
                if (filter.subject) {
                    return filter.subject === 'asc' 
                        ? safeCompare(noteA.subject, noteB.subject) 
                        : safeCompare(noteB.subject, noteA.subject);
                }
        
                if (filter.university) {
                    return filter.university === 'asc' 
                        ? safeCompare(noteA.university, noteB.university) 
                        : safeCompare(noteB.university, noteA.university);
                }
        
                if (filter.ranking) {
                    return filter.ranking === 'asc' 
                        ? safeCompare(noteA.ranking, noteB.ranking) 
                        : safeCompare(noteB.ranking, noteA.ranking);
                }
                
                return 0; 
            });
            
            console.log(filteredNotes)
        
        }
        

        return filteredNotes.length > 0 ? filteredNotes.map(note => note.id ? note.id : "") : null;

    } catch (error) {
        console.error("Error searching notes:", error);
        return null; 
    }
}

export { searchNotes };
