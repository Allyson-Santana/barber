import {
    StyleSheet,
    View,
    Text
} from "react-native";
import BasePage from "@/app.base";
import { useLocalSearchParams } from "expo-router";

export default function Service() {
    const { id } = useLocalSearchParams()

    return (
        <BasePage>
            <View style={styles.container}>
                <Text>Service With id {id}</Text>
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