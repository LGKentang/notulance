import { getNoteById } from "@/api/note-api";
import { getUserByAuthId } from "@/api/user-api";
import { NavBar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { searchNotes } from "@/handlers/home-handler";
import { FirebaseUser } from "@/interfaces/user/firebase-user";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";


const Profile = () => {

    const [user, setUser] = useState<FirebaseUser | null>();
    const [notes, setNotes] = useState<any[] | null>();

    const handleSearch = async() => {
        const tempIds = await searchNotes("Intro", false);

        if(tempIds != null){
            console.log(tempIds)
            
            const tempNotes = [];
            for (const element of tempIds) {
                const note = await getNoteById(element);
                tempNotes.push(note);
            }
            setNotes(tempNotes)
            console.log(tempNotes)
        }
    }

    useEffect(() => {
        const auth = getAuth();
        
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
    
            const userId = user.uid;
            setUser(await getUserByAuthId(userId) as FirebaseUser | null);
            if (!user) throw new Error("User is not found");
          } 
          else {
            window.location.href = '/'
          }
        });
    
    
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        handleSearch()
    }, []);



    return (
        <div className="w-screen h-screen flex flex-col font-itim overflow-y-scroll">
            <NavBar />
            <div className="flex w-full overflow-hidden h-1/4">
                <img src="/BackgroundImage.png" alt="" className="w-full h-full object-cover brightness-75"/>
            </div>
            <div className="flex px-32 py-5 justify-between items-center">
                <h1>{user?.name}</h1>
                <Button variant="decline" className="rounded-md p-6 text-xl">Edit Profile</Button>
            </div>
            <div className="flex flex-col mx-32 my-5 justify-between items-center shadow-xl drop-shadow-sm">
                <div className="flex p-6 w-full ">
                    Bought Notes
                </div>
                {notes && notes.length > 0 ? (
                    <div className="grid px-44 grid-cols-3 justify-between gap-10 mb-4">
                        {notes.map((note, index) => {
                            return(
                                <a href={`/note/${note.id}`} key={index}>
                                    <Card className="border-black border-2 drop-shadow-lg">
                                        <CardHeader className="flex p-0 w-full max-h-48 items-center overflow-hidden">
                                            <img src={note.thumbnailUrl} alt="" />
                                        </CardHeader>
                                        <Separator />
                                        <CardContent className="p-2">
                                            <h1 className="text-xl">{note.title}</h1>
                                        </CardContent>
                                        <CardFooter className="flex justify-between p-3 text-sm">
                                            <span>{note.university}</span>
                                            <span>2024</span>
                                        </CardFooter>
                                    </Card>
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex px-44 justify-center text-red-500">
                        No notes found.
                    </div>
                )}
            </div>
        </div>
    );
};


export default Profile;
