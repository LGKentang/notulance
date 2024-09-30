import { addPaymentMethodToTransaction, updateTransactionStatus } from "@/api/transaction-api";
import { getCurrentUserId } from "@/api/user-api";
import { OrderStatus, PaymentMethod, PaymentStatus } from "@/interfaces/enum/transaction_enum";

async function purchaseTransaction(transactionId: string, paymentMethod: PaymentMethod) {
    try {
        await addPaymentMethodToTransaction(transactionId, paymentMethod);
        await updateTransactionStatus(transactionId, OrderStatus.Pending, OrderStatus.Processing, PaymentStatus.Completed);

        console.log("Transaction processed successfully");
    } catch (error) {
        console.error("Error during transaction purchase:", error);
        throw error;
    }
}

export { purchaseTransaction }