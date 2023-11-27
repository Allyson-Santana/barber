import {StyleSheet, View, Text} from "react-native";

export default function DayChoseCard() {
    return (
        <View>
            <View>
                <Text style={styles.title}>Quando deseja agendar:</Text>
            </View>
            <View style={styles.container_button}>
                <View style={styles.button}>
                    <Text style={styles.text}>Amanhã</Text>
                </View>
                <View style={styles.button}>
                    <Text style={styles.text}>Escolher o dia</Text>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container_title: {
        display: "flex",
        justifyContent: "flex-start"
    },
    container_button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    title: {
        color: "#000",
        padding: 10,
        fontSize: 18,
        fontWeight: "bold"
    },
    button: {
        paddingHorizontal: 30,
        backgroundColor: "#6e563f",
        width: "auto",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },
    text: {
        color: "#fff",
        fontSize: 14
    }
});