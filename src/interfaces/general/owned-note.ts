import { Timestamp } from "firebase/firestore";
import { Note } from "./note";

export interface OwnedNote {
    id?: string;
    noteId : string;
    note : Note;
    purchasedAt : Timestamp;
    downloadUrl : string;
    fileUrl : string;
}
