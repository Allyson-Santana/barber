import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';


export default function LoginScreen() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { onSignIn } = useAuth();

    const handleSignIn = async () => {
        const result = await onSignIn(email, password);
        if (result) return router.replace("/home/");
    }

    const handleNavigateSignUp = () => router.replace("/sign-up");

    return (
        <View style={styles.container}>
            <View style={styles.container_image}>
                <Image 
                    source={require("../assets/images/login-image.png")}
                    style={styles.image}
                />
            </View>
            {/*<Text style={{ textAlign: 'center', marginBottom: 20}}> LOGIN USER </Text>*/}
            
            <View style={styles.container_form}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite seu email"
                />
                <Text style={styles.label}>Senha:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Digite sua senha"
                />
                <Button title="Login" onPress={handleSignIn}/>
                <Text style={{ textAlign: 'center', marginTop: 20, color: "#fff" }} 
                            onPress={handleNavigateSignUp}
                >
                    Criar minha conta
                </Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: 30
    },
    container_image: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "60%",
        backgroundColor: "#1f547e"
    },
    image: {
        width: "70%",
        height: "70%",
        backgroundColor: "#1f547e",
        resizeMode: "contain"
    },
    container_form: {
        width: "100%",
        height: "40%",
        backgroundColor: "#1f547e",
        paddingHorizontal: 15,
        paddingTop: 10
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: "#fff"
    },
    input: {
        height: 40,
        backgroundColor: "#fff",
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

