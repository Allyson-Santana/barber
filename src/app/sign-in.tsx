import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
            <Text style={{ textAlign: 'center', marginBottom: 20}}> LOGIN USER </Text>
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
            <Button title="Login" onPress={handleSignIn} />

            <Text style={{ textAlign: 'center', marginTop: 20 }} onPress={handleNavigateSignUp}>
                Criar minha conta
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

