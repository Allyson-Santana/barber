import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const { onRegister } = useAuth();

    const handleSignUp = async () => {
        const result = await onRegister(email, password, name, phone);
        if (result) return router.replace("/home/");
    } 

    const handleNavigateSignIn = () => router.replace("/sign-in");

    return (
        <View style={styles.container}>
            <View style={styles.container_image}>
                <Image 
                    source={require("../assets/images/login-image.png")}
                    style={styles.image}
                />
            </View>
            {/*<Text style={{ textAlign: 'center', marginBottom: 20 }}> CREATE USER </Text>*/}
            <View style={styles.container_form}>
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Digite seu nome"
                />
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite seu Email"
                />
                <Text style={styles.label}>Telefone:</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Digite seu telefone"
                />
                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Digite sua senha"
                />
                <Button title="Criar" onPress={handleSignUp} />

                <Text style={{ textAlign: 'center', marginTop: 20, color:"#fff"}} 
                            onPress={handleNavigateSignIn}>
                    Fazer Login
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 30
    },
    container_image: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "40%",
        backgroundColor: "#1f547e"
    },
    image: {
        width: "70%",
        height: "70%",
        backgroundColor: "#1f547e",
        resizeMode: "contain"
    },
    container_form :{
        padding: 16,
        width: "100%",
        height: "60%",
        backgroundColor: "#1f547e"
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: "#fff"
    },
    input: {
        height: 40,
        backgroundColor: "#fff",
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

