import { Timestamp } from "firebase/firestore";

export interface Payment{
    id? : string | null;
    userId : string;
    // amount : number;
    // createdAt : Timestamp;
    // status : string;
    paymentMethod : string;
}