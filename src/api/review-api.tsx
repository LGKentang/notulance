import { db } from "@/firebase/firebase";
import { ReviewResult } from "@/interfaces/enum/review_enum";
import { Review } from "@/interfaces/transaction/review";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

async function getAllReviews(filterByReviewResult: ReviewResult): Promise<Review[]> {
    try {
        const reviewsCollection = collection(db, 'reviews');
        
        const reviewQuery = query(reviewsCollection, where('reviewResult', '==', filterByReviewResult));
        
        const reviewSnapshot = await getDocs(reviewQuery);

        const reviewsList = reviewSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Review));

        return reviewsList;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw error;
    }
}


async function getReviewById(reviewId: string) {
    try {
        const reviewRef = doc(db, 'reviews', reviewId);
        const review = await getDoc(reviewRef);

        if (review.exists()) {
            return { id: review.id, ...review.data() } as Review;
        } else {
            console.error("No such review exists!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching review by ID:", error);
        throw error;
    }
}


export { getAllReviews }