import { Timestamp } from "firebase/firestore/lite";
import { Note } from "./note";

export interface Bundle {
    bundleId: string;  
    noteIds: string[];
    bundlePrice: number; 
}

export interface CartItem {
    type: 'note' | 'bundle'; 
    item: Note | Bundle;
    quantity: number;            
}

export interface Cart {
    id?:string;
    items: CartItem[];     
    totalPrice: number; 
    userId: string;             
    createdAt: Timestamp;   
    updatedAt: Timestamp;            
}

