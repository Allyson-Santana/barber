import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text
} from "react-native";
import BasePage from "@/app.base";
import RecentSchedulingCard from "@components/recent-scheduling-card";
import CurrentSchedulingCard from "@components/current-scheduling-card";

const dataMock = {
    recente_scheduling_card: [
        {
            id: 1,
            service_name: "Corte Social",
            stars: 2,
            responsible: "Allyson"
        },
        {
            id: 2,
            service_name: "Combo Social",
            stars: 3,
            responsible: "Vinicius"
        },
        {
            id: 3,
            service_name: "Barba",
            stars: 4,
            responsible: "Victor"
        },
    ],
    current_scheduling_card: {
        id: 3,
        service_name: "Barba",
        date: new Date(),
        responsible: "Victor"
    },
}

export default function Home() {

    // useEffect(() => { }, [])

    return (
        <BasePage>
            <View style={styles.container}>
                <View style={styles.recent_scheduling}>
                    {dataMock.recente_scheduling_card.map((dataCard, index) =>
                        <RecentSchedulingCard key={`recent-card-${dataCard.id.toString()}-${index}`}
                            id={dataCard.id}
                            responsible={dataCard.responsible}
                            service_name={dataCard.service_name}
                            stars={dataCard.stars}
                        />
                    )}
                </View>

                <View style={styles.current_scheduling}>
                    <CurrentSchedulingCard
                        id={dataMock.current_scheduling_card.id}
                        date={dataMock.current_scheduling_card.date}
                        responsible={dataMock.current_scheduling_card.responsible}
                        service_name={dataMock.current_scheduling_card.service_name}
                    />
                </View>
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
