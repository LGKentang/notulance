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

const NoteDetails = () => {
    const [userId, setUserId] = useState<any | null>(null);

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

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserId(user.uid);
          } else {
            setUserId(null);
          }
        });
    }, [noteId]);

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
        <div className="w-screen h-screen flex flex-col font-itim">
            <NavBar />
            {note ? (
                <div className='py-5 px-20 '>
                    <h3>
                    {note.title}
                    </h3>
                    <Button onClick={handleAddToCart} className='bg-red-500'>Add to Cart</Button>
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