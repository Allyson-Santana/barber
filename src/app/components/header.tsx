import React from 'react';
import {
    Image,
    StyleSheet,
    View
} from "react-native";
import {
    logo_image,
    logo_name
} from "@/assets"

const LogoContainer = () => (
    <View style={styles.logo_container}>
        <Image source={logo_image} style={{ resizeMode: "contain", height: 70, }} />
        <Image source={logo_name} style={{ resizeMode: "contain", height: 50, }} />
    </View>
)

export default function Header() {
    return (
        <View style={styles.container}>
            <LogoContainer />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: "#f2f5f3",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#d4d4d4",
        marginBottom: 15
    },
    logo_container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 10
    },
});
