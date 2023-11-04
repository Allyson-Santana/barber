import {
    StyleSheet,
    View,
    Text,
    Button
} from "react-native";
import BasePage from "@/app.base";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { findAllServices } from "@/repositories/ServiceRepository";
import { Id, ServiceModel } from "@/@types/models";

export default function Service() {

    const [services, setServices] = useState<(ServiceModel & Id)[]>();

    useEffect(() => {
        const unsubscribe = () => {
            findAllServices()
                .then(allServices => {
                    setServices(allServices);
                })
                .catch((error: any) => {
                    console.error("Error get all service: ", error);
                })
        }

        return unsubscribe();
    }, [])

    return (
        <BasePage>
            <View style={styles.container}>
                <Text style={{ marginBottom: 20 }}>Serviços</Text>

                {services && services.map(service => (
                    <Link
                        key={service.id}
                        style={{ marginBottom: 30 }}
                        href={`/service/${service.id}`}
                    >
                        Nome: {service.name} | Duração: {service.duration_in_minute} Minutos
                    </Link>
                ))}

            </View>
        </BasePage>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        color: "#000000"
    },
});