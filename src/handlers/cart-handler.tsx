
import { addItemToCart, checkout } from "@/api/cart-api";
import { createTransaction } from "@/api/transaction-api";
import { getCurrentUserId, getUserByAuthId } from "@/api/user-api";
import { OrderStatus, PaymentStatus } from "@/interfaces/enum/transaction_enum";
import { CartItem } from "@/interfaces/transaction/cart";
import { History, Transaction } from "@/interfaces/transaction/transaction";
import { FirebaseUser } from "@/interfaces/user/firebase-user";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

async function addCartItemToCart(cartItem: CartItem) {
    const auth = getAuth(); 
    const user = auth.currentUser;


    if (!user) {
        throw new Error("User is not authenticated");
    }

    const authUser :  FirebaseUser | null = await getUserByAuthId(user.uid);

    if (!authUser) throw new Error("User is not found")
    if (!authUser.id) throw new Error("User is not found")
    console.log(authUser.id)
    await addItemToCart(authUser.cartId, cartItem);
}


async function checkoutCart(){
    const cart = await checkout()
    const userId = await getCurrentUserId()

    const initialOrderStatus = OrderStatus.Pending
    const initialPaymentStatus = PaymentStatus.Pending

    const firstHistory : History = {
        status : initialOrderStatus,
        timestamp : Timestamp.now()
    }

    const transaction : Transaction = {
        buyerId : userId,
        cart : cart,
        createdAt : Timestamp.now(),
        currency : 'IDR',
        history : [firstHistory],
        orderStatus : initialOrderStatus,
        paymentStatus : initialPaymentStatus,
        price : cart.totalPrice,
        refundDeadline : addDaysToTimestamp(7),
        updatedAt : Timestamp.now(),
    } 

    await createTransaction(transaction)
}

function addDaysToTimestamp(days: number): Timestamp {
    const now = Timestamp.now().toDate();  
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000); 
    return Timestamp.fromDate(futureDate);  
}

export {addCartItemToCart, checkoutCart}