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
import BasePage from "@/app.base";
import { photo_profile_default } from "@/assets";
import { auth } from '@/config/firebaseConfig';
import { ClientModel } from '@/@types/models';
import { findUserById, updateUser } from '@/repositories/UserRepository';
import { useAuth } from "@/context/AuthContext";


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
    const { onSignOut } = useAuth();

    const [profileData, setProfileData] = useState<ClientModel>({
        id: '',
        name: '',
        email: '',
        phone: '',
        photoURL: '',
    })

    const handleChangeProfileData = (name: string, value: string) => {
        if (name === 'phone') {
            // TODO: Format number to preview
        }
        setProfileData(prevState => ({ ...prevState, [name]: value }))
    }

    const [errors, setErros] = useState<errors>({
        status: true,
        errors: { name: [], email: [], phone: [] }
    })

    useEffect(() => {
        const unsubscribe = () => auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userData = await findUserById(user.uid);
                if (userData) {
                    setProfileData(userData);
                }
            }
        });

        return unsubscribe();
    }, []);


    const _valitedEmail = (_email: string | null): boolean => {
        if (!_email) return false
        // TODO: Validate E-mail
        return _email.length > 0
    }

    const _validatePhone = (_phone: string | null): boolean => {
        if (!_phone) return false
        // TODO: Validate Phone
        const tel = _phone.replace(/\D/g, '');
        return tel.length === 11
    }

    const _validateDataSave = (): boolean => {
        let _errors: errors = {
            status: true,
            errors: { name: [], email: [], phone: [] }
        }

        if (!profileData.name) {
            _errors.status = false
            _errors.errors.name.push("Nome é obrigatório.");
        } else {
            if (profileData.name.length > 30) {
                _errors.status = false
                _errors.errors.name.push("Nome excedeu o limite de 30 caracteres.");
            }

            if (profileData.name.length < 3) {
                _errors.status = false
                _errors.errors.name.push("Nome deve conte pelo menos 3 caracteres.");
            }
        }

        let isValidEmail = _valitedEmail(profileData.email);
        if (!isValidEmail) {
            _errors.status = false
            _errors.errors.email.push("E-mail informado é inválido.");
        }

        let isValidPhone = _validatePhone(profileData.phone);
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

        const photoURL = result.assets[0].uri

        if (profileData.id){
            await updateUser(profileData.id, { photoURL: photoURL })
            setProfileData((prevState) => ({ ...prevState, photoURL: photoURL }));
        }

    };

    const handleSave = async () => {
        const isValid = _validateDataSave();
        if (!isValid) return;
        const { id, ...profileUpdate } = profileData

        if (id) {
            await updateUser(id, profileUpdate);
        }
    }

    const handleSignOut = () => onSignOut();

    return (
        <BasePage>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleChangeImage}>
                    <Image
                        source={profileData.photoURL ? { uri: profileData.photoURL } : photo_profile_default}
                        style={styles.photo}
                    />
                    <Text style={styles.text_photo}>Foto de perfil</Text>
                </TouchableOpacity>

                <View style={styles.area_input}>
                    <TextInput
                        value={profileData.name}
                        onChangeText={text => handleChangeProfileData('name', text)}
                        placeholder="Nome"
                        style={styles.input}
                    />
                    <TextInput
                        value={profileData.email}
                        onChangeText={text => handleChangeProfileData('email', text)}
                        placeholder="E-mail"
                        style={styles.input}
                    />
                    <TextInput
                        value={profileData.phone}
                        onChangeText={text => handleChangeProfileData('phone', text)}
                        placeholder="Telefone"
                        style={styles.input}
                    />
                </View>

                {!errors.status && <ErrorComponent errors={errors.errors} />}

                <TouchableOpacity onPress={handleSave} style={styles.btn}>
                    <Text style={styles.text_btn}>Salvar</Text>
                </TouchableOpacity>

                <Text style={styles.signout} onPress={handleSignOut}>
                    Sair
                </Text>

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
    },
    signout: { 
        textAlign: 'center', 
        marginTop: 50,
        fontWeight: "800",
        fontSize: 15
    }
});