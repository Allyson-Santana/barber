import {
    StyleSheet,
    View,
    Text,
    Button
} from "react-native";
import BasePage from "@/app.base";
import { Link } from "expo-router";

export default function Service() {
    return (
        <BasePage>
            <View style={styles.container}>
                <Text style={{marginBottom: 20}}>Service</Text>

                <Link style={{marginBottom: 10}} href={"/service/1"}>Servico number 1 (click aqui)</Link>
                <Link style={{marginBottom: 10}} href={"/service/2"}>Servico number 2 (click aqui)</Link>
                <Link style={{marginBottom: 10}} href={"/service/3"}>Servico number 3 (click aqui)</Link>
                <Link style={{marginBottom: 10}} href={"/service/4"}>Servico number 4 (click aqui)</Link>
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