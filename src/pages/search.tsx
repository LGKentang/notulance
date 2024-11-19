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
import Footer from "@/components/footer";

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

            <div className="flex flex-col w-full px-6 sm:px-32 md:px-52 py-6">
                {/* Search Bar */}
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-5 mb-2">
                    <Input 
                        placeholder="Search..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="text-xl p-4 w-full md:w-[75%]"
                    />
                    <Button 
                        variant="destructive"
                        onClick={handleSearch}
                        className="text-xl p-4 w-full md:w-[25%]"
                    >
                        Search
                    </Button>
                </div>
                {/* Filter */}
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 justify-center">
                    <div className="flex flex-col items-center w-full md:w-[25%]">
                        <Label className="text-lg">Grade</Label>
                        <Select onValueChange={(value) => handleFilterChange('grade', value as 'asc' | 'desc')}>
                            <SelectTrigger>
                                <SelectValue placeholder="None" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col items-center w-full md:w-[25%]">
                        <Label className="text-lg">Price</Label>
                        <Select onValueChange={(value) => handleFilterChange('price', value as 'asc' | 'desc')}>
                            <SelectTrigger>
                                <SelectValue placeholder="None" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col items-center w-full md:w-[25%]">
                        <Label className="text-lg">Subject</Label>
                        <Select onValueChange={(value) => handleFilterChange('subject', value as 'asc' | 'desc')}>
                            <SelectTrigger>
                                <SelectValue placeholder="None" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col items-center w-full md:w-[25%]">
                        <Label className="text-lg">University</Label>
                        <Select onValueChange={(value) => handleFilterChange('university', value as 'asc' | 'desc')}>
                            <SelectTrigger>
                                <SelectValue placeholder="None" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col items-center w-full md:w-[25%]">
                        <Label className="text-lg">Ranking</Label>
                        <Select onValueChange={(value) => handleFilterChange('ranking', value as 'asc' | 'desc')}>
                            <SelectTrigger>
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
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-6 sm:px-24 md:px-40 justify-between gap-10 mb-4">
                    {notes.map((note, index) => {
                        return(
                            <a href={`/note/preview/${note.id}`} key={index}>
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
                <div className="flex px-6 sm:px-32 md:px-40 justify-center text-red-500">
                    <img src="/loading.png"/>
                    <h1 className="pt-32">Loading.. .. ..</h1>
                </div>
            )}
        <Footer />
        </div>
    );
};

export default Search;