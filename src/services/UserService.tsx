import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { UserModel } from "@/@types/models";

export async function findUserById(id: string): Promise<UserModel | null> {
    const userDocRef = doc(db, 'users', id);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData as UserModel;
    }

    return null;
}

export async function createUser(user: UserModel, id: string): Promise<void> {
    await setDoc(doc(collection(db, "users"), id), {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
    });
}


export async function updateUser(id: string, updateDate: Partial<UserModel>): Promise<void | null> {
    const userDocRef = doc(db, 'users', id);
    
    try {
        await updateDoc(userDocRef, { ...updateDate })        
    } catch (error: any) {
        throw new Error("Error update user: ", error);
    }
}

