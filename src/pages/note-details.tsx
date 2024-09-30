import { getNoteById } from '@/api/note-api';
import { NavBar } from '@/components/navbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NoteDetails = () => {
    const { noteId } = useParams();
    const [note, setNote] = useState<any | null>(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                if(noteId != null){
                    const temp = await getNoteById(noteId);
                    setNote(temp);
                    console.log(temp)
                }
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        };

        fetchNote();
    }, [noteId]);

    return (
        <div className="w-screen h-screen flex flex-col font-itim">
            <NavBar />
            {note ? (
                <div className='py-5 px-20 flex'>
                    {note.title}
                </div>
            ) : (
                <div className='w-full h-full flex justify-center items-center'>
                    <h1>Loading...</h1>
                </div>
            )}
        </div>
    );
};

export default NoteDetails;