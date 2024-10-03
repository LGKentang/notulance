import { getTransactionById, updateTransactionStatus } from "@/api/transaction-api";
import { addUserOwnedNotes, getCurrentUserId } from "@/api/user-api";
import { OrderStatus } from "@/interfaces/enum/transaction_enum";
import { Note } from "@/interfaces/general/note";
import { Bundle, Cart, CartItem } from "@/interfaces/transaction/cart";
import { Transaction } from "@/interfaces/transaction/transaction";


async function processAndDeliverTransaction(transactionId: string) {
    const userId: string | null = await getCurrentUserId();
    const transaction: Transaction | null = await getTransactionById(transactionId);

    if (userId == null) throw new Error("User is null");
    if (transaction == null) throw new Error("Transaction is null");
    if (transaction.cart == null) throw new Error("There is no cart in this transaction");
    if (transaction.cart.items == null) throw new Error("There are no cart items in this transaction");

    const cartItems: CartItem[] = (transaction.cart as Cart).items;

    const ownedNoteIds: string[] = [];

    cartItems.forEach((cartItem: CartItem) => {
        if (cartItem.type === "note") {
            const note = cartItem.item as Note;
            if (note.id) {
                ownedNoteIds.push(note.id);
            }
        } else if (cartItem.type === "bundle") {
            const bundle = cartItem.item as Bundle;
            if (bundle.noteIds) {
                ownedNoteIds.push(...bundle.noteIds);
            }
        }
    });

    await addUserOwnedNotes(userId, ownedNoteIds);
    await updateTransactionStatus(transactionId, OrderStatus.Processing, OrderStatus.Delivered);
}

async function payTransaction(transactionId : string) {
    const userId: string | null = await getCurrentUserId();
    const transaction: Transaction | null = await getTransactionById(transactionId);

    if (userId == null) throw new Error("User is null");
    if (transaction == null) throw new Error("Transaction is null");
    if (transaction.cart == null) throw new Error("There is no cart in this transaction");
    if (transaction.cart.items == null) throw new Error("There are no cart items in this transaction");

    await updateTransactionStatus(transactionId, OrderStatus.Pending, OrderStatus.Processing);
    await processAndDeliverTransaction(transactionId)
}


async function refundTransaction(transactionId: string) {
    // move the orderstatus from delivered to refund 
    // OrderStatus.Delivered
}

export { payTransaction }