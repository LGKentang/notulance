import { fetchBlobFromUrl, uploadPdfToStorage, uploadPdfToTemporaryStorage } from "@/api/file-api";
import { createNote, getNoteById } from "@/api/note-api";
import { db } from "@/firebase/firebase";
import { ReviewStatus, ReviewResult } from "@/interfaces/enum/review_enum";
import { Note } from "@/interfaces/general/note";
import { Review } from "@/interfaces/transaction/review";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";

async function startReviewNote(sellerId: string, note : Note, pdf : Blob) {
    if (!note) {
        throw new Error("Note not found");
    }
    const imgUrl = await uploadPdfToTemporaryStorage(pdf)

    note.fileId = imgUrl

    const review: Review = {
        sellerId,
        notes: note,
        reviewStatus: ReviewStatus.Reviewing,
        reviewResult: ReviewResult.Pending,
    };


    try {
        const docRef = await addDoc(collection(db, 'reviews'), review);
        console.log("Review added with ID: ", docRef.id);

        return { ...review, id: docRef.id };
    } catch (error) {
        console.error("Error adding review: ", error);
        throw error;
    }

}

async function updateNoteReviewResult(reviewId: string, reviewResult: ReviewResult, rejectReason?: string) {
    try {
        const reviewRef = doc(db, 'reviews', reviewId);
        const reviewSnapshot = await getDoc(reviewRef);

        if (!reviewSnapshot.exists()) {
            throw new Error("Review not found");
        }


        const review = reviewSnapshot.data() as Review

        if (reviewResult === ReviewResult.Pending) {
            throw new Error("Updating review result cannot be the same state (Pending)");
        }

        if (reviewSnapshot.exists()) {
            const updateData: any = {
                reviewStatus: ReviewStatus.Finish,
                reviewResult: reviewResult
            };

            if (reviewResult === ReviewResult.Denied && rejectReason) {
                updateData.rejectReason = rejectReason;
            }
            if (reviewResult === ReviewResult.Accepted && review && review.notes) {
                const newNoteId = await createNote(review.notes);

                const blob = await fetchBlobFromUrl(review.notes.fileId)
                await uploadPdfToStorage(newNoteId,blob);
            }
            
            await updateDoc(reviewRef, updateData);

            console.log(`Review status updated to ${reviewResult}`);
        } else {
            throw new Error("Review not found");
        }
    } catch (error) {
        console.error("Error updating review: ", error);
        throw error; 
    }
}



export { startReviewNote , updateNoteReviewResult }