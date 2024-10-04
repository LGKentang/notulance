import { getNoteById } from '@/api/note-api';
import { NavBar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addItemToCart } from '@/api/cart-api';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CartItem } from '@/interfaces/transaction/cart';
import { Note } from '@/interfaces/general/note';
import { addCartItemToCart } from '@/handlers/cart-handler';
import { PDFDocument } from 'pdf-lib';
import Iframe from 'react-iframe'


const NoteDetailsPreview = () => {
    const { noteId } = useParams();

    const [userId, setUserId] = useState<any | null>(null);
    const [note, setNote] = useState<any | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [sandbox, setSandbox] = useState<string>('')


    const extractFirstPage = async () => {
        const pdfUrl = note.fileId

        const response = await fetch(pdfUrl);
        const pdfBuffer = await response.arrayBuffer();

        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const newPdfDoc = await PDFDocument.create();
        const [firstPage] = await newPdfDoc.copyPages(pdfDoc, [0]);
        newPdfDoc.addPage(firstPage);
    
        const newPdfBytes = await newPdfDoc.save();

        const pdfBlob = new Blob([newPdfBytes], { type: 'application/pdf' });
        const newPdfUrl = URL.createObjectURL(pdfBlob);
        setPreview(newPdfUrl)
        console.log(preview)

        setSandbox("allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads allow-presentation")
    };

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
    
    useEffect(() => {
        if (note && note.fileId) {
            extractFirstPage();
        }
    }, [note]); 

    async function handleAddToCart(){
        const uid = userId
        const noteObject: Note = {
            id: note.id,
            title: note.title,
            description: note.description,
            writerId: note.writerId,
            price: note.price,
            subject: note.subject,
            releaseDate: note.releaseDate,
            university: note.university,
            grade: note.grade,
            fileId: note.fileId,
            score: note.score,
            bundleId: note.bundleId,
            thumbnailUrl: note.thumbnailUrl,
            totalPages: note.totalPages,
            ranking: note.ranking,
        }
        const cartItem: CartItem = {
            type: 'note',
            item: noteObject   
        }
        console.log(cartItem)

        await addCartItemToCart(cartItem);
        window.location.reload()
    }


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
                    <div className='text-3xl underline mb-2'>
                            {`Rp. ${note.price}`}
                    </div>
                    <div>
                        <Button 
                            onClick={handleAddToCart} 
                            variant="agree"
                            className='rounded-sm p-6 text-2xl'
                        >
                            Add to cart
                        </Button>
                    </div>
                    <div className='w-full h-[700px] items-center flex flex-col text-2xl mt-3'>
                        Preview
                        {preview ? (
                            <Iframe 
                                url={`${preview}`}
                                className="w-full h-full border-0"
                                styles={{ overflow: 'hidden', pointerEvents: 'none' }}
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


export default NoteDetailsPreview;
