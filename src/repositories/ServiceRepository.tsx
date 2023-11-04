import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { ServiceModel } from "@/@types/models";

export async function findServiceById(id: string): Promise<ServiceModel | null> {
    const serviceDocRef = doc(db, 'services', id);
    const serviceDoc = await getDoc(serviceDocRef);

    if (serviceDoc.exists()) {
        const serviceData = serviceDoc.data();
        return serviceData as ServiceModel;
    }

    return null;
}


export async function findAllServices(): Promise<ServiceModel[]> {
    const servicesColRef = collection(db, 'services');
    const servicesSnapshot = await getDocs(servicesColRef);

    const servicesList: ServiceModel[] = [];

    servicesSnapshot.forEach((doc) => {
        const serviceData = doc.data();
        servicesList.push(serviceData as ServiceModel);
    });

    return servicesList;
}


