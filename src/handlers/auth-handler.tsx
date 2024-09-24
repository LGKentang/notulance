import { createUser } from "@/api/user-api";
import { auth } from "@/firebase/firebase"
import { FirebaseUser } from "@/interfaces/firebase-user";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

async function userLogin(email: string, password: string) {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);

        console.log(response.user);
    } catch (error : any) {
        let errorMessage = "Error while signing in.";
        if (error.code === 'auth/wrong-password') {
            errorMessage = "Incorrect password. Please try again.";
        } else if (error.code === 'auth/user-not-found') {
            errorMessage = "No user found with this email.";
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = "The email address is invalid.";
        } else if (error.code === 'auth/too-many-requests') {
            errorMessage = "Too many failed login attempts. Try again later.";
        }
        console.error("Error while trying signin you in :", errorMessage);
        throw new Error(errorMessage); 
    }
}

async function userRegister(name: string, email: string, password: string, confirmPassword: string){

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
        console.log("All fields must be filled");
        return;
    }
    if(trimmedName.length < 3){
        console.log("Name must be 2 more than characters");
        return;
    }
    if (password !== confirmPassword) {
        console.log("Passwords must match");
        return;
    }

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const user: FirebaseUser ={
            name: name,
            email: email,
            role: "",
            authId: res.user.uid
        }

        const response = await createUser(user);
        console.log(response);

    } catch (error) {
        console.error("Error creating user: ", error);
        throw error;
    }
}

export { userLogin, userRegister };