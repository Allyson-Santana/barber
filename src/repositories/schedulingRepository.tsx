import { QuerySnapshot, collection, doc, getDoc, getDocs, setDoc, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { BarberModel, ClientModel, SchedulingModel, ServiceModel, SchedulingStatus } from "@/@types/models";

const db_document = 'schedulings';
const db_document_client = 'clients'
const db_document_service = 'services';
const db_document_barber = 'barbers';

export type CreateScheduling = {
    date: string;
    client: string;
    service: string;
    barber: string;
    stars: number;
    status: SchedulingStatus;
}

export async function createScheduling(scheduling: CreateScheduling): Promise<void> {
    const clientDocRef = doc(db, db_document_client, scheduling.client);
    const serviceDocRef = doc(db, db_document_service, scheduling.service);
    const barberDocRef = doc(db, db_document_barber, scheduling.barber);
    
    try {
        await setDoc(doc(collection(db, db_document)), {
            client: clientDocRef,
            barber: barberDocRef,
            service: serviceDocRef,
            date: scheduling.date,
            status: "open",
            stars: 0
        });
    } catch (error: any) {
        throw new Error("Error create user: ", error);
    }
}

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

export async function findRecentSchedulings(_limit: number = 3): Promise<SchedulingModel[]> {
    const schedulingsColRef = collection(db, db_document);

    const schedulingsSnapshot = await getDocs(
        query(schedulingsColRef, orderBy('date', 'desc'), limit(_limit))
    );

    return (await _schedulingMap(schedulingsSnapshot));
}   


export async function findCurrentScheduling(clientId: string): Promise<SchedulingModel | null> {
    const schedulingsColRef = collection(db, db_document);
    const userDocRef = doc(db, db_document_client, clientId);

    const schedulingsSnapshot = await getDocs(
        query(
            schedulingsColRef,
            where('status', '==', 'open'),
            where('client', '==', userDocRef),
            orderBy('date', 'desc'),
            limit(1)
        )
    );

    const schedulings = await _schedulingMap(schedulingsSnapshot);

    return schedulings.length > 0 ? schedulings[0] : null;
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
            status: schedulingData.status,
            client: { ...clientData, id: clientDoc.id },
            service: { ...serviceData, id: serviceDoc.id },
            barber: { ...barberData, id: barberDoc.id },
        });
    }

    return schedulingsList;
}


