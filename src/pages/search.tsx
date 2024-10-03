import { getNoteById, getNotesByIds } from "@/api/note-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavBar } from "@/components/navbar";
import { searchNotes } from "@/handlers/home-handler";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Filter } from "@/interfaces/general/filter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const Search = () => {
    const [search, setSearch] = useState<string>('')
    const [notes, setNotes] = useState<any[] | null>()
    const [filter, setFilter] = useState<Filter>({})

    const handleFilterChange = (key: keyof Filter, value: 'asc' | 'desc') => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            [key]: value,
        }));
    };

    const handleSearch = async() => {
        console.log(filter)

        const isFilterUsed = Object.values(filter).some(value => value);
        console.log(isFilterUsed)

        const tempIds = await searchNotes(search, isFilterUsed, filter);

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
                        className="text-xl p-6"
                    />
                    <Button 
                        variant="destructive"
                        onClick={handleSearch}
                        className="text-xl p-6"
                    >
                        Search
                    </Button>
                </div>
                {/* Filter */}
                <div className="flex space-x-4 justify-center">
                    <div className="flex flex-col items-center w-[25%]">
                        <Label className="text-lg">Grade</Label>
                        <Select onValueChange={(value) => handleFilterChange('grade', value as 'asc' | 'desc')}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="None" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col items-center w-[25%]">
                        <Label className="text-lg">Price</Label>
                        <Select onValueChange={(value) => handleFilterChange('price', value as 'asc' | 'desc')}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="None" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col items-center w-[25%]">
                        <Label className="text-lg">Subject</Label>
                        <Select onValueChange={(value) => handleFilterChange('subject', value as 'asc' | 'desc')}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="None" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col items-center w-[25%]">
                        <Label className="text-lg">University</Label>
                        <Select onValueChange={(value) => handleFilterChange('university', value as 'asc' | 'desc')}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="None" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col items-center w-[25%]">
                        <Label className="text-lg">Ranking</Label>
                        <Select onValueChange={(value) => handleFilterChange('ranking', value as 'asc' | 'desc')}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="None" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Notes */}
            {notes && notes.length > 0 ? (
                <div className="grid px-44 grid-cols-3 justify-between gap-10 mb-4">
                    {notes.map((note, index) => {
                        return(
                            <a href={`/note/${note.id}`} key={index}>
                                <Card className="border-black border-2 drop-shadow-2xl">
                                    <CardHeader className="flex p-0 w-full max-h-48 items-center overflow-hidden">
                                        <img src={note.thumbnailUrl} alt="" />
                                    </CardHeader>
                                    <Separator />
                                    <CardContent className="p-2">
                                        <h1 className="text-xl">{note.title}</h1>
                                        <div className="text-red-500">Rp {note.price}</div>
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