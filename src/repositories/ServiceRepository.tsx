import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { ServiceModel, Id } from "@/@types/models";

type ServiceWithIdModel = ServiceModel & Id

export async function findServiceById(id: string): Promise<ServiceModel | null> {
    const serviceDocRef = doc(db, 'services', id);
    const serviceDoc = await getDoc(serviceDocRef);

    if (serviceDoc.exists()) {
        const serviceData = serviceDoc.data();
        return serviceData as ServiceModel;
    }

    return null;
}


export async function findAllServices(): Promise<ServiceWithIdModel[]> {
    const servicesColRef = collection(db, 'services');
    const servicesSnapshot = await getDocs(servicesColRef);

    const servicesList: ServiceWithIdModel[] = [];

    servicesSnapshot.forEach((doc) => {
        const serviceData = doc.data();
        servicesList.push({ id: doc.id, ...serviceData } as ServiceWithIdModel);
    });

    return servicesList;
}


