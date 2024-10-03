import { getNotesByIds } from "@/api/note-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavBar } from "@/components/navbar";
import { searchNotes } from "@/handlers/home-handler";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Search = () => {
    const [search, setSearch] = useState<string>('')
    const [notes, setNotes] = useState<any[] | null>()

    const handleSearch = async() => {
        const tempIds = await searchNotes(search, false);

        if(tempIds != null){
            const tempNotes = await getNotesByIds(tempIds)
            setNotes(tempNotes)
            console.log(tempNotes)
        }
    }

    useEffect(() => {
        handleSearch()
    }, [])


    return (
        <div className="w-screen h-screen flex flex-col overflow-scroll font-itim">
            <NavBar />

            {/* Search Bar */}
            <div className="flex flex-col w-full px-52 py-6">
                <div className="flex items-center space-x-5 mb-2">
                    <Input 
                        placeholder="Search..." 
                        value={search}
                        onChange={(e)=>{setSearch(e.target.value)}}
                    />
                    <Button 
                        variant="destructive"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>
                <div>
                    filter
                </div>
            </div>
            {/* Filter */}

            {/* Notes */}
            {notes && notes.length > 0 ? (
                <div className="grid px-44 grid-cols-3 justify-between gap-10 mb-4">
                    {notes.map((note, index) => {
                        return(
                            <a href={`/note/${note.id}`} key={index}>
                                <Card>
                                    <CardHeader className="flex p-0 w-full max-h-48 items-center overflow-hidden">
                                        <img src="/notulance.png" alt="" />
                                    </CardHeader>
                                    <Separator />
                                    <CardContent className="p-2">
                                        {note.title}
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
    );
};

export default Search;