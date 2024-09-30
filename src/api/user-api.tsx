import { collection, getDocs, doc, getDoc, setDoc, addDoc, query, where } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { FirebaseUser } from "@/interfaces/user/firebase-user";
import { getAuth } from "firebase/auth";


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

async function getUserByAuthId(userAuthId: string): Promise<FirebaseUser | null> {
    try {
        const usersRef = collection(db, 'users'); 
        const q = query(usersRef, where("authId", "==", userAuthId));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.error("No user found with the specified auth ID!");
            return null; 
        }

        const userData = querySnapshot.docs[0]; 
        return { id: userData.id, ...userData.data() } as FirebaseUser; 
        
    } catch (error) {
        console.error("Error fetching user by auth ID:", error);
        throw error;
    }
}

async function getCurrentUserId(): Promise<string> {
    const auth = getAuth(); 
    const user = auth.currentUser;
    
    if (!user) {
        throw new Error("User is not authenticated");
    }

    const authUser: FirebaseUser | null = await getUserByAuthId(user.uid);
    
    if (!authUser || !authUser.id) {
        throw new Error("Authenticated user not found or missing user ID");
    }

    return authUser.id;
}


export { createUser, getAllUsers, getUserById , getUserByAuthId, getCurrentUserId };
