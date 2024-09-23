import { collection, getDocs, doc, getDoc, setDoc, addDoc, Timestamp } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { Cart, CartItem, Bundle } from "@/interfaces/cart";
import { Note } from "@/interfaces/note";


async function createCart(userId: string) {
    try {
        const cart: Cart = {
            items: [],
            totalPrice: 0,
            userId,
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

async function getCartByUserId(userId: string) {
    try {
        const cartsCollection = collection(db, 'carts');
        const cartSnapshot = await getDocs(cartsCollection);

        const cart = cartSnapshot.docs.find(doc => doc.data().userId === userId);
        if (cart) {
            return { id: cart.id, ...cart.data() } as Cart;
        } else {
            console.error("No cart found for this user.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching cart by user ID:", error);
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




async function addItemToCart(cartId: string, cartItem: CartItem) {
    try {
        const cart = await getCartByUserId(cartId);
        if (!cart) throw new Error("Cart not found");

        cart.items.push(cartItem);
        cart.totalPrice = calculateTotalPrice(cart)

        await updateCart(cartId, { items: cart.items, totalPrice: cart.totalPrice, updatedAt: Timestamp.now() });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw error;
    }
}

export { createCart, getCartByUserId, updateCart, addItemToCart };
