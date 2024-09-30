import { ReviewResult, ReviewStatus } from "../enum/review_enum";
import { Note } from "../general/note";

export interface Review{
    id? : string;
    sellerId : string;
    notes : Note;
    rejectReason? : string 
    reviewStatus : ReviewStatus;
    reviewResult : ReviewResult;
}