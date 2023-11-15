import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { ClientModel } from "@/@types/models";

const db_document = 'clients';

export async function findUserById(id: string): Promise<ClientModel | null> {
    const userDocRef = doc(db, db_document, id);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        return { id: userData.id, ...userData } as ClientModel;
    }

    return null;
}


export async function createUser(user: Omit<ClientModel, 'id'>, id: string): Promise<void> {
  try {
      await setDoc(doc(collection(db, db_document), id), {
          ...user
      });
  } catch (error: any) {
      throw new Error("Error create user: ", error);
  }
}


export async function updateUser(id: string, updateDate: Partial<ClientModel>): Promise<void | null> {
    const userDocRef = doc(db, db_document, id);
    
    try {
        await updateDoc(userDocRef, { ...updateDate })        
    } catch (error: any) {
        throw new Error("Error update user: ", error);
    }
}

