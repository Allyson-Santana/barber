import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { ServiceModel } from "@/@types/models";

const db_document = 'services';

export async function findServiceById(id: string): Promise<ServiceModel | null> {
    const serviceDocRef = doc(db, db_document, id);
    const serviceDoc = await getDoc(serviceDocRef);

    if (serviceDoc.exists()) {
        const serviceData = serviceDoc.data();
        return serviceData as ServiceModel;
    }

    return null;
}


export async function findAllServices(): Promise<ServiceModel[]> {
    const servicesColRef = collection(db, db_document);
    const servicesSnapshot = await getDocs(servicesColRef);

    const servicesList: ServiceModel[] = [];

    servicesSnapshot.forEach((doc) => {
        const serviceData = doc.data();
        servicesList.push({ id: doc.id, ...serviceData } as ServiceModel);
    });

    return servicesList;
}


