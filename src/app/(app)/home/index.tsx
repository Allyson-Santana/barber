import React, { useEffect, useState } from 'react';
import { StyleSheet, View} from "react-native";
import BasePage from "@/app.base";
import RecentSchedulingCard from "@components/recent-scheduling-card";
import CurrentSchedulingCard from "@components/current-scheduling-card";
import { findCurrentScheduling, findRecentSchedulings } from '@/repositories/schedulingRepository';
import { ClientModel, SchedulingModel } from '@/@types/models';
import { useStorageState } from '@/utils/useStorageState';
import { storageKeys } from '@/context/AuthContext';
import { useIsFocused } from '@react-navigation/native';


const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
]

export default function Home() {
    const [schedulings, setSchedulings] = useState<SchedulingModel[]>();
    const [currentscheduling, setCurrentScheduling] = useState<SchedulingModel | null>(null);
    const isFocused = useIsFocused();
    const [pollingIntervalId, setPollingIntervalId] = useState<any>(null);

    const onInit = () => {
        findRecentSchedulings(3)
            .then(response => setSchedulings(response))
            .catch(error => console.error("Error get all schedulings: ", error))

        useStorageState(storageKeys.USER)
            .then(async (user) => {
                if (user) {
                    const { id }: ClientModel = JSON.parse(user);
                    const scheduling = await findCurrentScheduling(id);
                    if (scheduling) {
                        const date = new Date(scheduling.date);

                        const month = date.getMonth();
                        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
                        const hours = date.getHours();
                        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
                        const dateFormated = `${day} de ${months[month]} ás ${hours}:${minutes}`

                        setCurrentScheduling({
                            ...scheduling,
                            date: dateFormated
                        })
                    }
                }
            })
            .catch(error => console.error("Error get current schedulings: ", error))
    }
    
    useEffect(() => {
        if (isFocused) {
            onInit();
            const intervalId = setInterval(() => {
                onInit();
            }, 10_000);
            setPollingIntervalId(intervalId);
        } else {
            if (pollingIntervalId) {
                clearInterval(pollingIntervalId);
                setPollingIntervalId(null);
            }
        }

        return () => {
            if (pollingIntervalId) {
                clearInterval(pollingIntervalId);
                setPollingIntervalId(null);
            }
        };
    }, [isFocused]);

    return (
        <BasePage>
            <View style={styles.container}>
                <View style={styles.recent_scheduling}>
                    {schedulings?.length && schedulings.map((scheduling, index) =>
                        <RecentSchedulingCard key={`recent-card-${scheduling.id.toString()}-${index}`}
                            id={scheduling.id}
                            barber={scheduling.barber}
                            service={scheduling.service}
                            stars={scheduling.stars}
                        />
                    )}
                </View>
                {currentscheduling &&
                    <View style={styles.current_scheduling}>
                        <CurrentSchedulingCard
                            key={currentscheduling.id}
                            id={currentscheduling.id}
                            date={currentscheduling.date}
                            barber={currentscheduling.barber}
                            service={currentscheduling.service}
                        />
                    </View>
                }
            </View>
        </BasePage>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between',
        color: "#000000",
        flexDirection: "column"
    },
    recent_scheduling: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    current_scheduling: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "90%",
        marginBottom: 20,
    }
});
