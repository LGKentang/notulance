import { Timestamp } from "firebase/firestore";

export interface Refund{
    id? : string | null;
    transactionId : string;
    refundReason : string;
    refundMethod : string;
    createdAt : Timestamp;
    supportingDocuments : string[];
}