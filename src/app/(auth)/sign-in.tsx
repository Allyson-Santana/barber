import {
    StyleSheet,
    View,
    Text,
    Button
} from "react-native";

export default function Service() {
    return (
        <View style={styles.container}>
            <Text >TELA DE LOGIN</Text>
        </View>
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