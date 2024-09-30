
import { addItemToCart, checkout } from "@/api/cart-api";
import { getUserByAuthId } from "@/api/user-api";
import { CartItem } from "@/interfaces/transaction/cart";
import { FirebaseUser } from "@/interfaces/user/firebase-user";
import { getAuth } from "firebase/auth";

async function addCartItemToCart(cartItem: CartItem) {
    const auth = getAuth(); 
    const user = auth.currentUser;
    
    validateBundle(cartItem)

    if (!user) {
        throw new Error("User is not authenticated");
    }

    const authUser :  FirebaseUser | null = await getUserByAuthId(user.uid);

    if (!authUser) throw new Error("User is not found")
    if (!authUser.id) throw new Error("User is not found")
    console.log(authUser.id)
    await addItemToCart(authUser.cartId, cartItem);
}

async function validateBundle(cartItem : CartItem){
    if (cartItem.type != "bundle"){
        throw new Error("Item must be a bundle")
    }
}



async function checkoutCart(){
    await checkout()
    
}

export {addCartItemToCart, checkoutCart}