import { useEffect } from "react";
import { createNote, getAllNotes } from "@/api/note-api";
import { Note } from "@/interfaces/general/note";
import { Timestamp } from "firebase/firestore";
import { searchNotes } from "@/handlers/home-handler";
import { Filter } from "@/interfaces/general/filter";
const ApiTesting = () => {

    // Create Note Test
    // useEffect(() => {
    //     const createNote_ = async () => {
    //         const data = await createNote(
    //             {
    //                 title: "Introduction to Artificial Neural Network",
    //                 description: "A comprehensive guide to deep learning concepts and techniques.",
    //                 writerId: "user-98765",
    //                 price: 29.99,
    //                 subject: "Artificial Intelligence",
    //                 releaseDate: Timestamp.fromDate(new Date("2024-09-26T11:06:39Z")),
    //                 university: "Harvard University", 
    //                 grade: 4, 
    //                 fileId: "file-abcde12345", 
    //                 score: 4.5, 
    //                 bundleId: null, 
    //                 thumbnailUrl: "https://example.com/thumbnail.jpg", 
    //                 totalPages: 100 
    //             } as Note
    //         )
    //         console.log(data);
    //     }
    //     createNote_()
    // }, [])


    // Query Notes Test
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         const data = await searchNotes("", true, {
    //             grade:4
    //         } as Filter);
    //         console.log(data);
    //     }
    //     fetchUserData()
    // }, [])

    return <>

    </>
}

export default ApiTesting;