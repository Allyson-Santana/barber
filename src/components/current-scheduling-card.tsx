import { BarberModel, ServiceModel } from "@/@types/models";
import { StyleSheet, View, Text } from "react-native";

type props = {
    id: string;
    barber: BarberModel;
    service: ServiceModel;
    date: any
}

export default function CurrentSchedulingCard({ id, barber, service, date }: props) {
    // TODO: If string length contains more thatn 15 chars, should minimize here!

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meu agendamento</Text>
            <Text style={styles.text}>{service.name} - {barber.name}</Text>
            <Text style={styles.text}>{String(date)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#d3d3d3",
        width: "88%",
        height: 110,
        borderRadius: 5,
        marginBottom: 20,
        borderColor: "#000000",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2.62,
        elevation: 4,
    },
    title: {
        textAlign: "center",
        fontWeight: "800",
        color: "#000000",
        padding: 5,
        fontSize: 18
    },
    text: {
        color: "#000000",
        padding: 5,
        fontSize: 18
    }
});