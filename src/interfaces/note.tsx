import { Timestamp } from "firebase/firestore";

export interface Note {
    id?: string;
    title: string;
    description: string;
    writerId: string;
    price: number;
    releaseDate: Timestamp;
    university?: string | null;
    grade?: number;
    fileId: string;
    score?: number;
    bundleId?: string | null; 
}
