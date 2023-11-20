import {View,StyleSheet,Text} from "react-native";
import { managePanProps } from "react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler";

type props = {
    name: string,
    hour: string[]
}

export default function BarberAvailableCard({name, hour}:props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text_barber}>{name}</Text>
            <View style={styles.container_hour}>
                {hour.map((available_hour, hour_key)=>
                    <View style={styles.hour_pill} key={hour_key}>
                        <Text style={styles.text_hour}>
                            {available_hour} 
                        </Text>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        paddingHorizontal: 20
    },
    container_hour: {
        paddingHorizontal: 10,
        marginBottom: 5,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    hour_pill: {
        paddingHorizontal: 5,
        marginVertical: 5,
        marginRight: 20,
        backgroundColor: "#fff",
        width: "auto",
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#000",
        borderRadius: 50
    },
    text_barber: {
        color: "#fff",
        fontSize: 20
    },
    text_hour: {
        color: "#000",
        padding: 5,
        fontSize: 18
    }
});