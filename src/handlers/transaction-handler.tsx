import { OrderStatus } from "@/interfaces/enum/transaction_enum";
import { Cart, CartItem } from "@/interfaces/transaction/cart";
import { Transaction } from "@/interfaces/transaction/transaction";


async function processAndDeliverTransaction(transactionId : string){
    

    // move the orderstatus from processing to delivered
}

async function refundTransaction(transactionId : string){
    // move the orderstatus from delivered to refund 
    OrderStatus.Delivered
}