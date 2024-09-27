import { useEffect, useState } from "react";
import { createNote, getAllNotes } from "@/api/note-api";
import { Note } from "@/interfaces/general/note";
import { Timestamp } from "firebase/firestore";
import { searchNotes } from "@/handlers/home-handler";
import { Filter } from "@/interfaces/general/filter";
import { Bundle, CartItem } from "@/interfaces/transaction/cart";
import { createBundle, getBundleById } from "@/api/bundle-api";
import { addCartItemToCart } from "@/handlers/cart-handler";
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
    //             grade:'asc'
    //         } as Filter);
    //         console.log(data);
    //     }
    //     fetchUserData()
    // }, [])


    // async function makeNewBundle(){
    //     const noteIds = ["R5fyZYBd1miMIWomlMkV","ZGuc80SxtEa2WWP5FrU8","HSa7BYFmqOTqtuuASsUn"]
    //     const discount = 20;

    //     const bundleId = await createBundle(noteIds, discount);
    //     console.log(bundleId)
    // }

    // Function to test something with div
    // function doSomething() {
    //     const data = await createNote(
    //         {
    //             title: "Introduction to Artificial Neural Network",
    //             description: "A comprehensive guide to deep learning concepts and techniques.",
    //             writerId: "user-98765",
    //             price: 29.99,
    //             subject: "Artificial Intelligence",
    //             releaseDate: Timestamp.fromDate(new Date("2024-09-26T11:06:39Z")),
    //             university: "Harvard University",
    //             grade: 4,
    //             fileId: "file-abcde12345",
    //             score: 4.5,
    //             bundleId: null,
    //             thumbnailUrl: "https://example.com/thumbnail.jpg",
    //             totalPages: 100
    //         } as Note
    //     )
    // }


    async function addBundleToCart(){
        const bundle : Bundle | null = await getBundleById("4tsaPsHDYjJp8Bfd82Yr")
        console.log(bundle)
        if (!bundle){
            throw new Error("Bundle does not exist")
        }

        const cartItem : CartItem = {
            item : bundle,
            quantity : 1,
            type : 'bundle'
        } 


        await addCartItemToCart(cartItem);
    }
    

    return <>

        {/* <input type="file" />
        <br /><br /> */}
        <button onClick={addBundleToCart} className="text-white">
            Do Something!
        </button>

    </>
}

export default ApiTesting;