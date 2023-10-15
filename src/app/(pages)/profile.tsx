import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BasePage from "@/app/app.base";
import { photo_profile_default } from "@/assets";

type errors = {
    status: boolean,
    errors: {
        name: string[]
        email: string[]
        phone: string[]
    }
}
type propsPreviewErrors = Omit<errors, 'status'>;

export default function Profile() {
    const [photo, setPhoto] = useState<string>();
    const [name, setName] = useState<string>('John Doe');
    const [email, setEmail] = useState<string>('john@example.com');
    const [phone, setPhone] = useState<string>('123-456-7890');
    const [errors, setErros] = useState<errors>({
        status: true,
        errors: { name: [], email: [], phone: [] }
    })

    useEffect(() => {}, [])

    const _valitedEmail = (_email: string): boolean => {
        // TODO: Validate E-mail
        return _email.length > 0
    }

    const _validatePhone = (_phone: string): boolean => {
        // TODO: Validate Phone
        const tel = _phone.replace(/\D/g, '');
        return tel.length === 11
    }

    const _validateDataSave = (): boolean => {
        let _errors: errors = {
            status: true,
            errors: { name: [], email: [], phone: [] }
        }

        if (name.length > 30) {
            _errors.status = false
            _errors.errors.name.push("Nome excedeu o limite de 30 caracteres.");
        }

        if (name.length < 3) {
            _errors.status = false
            _errors.errors.name.push("Nome deve conte pelo menos 3 caracteres.");
        }

        let isValidEmail = _valitedEmail(email);
        if (!isValidEmail) {
            _errors.status = false
            _errors.errors.email.push("E-mail informado é inválido.");
        }

        let isValidPhone = _validatePhone(phone);
        if (!isValidPhone) {
            _errors.status = false
            _errors.errors.phone.push("Número de celular inválido.");
        }

        setErros({ ..._errors });

        return _errors.status
    }

    const handleChangeImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (result.canceled) return;

        setPhoto(result.assets[0].uri);

        // TODO: Save Image in Database
    };

    const handleSave = () => {
        const isValid = _validateDataSave();
        console.log(errors)
        if (!isValid) return;
        // TODO: Save Image in Database
    }

    return (
        <BasePage>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleChangeImage}>
                    <Image
                        source={photo ? { uri: photo } : photo_profile_default}
                        style={styles.photo}
                    />
                    <Text style={styles.text_photo}>Foto de perfil</Text>
                </TouchableOpacity>

                <View style={styles.area_input}>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Nome"
                        style={styles.input}
                    />
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Nome"
                        style={styles.input}
                    />
                    <TextInput
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Nome"
                        style={styles.input}
                    />
                </View>

                {!errors.status && <ErrorComponent errors={errors.errors} />}

                <TouchableOpacity onPress={handleSave} style={styles.btn}>
                    <Text style={styles.text_btn}>Salvar</Text>
                </TouchableOpacity>

            </View>
        </BasePage>
    )
}

const ErrorComponent: React.FC<propsPreviewErrors> = ({ errors }) => {
    return (
        <View style={styles.alert}>
            {errors.name.length > 0 && (
                <View>
                    {errors.name.map((error, index) => (
                        <Text key={index} style={styles.text}>{error}</Text>
                    ))}
                </View>
            )}

            {errors.email.length > 0 && (
                <View>
                    {errors.email.map((error, index) => (
                        <Text key={index} style={styles.text}>{error}</Text>
                    ))}
                </View>
            )}

            {errors.phone.length > 0 && (
                <View>
                    {errors.phone.map((error, index) => (
                        <Text key={index} style={styles.text}>{error}</Text>
                    ))}
                </View>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        color: "#000000"
    },
    area_input: {
        width: '80%',
        marginTop: 20
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
        marginTop: 10,
        padding: 5,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    photo: {
        width: 150,
        height: 150,
        borderRadius: 75
    },
    text_photo: {
        textAlign: "center",
        padding: 3
    },
    btn: {
        marginTop: 20,
        backgroundColor: '#000000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    text_btn: {
        color: 'white',
        fontSize: 16
    },

    alert: {
        backgroundColor: '#FFBABA',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: "80%",
        marginTop: 15
    },
    text: {
        color: 'white',
        textAlign: 'center',
    }
});