import {View, StyleSheet, Text} from "react-native";

export default function ScheduleButton() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Agendar</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        backgroundColor: "#fff",
        width: "60%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#000",
        borderRadius: 50
    },
    text: {
        color: "#000",
        padding: 5,
        fontSize: 20
    }
});