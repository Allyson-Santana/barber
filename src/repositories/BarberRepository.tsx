import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { BarberModel } from "@/@types/models";

const db_document = 'barbers';

export async function findBarberById(id: string): Promise<BarberModel | null> {
    const barberDocRef = doc(db, db_document, id);
    const barberDoc = await getDoc(barberDocRef);

    if (barberDoc.exists()) {
        const barberData = barberDoc.data();
        return { ...barberData, id: barberDoc.id } as BarberModel;
    }

    return null;
}


export async function findAllbarbers(): Promise<BarberModel[]> {
    const barbersColRef = collection(db, db_document);
    const barbersSnapshot = await getDocs(barbersColRef);

    const barbersList: BarberModel[] = [];

    barbersSnapshot.forEach((doc) => {
        const barberData = doc.data();
        barbersList.push({ id: doc.id, ...barberData } as BarberModel);
    });

    return barbersList;
}


