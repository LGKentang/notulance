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
        <div className="w-screen h-screen flex flex-col font-itim overflow-y-scroll">
            <NavBar />
            {note ? (
                <div className='py-5 px-20 flex flex-col justify-center items-center'>
                    <div className='text-3xl mb-3'>
                        {note.title}
                    </div>
                    <div className='text-xl'>
                        {note.description}
                    </div>
                    <div className='flex space-x-5 text-xl'>
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
                    <div className='text-3xl'>
                            {`Rp. ${note.price}`}
                    </div>
                    <div className='w-full h-[700px] items-center flex flex-col text-2xl mt-3'>
                        Preview
                        <iframe 
                            src={`${note.fileId}#page=1&pagemode=none&scrollbar=0&zoom=40`}
                            // src={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/web/viewer.html?file=${note.fileId}&zoom=page-width&pagemode=none`}
                            className="w-full h-full border-0"
                            style={{ overflow: 'hidden', pointerEvents: 'none' }}
                            title="PDF Preview"
                        >
                            This browser does not support PDFs. Please download the PDF to view it: <a href={note.fileId}>Download PDF</a>.
                        </iframe>
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
