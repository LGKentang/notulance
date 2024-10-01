import { useEffect, useState } from "react";
import { createNote, getAllNotes, getNoteById } from "@/api/note-api";
import { Note } from "@/interfaces/general/note";
import { Timestamp } from "firebase/firestore";
import { searchNotes } from "@/handlers/home-handler";
import { Filter } from "@/interfaces/general/filter";
import { Bundle, CartItem } from "@/interfaces/transaction/cart";
import { createBundle, getBundleById } from "@/api/bundle-api";
import { addCartItemToCart, checkoutCart } from "@/handlers/cart-handler";
import { startReviewNote, updateNoteReviewResult } from "@/handlers/review-handler";
import { handleCreateBundle } from "@/handlers/bundle-handler";
import { ReviewResult } from "@/interfaces/enum/review_enum";
import { purchaseTransaction } from "@/handlers/payment-handler";
import { PaymentMethod } from "@/interfaces/enum/transaction_enum";

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

    //     const bundleId = await handleCreateBundle(noteIds, discount);
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


    async function addBundleToCart() {
        const bundle: Bundle | null = await getBundleById("1QayKUgURrs6J6vuex4o")
        console.log(bundle)
        if (!bundle) {
            throw new Error("Bundle does not exist")
        }

        const cartItem: CartItem = {
            item: bundle,
            type: 'bundle'
        }


        await addCartItemToCart(cartItem);
    }

    async function addNoteToCart() {
        const note: Note | null = await getNoteById("Svm4isPuFE9ZHukLKGHn")

        if (!note) {
            throw new Error("Note does not exist")
        }

        const cartItem: CartItem = {
            item: note,
            type: 'note'
        }


        await addCartItemToCart(cartItem);
    }

    // async function checkoutCart(){
    //     await removeCartItem(1)
    // }

    // async function reviewNote() {


    //     const note = {
    //         title: "Introduction to Artificial Neural Network",
    //         description: "A comprehensive guide to deep learning concepts and techniques.",
    //         writerId: "user-98765",
    //         price: 29.99,
    //         subject: "Artificial Intelligence",
    //         releaseDate: Timestamp.fromDate(new Date("2024-09-26T11:06:39Z")),
    //         university: "Harvard University",
    //         grade: 4,
    //         fileId: "file-abcde12345",
    //         score: 4.5,
    //         bundleId: null,
    //         thumbnailUrl: "https://example.com/thumbnail.jpg",
    //         totalPages: 100
    //     } as Note


    //     await startReviewNote("510BlmJ335N0lps4Vj7m", note);
    // }

    async function acceptNoteReview() {
        const reviewId: string = "48BSJeH5UfDVFWT1iMPj"
        await updateNoteReviewResult(reviewId, ReviewResult.Accepted);
    }

    async function checkoutAndCreateTransaction() {
        await checkoutCart()
    }

    async function purchaseTransactionTest() {
        await purchaseTransaction("mOhegvWjT6B9059Y6JGV", PaymentMethod.Gopay)
    }

    return <>

        {/* <input type="file" />
        <br /><br /> */}

        <button onClick={acceptNoteReview} className="text-white mb-5">
            Accept Note
        </button>


        <button onClick={addBundleToCart} className="text-white mb-5">
            Add Bundle
        </button>
        <br />
        <button onClick={addNoteToCart} className="text-white mb-5">
            Add Note
        </button>
        <br />
        <button onClick={checkoutAndCreateTransaction} className="text-white mb-5">
            Checkout
        </button>


        <button onClick={purchaseTransactionTest} className="text-white mb-5">
            Purchase
        </button>

    </>
}

export default ApiTesting;