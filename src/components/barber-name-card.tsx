import {StyleSheet, View, Text} from "react-native";

type props = {
    name:string
}

export default function BarberNameCard({name}: props) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
    container: {
        paddingHorizontal: 30,
        marginRight: 5,
        backgroundColor: "#fff",
        width: 150,
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
        fontSize: 18
    }
});