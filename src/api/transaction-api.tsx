import { db } from "@/firebase/firebase";
import { OrderStatus } from "@/interfaces/enum/transaction_enum";
import { History, Transaction } from "@/interfaces/transaction/transaction";
import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";

async function createTransaction(transaction : Transaction){
    try{
        const transactionCollection = collection(db,'transactions');
        const transactionDocRef = await addDoc(transactionCollection, transaction);

        console.log("Transaction created successfully with ID:", transactionDocRef.id);
        return transactionDocRef.id;
    }
    catch(e){
        console.error("Error creating transaction:", e);
        throw e;
    }
}

async function updateTransactionStatus(transactionId: string, currentStatus: OrderStatus, newStatus: OrderStatus) {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.Pending]: [OrderStatus.Processing],
      [OrderStatus.Processing]: [OrderStatus.Delivered],
      [OrderStatus.Delivered]: [OrderStatus.Cancelled],
      [OrderStatus.Cancelled]: [OrderStatus.Refunded],
      [OrderStatus.Refunded]: [], 
    };
  
    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new Error(`Invalid state transition from ${currentStatus} to ${newStatus}`);
    }
  
    try {
      const transactionRef = doc(db, 'transactions', transactionId);
      const transactionSnap = await getDoc(transactionRef);
  
      if (!transactionSnap.exists()) {
        throw new Error("Transaction not found");
      }
  
      const transaction = transactionSnap.data() as Transaction;
  
      const newHistory = [...(transaction.history || []), {
        status: newStatus,
        timestamp: new Date() // Replace with Timestamp if needed
      }];
  
      // Update the transaction status and history in Firestore
      await updateDoc(transactionRef, {
        status: newStatus,
        history: newHistory
      });
  
      console.log(`Transaction ${transactionId} updated to status ${newStatus}`);
      return { ...transaction, status: newStatus, history: newHistory }; // Returning the updated transaction
    } catch (e) {
      console.error('Failed to update transaction status:', e);
      throw e; // Rethrow to be caught higher up in the app
    }
  }



export { createTransaction }