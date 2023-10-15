import { StyleSheet, View, Text } from "react-native";

type props = {
    id: number,
    date: Date,
    service_name: string,
    responsible: string,
}

export default function CurrentSchedulingCard({ responsible, service_name, date }: props) {
    // TODO: If string length contains more thatn 15 chars, should minimize here!

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meu agendamento</Text>
            <Text style={styles.text}>{service_name} - {responsible}</Text>
            <Text style={styles.text}>{date.toISOString()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#6e563f",
        width: "88%",
        height: 110,
        borderRadius: 5,
        marginBottom: 15,
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
        color: "#fff",
        padding: 5,
        fontSize: 18
    },
    text: {
        color: "#fff",
        padding: 5,
        fontSize: 18
    }
});