import { db } from "@/firebase/firebase";
import { ReviewResult } from "@/interfaces/enum/review_enum";
import { Review } from "@/interfaces/transaction/review";
import { collection, getDocs, query, where } from "firebase/firestore";

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

export { getAllReviews }