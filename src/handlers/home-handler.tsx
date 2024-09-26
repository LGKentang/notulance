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
        const notes: Note[] | SimpleNote[] = useFilter 
            ? await getAllNotes() 
            : await getAllNotes(true); 

        let filteredNotes: (Note | SimpleNote)[] = notes;

        if (query) {
            const fuse = new Fuse(notes, fuseOptions);
            const fuzzyResults = fuse.search(query);
            filteredNotes = fuzzyResults.map(result => result.item);
        }

        if (useFilter && filter) {
            const notesToFilter = filteredNotes as Note[];

            filteredNotes = notesToFilter.filter(note => {
                const matchesGrade = filter.grade ? note.grade === filter.grade : true;
                const matchesPrice = (filter.startPrice !== undefined && filter.endPrice !== undefined)
                    ? (note.price >= filter.startPrice && note.price <= filter.endPrice)
                    : true;
                const matchesSubject = filter.subject ? note.subject === filter.subject : true;
                const matchesUniversity = filter.university ? note.university === filter.university : true;
                const matchesRanking = filter.ranking ? note.ranking === filter.ranking : true;

                return matchesGrade && matchesPrice && matchesSubject && matchesUniversity && matchesRanking;
            });
        }

        console.log(filteredNotes)

        return filteredNotes.length > 0 ? filteredNotes.map(note => note.title) : null;

    } catch (error) {
        console.error("Error searching notes:", error);
        return null; 
    }
}

export { searchNotes };
