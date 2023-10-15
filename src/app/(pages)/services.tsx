import {
    StyleSheet,
    View,
    Text
} from "react-native";
import BasePage from "@/app/app.base";

export default function Service() {
    return (
        <BasePage>
            <View style={styles.container}>
                <Text>Service</Text>
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