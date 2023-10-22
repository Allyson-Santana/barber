import {
    StyleSheet,
    View,
    Text
} from "react-native";
import Header from "@components/header";
import React, { ReactNode } from 'react';

type BasePageProps = {
    children: ReactNode;
}

export default function BasePage({ children }: BasePageProps) {
    return (
        <View style={styles.container}>
            <Header />
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: "100%",
        height: "100%"
    },
});