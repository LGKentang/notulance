import { collection, getDocs, doc, getDoc, setDoc, addDoc, Timestamp } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { Cart, CartItem, Bundle } from "@/interfaces/transaction/cart";
import { Note } from "@/interfaces/general/note";


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
        totalPrice += cartItem.quantity * itemPrice;
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

export { createCart, getCartById, updateCart, addItemToCart };
