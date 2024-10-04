import { getNoteById } from '@/api/note-api';
import { NavBar } from '@/components/navbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Iframe from 'react-iframe'


const NoteDetails = () => {
    const { noteId } = useParams();

    const [userId, setUserId] = useState<any | null>(null);
    const [note, setNote] = useState<any | null>(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                if (noteId != null) {
                    const temp = await getNoteById(noteId);
                    setNote(temp);
                    console.log(temp);
                }
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        };
    
        fetchNote();
    
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });
    
        return () => unsubscribe();
    }, [noteId]);
    


    return (
        <div className="w-screen h-screen flex flex-col font-itim overflow-y-scroll">
            <NavBar />
            {note ? (
                <div className='py-5 px-20 flex flex-col justify-center items-center'>
                    <div className='text-3xl mb-3'>
                        {note.title}
                    </div>
                    <div className='text-xl mb-2'>
                        {note.description}
                    </div>
                    <div className='flex w-1/3 text-xl justify-between'>
                        <div>
                            {`Grade : ${note.grade}`}
                        </div>
                        <div>
                            {`Ranking : ${note.ranking}`}
                        </div>
                    </div>
                    <div className='text-xl mb-2'>
                            {`Score : ${note.score}`}
                    </div>
                    <div className='w-full h-[700px] items-center flex flex-col text-2xl mt-3'>
                        {note.fileId ? (
                            <Iframe 
                                url={`${note.fileId}`}
                                className="w-full h-full border-0"
                                styles={{ overflow: 'hidden'}}
                            />
                        ) : <></>}
                    </div>

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
