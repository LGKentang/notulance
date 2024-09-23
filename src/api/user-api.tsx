import { collection, getDocs, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { FirebaseUser } from "@/interfaces/firebase-user";


async function createUser(user: FirebaseUser) {
    try {
        const usersCollection = collection(db, 'users');
        const userDocRef = await addDoc(usersCollection, user);

        console.log("User created successfully with UID:", userDocRef.id);
        return userDocRef.id;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}


async function getAllUsers() {
    try {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);

        const usersList = userSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as FirebaseUser));

        return usersList;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

async function getUserById(userId: string) {
    try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            return { id: userDoc.id, ...userDoc.data() } as FirebaseUser;
        } else {
            console.error("No such user exists!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
}

export { createUser, getAllUsers, getUserById };
