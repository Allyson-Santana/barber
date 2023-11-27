import { useLocalSearchParams } from "expo-router";

import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Platform,
    Alert,
} from "react-native";
import BasePage from "@/app.base";
import CustomButton from "@/components/custom-button";
import { useEffect, useState } from "react";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import ConfirmationModal from "@/components/modal-confirm";
import { BarberModel, ClientModel, ServiceModel } from "@/@types/models";
import { createScheduling, findSchedulingById } from "@/repositories/schedulingRepository";
import { findServiceById } from "@/repositories/ServiceRepository";
import { useStorageState } from "@/utils/useStorageState";
import { storageKeys } from "@/context/AuthContext";
import { findAllbarbers } from "@/repositories/BarberRepository";

const fakeUsers = [
    {
        id: '11111111-1111-1111-1111-111111111111',
        cpf: "12345678900",
        hour_pause: "12:30",
        name: "Pedro",
        phone: "5512123456739"
    },
    {
        id: '22222222-2222-2222-2222-222222222222',
        cpf: "98765432100",
        hour_pause: "14:00",
        name: "Ana",
        phone: "5512987654321"
    },
    {
        id: '33333333-3333-3333-3333-333333333333',
        cpf: "55555555555",
        hour_pause: "16:45",
        name: "Lucas",
        phone: "5512112345678"
    }
];

const hours = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00'
];


export default function scheduling() {
    const params = useLocalSearchParams();

    const [client, setClient] = useState<ClientModel>()
    const [scheduling, setScheduling] = useState<{
        service: ServiceModel | null,
        barber: BarberModel | null,
        datetime: string | null
    }>({
        service: null,
        barber: null,
        datetime: null
    });
    const [barber, setBarber] = useState<BarberModel[]>([]);
    const [barberSelected, setBarberSelected] = useState<string | null>(null);
    const [barberHourSelected, setBarberHourSelected] = useState<{ barber_id: string, hour: string }>({
        barber_id: '',
        hour: ''
    });
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    const handleConfirmation = () => setModalVisible(true);
    const handleCancel = () => setModalVisible(false);

    const handleConfirm = async () => {
        await handleSubmitScheduling();
        setModalVisible(false);
    };

    const showDatePickerModal = () => setShowDatePicker(true);

    const handleDateChange = (_event: DateTimePickerEvent, date: Date | undefined) => {
        setShowDatePicker(Platform.OS === 'ios' ? false : !showDatePicker);

        if (date) {
            setSelectedDate(date);
        }
    };

    const handleSubmitScheduling = async () => {
        const barber_id = scheduling.barber?.id
        const service_id = scheduling.service?.id
        const client_id = client?.id
        const datetime = scheduling.datetime

        if (barber_id && service_id && client_id && datetime) {
            await createScheduling({
                barber: barber_id,
                client: client_id,
                service: service_id,
                date: datetime,
                status: "open",
                stars: 0
            });
            Alert.alert(
                'Status do seu Agendamento',
                'Agendado com sucesso!'
            );
        } else {
            throw new Error("All fields are required")
        }
    };

    const onSelectbarberhour = (barber_id: string, hour: string) => {
        setBarberHourSelected({ barber_id, hour });
        const [h, m] = hour.split(":");
        const date = selectedDate
        date.setHours(Number(h), Number(m), 0, 0);
        const datetime = date.toISOString();
        const _barber = barber.find(b => b.id === barber_id) ?? null
        setScheduling((prev) => ({ ...prev, barber: _barber, datetime }));
    };

    const onFilterBarber = (idSelected: string) => {
        setBarberHourSelected({ barber_id: '', hour: '' });
        if (barberSelected === idSelected) setBarberSelected(null);
        else setBarberSelected(idSelected);
    };

    function mountPreviewBarberHours(barber: BarberModel | undefined) {
        if (barber === undefined) return <></>

        return (
            <View style={styles.barber_hour_container} key={barber.id}>
                <View>
                    <Text style={styles.barber_text}>
                        {barber.name}
                    </Text>
                </View>
                <View style={styles.hour_container}>
                    {hours.map((hour: string) => {
                        const { barber_id: barberIdSelected, hour: hourSelected } = barberHourSelected
                        const { id } = barber

                        if (hour === barber.hour_pause) return null

                        return (
                            <CustomButton
                                key={`${id}_${hour}`}
                                title={hour}
                                onPress={() => onSelectbarberhour(id, hour)}
                                style={{
                                    ...styles.hour_button,
                                    backgroundColor: (barberIdSelected === id && hourSelected === hour) ? "#1f547e" : "#fff",
                                }}
                                titleStyle={{
                                    ...styles.hour_text,
                                    color: (barberIdSelected === id && hourSelected === hour) ? "#fff" : "#1f547e",
                                }}
                            />
                        )
                    })}
                </View>
            </View>
        )
    };

    useEffect(() => {
        const service_id = params.id as string;

        findAllbarbers()
            .then(barbers => {
                setBarber(barbers)
            }).catch(error => {
                console.log(error);
            })

        findServiceById(service_id)
            .then(service => {
                setScheduling((prev) => ({ ...prev, service: service }));
            })
            .catch(error => {
                console.log(error);
            })


        useStorageState(storageKeys.USER)
            .then(async (user) => {
                if (user) {
                    const client: ClientModel = JSON.parse(user);
                    setClient(client)
                }
            })
            .catch(error => console.error("Error get current schedulings: ", error))
    }, []);

    return (
        <BasePage>
            <View style={styles.container}>
                <View style={styles.day_chose_card}>
                    <View style={styles.container_calendar}>

                        <Text style={styles.title}>Quando deseja agendar:</Text>

                        <View style={styles.calendar}>
                            <Text style={styles.date_text}>{selectedDate.toLocaleDateString()}</Text>

                            <TouchableOpacity onPress={showDatePickerModal} style={styles.button}>
                                <Text style={styles.text}>Alterar Data</Text>
                            </TouchableOpacity>
                        </View>

                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                                onChange={handleDateChange}
                                style={{ backgroundColor: '#000000' }}
                            />
                        )}
                    </View>
                </View>
                <View style={{ backgroundColor: "#6e563f" }}>
                    <View style={styles.barber_name_container}>
                        <FlatList
                            data={barber}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item }) =>
                                <CustomButton title={item.name}
                                    onPress={() => onFilterBarber(item.id)}
                                    style={{
                                        ...styles.barber_name_button,
                                        backgroundColor: barberSelected === item.id ? "#1f547e" : "#fff",
                                    }}
                                    titleStyle={{
                                        ...styles.barber_name_text,
                                        color: barberSelected === item.id ? "#fff" : "#1f547e",
                                    }}
                                />}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToAlignment="start"
                            decelerationRate={"fast"}
                        />
                    </View>
                    <View style={styles.available_card_container}>
                        <ScrollView>
                            {barberSelected === null
                                ? barber
                                    .map(barber => mountPreviewBarberHours(barber))
                                : mountPreviewBarberHours(
                                    barber.find(barber => barber.id === barberSelected)
                                )
                            }
                        </ScrollView>
                        <View style={styles.schedule_container}>
                            <CustomButton
                                title="Agendar"
                                onPress={handleConfirmation}
                                style={styles.schedule_button}
                                titleStyle={styles.schedule_text}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <ConfirmationModal
                isVisible={isModalVisible}
                scheduling={scheduling}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                onRequestClose={handleCancel}
            />
        </BasePage>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        color: "#000000"
    },
    day_chose_card: {
        width: "100%"
    },
    barber_name_container: {
        padding: 10,
        backgroundColor: "#1f547e",
        display: "flex",
        width: "100%"
    },
    barber_name_button: {
        paddingHorizontal: 30,
        marginRight: 5,
        width: 150,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#000",
        borderRadius: 50
    },
    barber_name_text: {
        color: "#000",
        padding: 5,
        fontSize: 18
    },
    available_card_container: {
        paddingHorizontal: 20,
        backgroundColor: "#1f547e",
        width: "100%",
        height: 400
    },
    barber_hour_container: {
        display: "flex",
        justifyContent: "center",
        paddingHorizontal: 15
    },
    hour_container: {
        paddingHorizontal: 10,
        marginBottom: 5,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    hour_button: {
        paddingHorizontal: 10,
        marginVertical: 5,
        marginRight: 20,
        backgroundColor: "#fff",
        width: "auto",
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#000",
        borderRadius: 50
    },
    barber_text: {
        color: "#fff",
        fontSize: 20
    },
    hour_text: {
        color: "#000",
        padding: 5,
        fontSize: 16
    },
    schedule_container: {
        padding: 10,
        paddingHorizontal: 20,
        display: "flex",
        alignItems: "center"
    },
    schedule_button: {
        paddingHorizontal: 5,
        backgroundColor: "#fff",
        width: "60%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#000",
        borderRadius: 50,
    },
    schedule_text: {
        color: "#000",
        padding: 5,
        fontSize: 20
    },
    container_calendar: {
        alignItems: 'center',
        marginTop: 20,
    },
    date_text: {
        marginTop: 15,
        fontSize: 18,
    },
    title: {
        color: "#000",
        padding: 10,
        fontSize: 18,
        fontWeight: "bold"
    },
    button: {
        paddingHorizontal: 30,
        backgroundColor: "#1f547e",
        width: "auto",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },
    calendar: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        alignContent: "center",
        marginBottom: 20,
        marginTop: 10
    },
    text: {
        color: "#ffffff",
        fontSize: 14
    }
});