import { Timestamp } from "firebase/firestore";
import { Cart } from "./cart";

export interface Transaction{
    id? : string | null;
    buyerId : string;
    cart : Cart;
    price : number;
    currency : string;
    paymentStatus : string;
    paymentMethod? : string;
    orderStatus : string;
    createdAt : Timestamp;
    updatedAt : Timestamp;
    history : History[] | null;
    refundDeadline : Timestamp
}

export interface History{
    status : string;
    timestamp  : Timestamp;
}