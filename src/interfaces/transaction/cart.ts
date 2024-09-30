import { Timestamp } from "firebase/firestore/lite";
import { Note } from "../general/note";

export interface Bundle {
    id?: string | null;  
    noteIds: string[];
    bundlePrice: number; 
    discount : number;
}

export interface CartItem {
    type: string; 
    item: Note | Bundle;
}

export interface Cart {
    id?:string;
    items: CartItem[];     
    totalPrice: number;         
    createdAt: Timestamp;   
    updatedAt: Timestamp;      
}

