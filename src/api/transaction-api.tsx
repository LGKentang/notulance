import { db } from "@/firebase/firebase";
import { OrderStatus, PaymentStatus } from "@/interfaces/enum/transaction_enum";
import { History, Transaction } from "@/interfaces/transaction/transaction";
import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";

async function createTransaction(transaction: Transaction) {
  try {
    const transactionCollection = collection(db, 'transactions');
    const transactionDocRef = await addDoc(transactionCollection, transaction);

    console.log("Transaction created successfully with ID:", transactionDocRef.id);
    return transactionDocRef.id;
  }
  catch (e) {
    console.error("Error creating transaction:", e);
    throw e;
  }
}

async function getTransactionById(transactionId: string) {
  try {
    const transactionRef = doc(db, 'transactions', transactionId);
    const transaction = await getDoc(transactionRef);

    if (transaction.exists()) {
      return { id: transaction.id, ...transaction.data() } as Transaction;
    } else {
      console.error("No such transaction exists!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching transaction by ID:", error);
    throw error;
  }
}

async function addPaymentMethodToTransaction(transactionId: string, paymentMethod: string) {
  try {
    const transactionRef = doc(db, "transactions", transactionId);
    const transactionSnapshot = await getDoc(transactionRef);

    if (!transactionSnapshot.exists()) {
      throw new Error("Transaction not found");
    }

    const transactionData = transactionSnapshot.data() as Transaction;

    if (transactionData.paymentMethod) {
      console.log(`Payment method already set: ${transactionData.paymentMethod}`);
      return transactionData;
    }


    await updateDoc(transactionRef, {
      paymentMethod: paymentMethod,
      updatedAt: Timestamp.now(),
    });

    console.log("Payment method added successfully");

    return {
      ...transactionData,
      paymentMethod: paymentMethod,
      updatedAt: Timestamp.now(),
    } as Transaction;

  } catch (error) {
    console.error("Error adding payment method to transaction:", error);
    throw error;
  }
}

async function updateTransactionStatus(
  transactionId: string,
  currentStatus: OrderStatus,
  newStatus: OrderStatus,
  paymentStatus?: PaymentStatus 
) {
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

      const newHistory = [
          ...(transaction.history || []), 
          {
              status: newStatus,
              timestamp: Timestamp.now() 
          }
      ];

      const updateData: Partial<Transaction> = {
          orderStatus: newStatus,
          history: newHistory
      };

      if (paymentStatus) {
          updateData.paymentStatus = paymentStatus;
      }

      await updateDoc(transactionRef, updateData);

      console.log(`Transaction ${transactionId} updated to status ${newStatus}` + (paymentStatus ? ` with payment status ${paymentStatus}` : ''));
      return { ...transaction, status: newStatus, history: newHistory, paymentStatus: paymentStatus || transaction.paymentStatus }; 
  } catch (error) {
      console.error('Failed to update transaction status:', error);
      throw error; 
  }
}



export { createTransaction, getTransactionById, updateTransactionStatus, addPaymentMethodToTransaction } 