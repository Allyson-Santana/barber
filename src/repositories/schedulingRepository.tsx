import { QuerySnapshot, collection, doc, getDoc, getDocs, limitToLast, orderBy, query } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { BarberModel, ClientModel, SchedulingModel, ServiceModel } from "@/@types/models";

const db_document = 'schedulings';

export async function findSchedulingById(id: string): Promise<SchedulingModel | null> {
    const schedulingDocRef = doc(db, db_document, id);
    const schedulingDoc = await getDoc(schedulingDocRef);

    if (schedulingDoc.exists()) {
        const schedulingData = schedulingDoc.data();
        return { ...schedulingData, id: schedulingData.id } as SchedulingModel;
    }

    return null;
}


export async function findAllSchedulings(): Promise<SchedulingModel[]> {
    const schedulingsColRef = collection(db, db_document);

    const schedulingsSnapshot = await getDocs(schedulingsColRef);

    return await (_schedulingMap(schedulingsSnapshot));
}

export async function findRecentSchedulings(limit: number): Promise<SchedulingModel[]> {
    const schedulingsColRef = collection(db, db_document);

    const schedulingsSnapshot = await getDocs(
        query(schedulingsColRef, orderBy('date', 'desc'), limitToLast(limit))
    );

    return await (_schedulingMap(schedulingsSnapshot));
}


async function _schedulingMap(schedulingsSnapshot: QuerySnapshot): Promise<SchedulingModel[]> {
    const schedulingsList: SchedulingModel[] = [];

    for (const doc of schedulingsSnapshot.docs) {
        const schedulingData = doc.data();

        const clientDoc = await getDoc(schedulingData.client);
        const clientData = clientDoc.data() as ClientModel;

        const serviceDoc = await getDoc(schedulingData.service);
        const serviceData = serviceDoc.data() as ServiceModel;

        const barberDoc = await getDoc(schedulingData.barber);
        const barberData = barberDoc.data() as BarberModel;

        schedulingsList.push({
            id: doc.id,
            date: schedulingData.date,
            stars: schedulingData.stars,
            client: { ...clientData, id: clientDoc.id },
            service: { ...serviceData, id: serviceDoc.id },
            barber: { ...barberData, id: barberDoc.id },
        });
    }

    return schedulingsList;
}


