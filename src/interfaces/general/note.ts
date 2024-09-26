import { Timestamp } from "firebase/firestore";

export interface Note {
    id?: string;
    title: string;
    description: string;
    writerId: string;
    price: number;
    subject: string;
    releaseDate: Timestamp;
    university?: string | null;
    grade?: number;
    fileId: string;
    score?: number;
    bundleId?: string | null; 
    thumbnailUrl: string | null;
    totalPages : number;
    ranking : number;
}

export interface SimpleNote {
    id?: string;
    title: string;
}