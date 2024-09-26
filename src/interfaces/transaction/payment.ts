import { Timestamp } from "firebase/firestore";

export interface Payment{
    id? : string | null;
    userId : string;
    amount : number;
    status : string;
    createdAt : Timestamp;
    paymentMethod : string;
}