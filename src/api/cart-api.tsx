import { collection, getDocs, doc, getDoc, setDoc, addDoc, Timestamp } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { Cart, CartItem, Bundle } from "@/interfaces/transaction/cart";
import { Note } from "@/interfaces/general/note";
import { getAuth } from "firebase/auth";
import { getUserByAuthId } from "./user-api";
import { FirebaseUser } from "@/interfaces/user/firebase-user";


async function createCart() {
    try {
        const cart: Cart = {
            items: [],
            totalPrice: 0,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        };

        const cartsCollection = collection(db, 'carts');
        const cartDocRef = await addDoc(cartsCollection, cart);

        console.log("Cart created successfully with ID:", cartDocRef.id);
        return cartDocRef.id;
    } catch (error) {
        console.error("Error creating cart:", error);
        throw error;
    }
}

// TODO : make the update cart function respond to the item id,
// so if the item is the same, reject any changes

async function getCartById(cartId: string) {
    try {
        const cartDocRef = doc(db, 'carts', cartId);
        const cartDoc = await getDoc(cartDocRef);

        if (cartDoc.exists()) {
            return { id: cartDoc.id, ...cartDoc.data() } as Cart;
        } else {
            console.error("No such note exists!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching note by ID:", error);
        throw error;
    }
}


async function updateCart(cartId: string, updatedCart: Partial<Cart>) {
    try {
        const cartDocRef = doc(db, 'carts', cartId);
        await setDoc(cartDocRef, updatedCart, { merge: true });

        console.log("Cart updated successfully:", cartId);
    } catch (error) {
        console.error("Error updating cart:", error);
        throw error;
    }
}

function calculateTotalPrice(cart: Cart): number {
    let totalPrice = 0;
    for (const cartItem of cart.items) {
        let itemPrice: number;
        if (cartItem.type === 'bundle') {
            itemPrice = (cartItem.item as Bundle).bundlePrice;
        } else {
            itemPrice = (cartItem.item as Note).price;
        }
        totalPrice += itemPrice;
    }

    return totalPrice;
}

async function addItemToCart(userId: string, cartItem: CartItem) {
    try {
        const cart = await getCartById(userId);
        if (!cart) throw new Error("Cart not found");
        if (!cart.id) throw new Error("Cart ID not exist")


        cart.items.push(cartItem);
        cart.totalPrice = calculateTotalPrice(cart)

        await updateCart(cart.id, { items: cart.items, totalPrice: cart.totalPrice, updatedAt: Timestamp.now() });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw error;
    }
}

async function removeCartItem(index: number) {
    try {
        const auth = getAuth(); 
        const user = auth.currentUser;
        
        if (!user) {
            throw new Error("User is not authenticated");
        }

        const authUser :  FirebaseUser | null = await getUserByAuthId(user.uid);
        if (!authUser) throw new Error("User is not found")
        if (!authUser.id) throw new Error("User is not found")
            
        const cart = await getCartById(authUser.cartId);
        if (!cart) throw new Error("Cart not found");
        if (!cart.id) throw new Error("Cart ID does not exist");

        if (index < 0 || index >= cart.items.length) {
            throw new Error("Invalid item index");
        }

        cart.items.splice(index, 1); 

        cart.totalPrice = calculateTotalPrice(cart);

        await updateCart(cart.id, { 
            items: cart.items, 
            totalPrice: cart.totalPrice, 
            updatedAt: Timestamp.now() 
        });

        console.log("Item removed successfully");

    } catch (error) {
        console.error("Error removing item from cart:", error);
        throw error;
    }
}

async function checkout(): Promise<Cart> {
    try {
        const auth = getAuth(); 
        const user = auth.currentUser;
        
        if (!user) {
            throw new Error("User is not authenticated");
        }

        const authUser: FirebaseUser | null = await getUserByAuthId(user.uid);
        if (!authUser) throw new Error("User not found");
        if (!authUser.id) throw new Error("User ID not found");

        const cart = await getCartById(authUser.cartId);
        if (!cart) throw new Error("Cart not found");
        if (!cart.id) throw new Error("Cart ID does not exist");
        if (cart.items.length === 0) {
            throw new Error("Cannot checkout with an empty cart");
        }

        const snapshot = { ...cart };
        cart.items = [];
        cart.totalPrice = 0;

        await updateCart(cart.id, { 
            items: cart.items, 
            totalPrice: cart.totalPrice, 
            updatedAt: Timestamp.now()
        });

        console.log("Cart checked out successfully");

        return snapshot;

    } catch (error) {
        console.error("Error during checkout: ", error);
        throw error;
    }
}




export { createCart, getCartById, updateCart, addItemToCart, removeCartItem , checkout};
