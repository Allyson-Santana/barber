import { StyleSheet, View, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { textTruncation } from "../utils/formatText";
import { BarberModel, ServiceModel } from "@/@types/models";

type props = {
    id: string;
    barber: BarberModel;
    service: ServiceModel;     
    stars: number;
}

export default function RecentSchedulingCard({ id, barber, service, stars }: props) {
    const data = {
        id,
        service_name: textTruncation(service.name, 48),
        barber_name: textTruncation(barber.name, 22),
        stars: Array.from({ length: stars }, (_, index) => index)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.service_name}</Text>
            <View style={styles.overview}>
                <Text style={styles.responsible}>{data.barber_name}</Text>
                <View style={styles.starts}>
                    {data.stars.map((index) =>
                        <FontAwesome key={`stars-${data.id.toString()}-${index}`}
                            name="star" size={24}
                            color="#ffd700" 
                        />
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#1f547e",
        width: "85%",
        height: 90,
        borderRadius: 5,
        marginBottom: 15,
        shadowColor: "#000",
        borderWidth: 1,
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.5,
        elevation: 4,
    },
    responsible: {
        color: "#fff",
        padding: 5,
        fontSize: 18
    },
    title: {
        textAlign: "center",
        fontWeight: "800",
        color: "#fff",
        padding: 5,
        fontSize: 18
    },
    starts: {
        display: "flex",
        flexDirection: "row"
    },
    overview: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});