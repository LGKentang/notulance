import { getReviewById } from "@/api/review-api";
import { NavBar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ReviewPageDetail() {
    const { reviewId } = useParams();
    const [review, setReview] = useState<any | null>(null);

    const loadNoteWithID = async () => {        
        if(reviewId != null){
            const temp = await getReviewById(reviewId);
            setReview(temp);
        }
    }
    useEffect(() => {
        loadNoteWithID()
    }, [reviewId]);

    return (
        <div className="w-screen h-screen">
            <NavBar />
            <div className="p-12 bg-white">
                {review ? (
                    <>
                        <h1 className="text-3xl">{review.notes.title}</h1>
                        <br />
                        <Card className="w-11/12 h-96 bg-gray-200">
                            {review.notes.thumbnailUrl}
                        </Card>
                        <br />
                        <div className="mb-6">
                            <h2 className="text-xl font-bold">Details</h2>
                            <p><strong>Title:</strong> {review.notes.title}</p>
                            <p><strong>Subject:</strong> {review.notes.subject}</p>
                            <p><strong>University:</strong> {review.notes.university}</p>
                            <p><strong>Pages:</strong> {review.notes.totalPages}</p>
                            <p><strong>Score:</strong> {review.notes.score}</p>
                            <p><strong>Grade:</strong> {review.notes.grade}</p>
                            <p><strong>Price:</strong> ${review.notes.price}</p>
                            <p><strong>Description:</strong> {review.notes.description}</p>
                            <p><strong>Release Date:</strong> {review.notes.releaseDate.seconds}</p>
                            <p><strong>File ID:</strong> {review.notes.fileId}</p>
                            <p><strong>Writer ID:</strong> {review.notes.writerId}</p>
                            <p><strong>Review Status:</strong> {review.reviewStatus}</p>
                            <p><strong>Review Result:</strong> {review.reviewResult}</p>
                            <p><strong>Seller ID:</strong> {review.sellerId}</p>
                        </div>
                        <div>
                            <h3>Notes / Reason / Violations:</h3>
                            <textarea
                                className="bg-gray-100 w-96"
                                placeholder="plagiarism... bad writing... unproper picture.... etc"
                            ></textarea>
                        </div>
                        <br />
                        <button className="text-white bg-green-600 mr-4">Approve</button>
                        <button className="text-white bg-red-800">Reject</button>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
