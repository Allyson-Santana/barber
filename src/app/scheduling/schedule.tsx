import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
} from "react-native";
import BasePage from "@/app.base";
import DayChoseCard from "@/components/day-chose-card";
import BarberNameCard from "@/components/barber-name-card";
import BarberAvailableCard from "@/components/barber-available-card";
import ScheduleButton from "@/components/schedule-button";

const dataMock = {
    barber: [
        {
            id: 1,
            name: "Allyson",
            hour: [
                "09h00", "10h00", "11h00", "12h00", "14h00", 
            ],
            isSelected: true
        },
        {
            id: 2,
            name: "Vini",
            hour: [
                "11h00", "12h00", "14h00", "15h00", "16h00", 
            ],
            isSelected: true
        },
        {
            id: 3,
            name: "Victor",
            hour: [
                "15h00", "16h00", "17h00", "18h00", "19h00", 
            ],
            isSelected: true
        },
        {
            id: 4,
            name: "Samuel",
            hour: [
                "15h00", "16h00", "17h00", "18h00", "19h00", 
            ],
            isSelected: true
        }
    ]
}

export default function Service() {
    return (
        <BasePage>
            <View style={styles.container}>
                <View style={styles.day_chose_card}>
                    <DayChoseCard/>
                </View>
                <View style={{backgroundColor:"#6e563f"}}>
                    <View style={styles.barber_card}>
                        <FlatList
                            data={dataMock.barber}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({item}) => <BarberNameCard name={item.name}/>}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToAlignment="start"
                            decelerationRate={"fast"}
                        />
                    </View>
                    <View style={styles.available_card}>
                        <ScrollView>
                            { dataMock.barber
                                .filter((barber)=>{if(barber.isSelected){barber}})
                                .map((barber_data, barber_key)=> 
                                    <BarberAvailableCard 
                                        name={barber_data.name} 
                                        hour={barber_data.hour} 
                                        key={barber_key}
                                    />
                            )}
                        </ScrollView>
                    </View>
                    <View style={styles.schedule_button}>
                        <ScheduleButton/>
                    </View>
                </View>
            </View>
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
    barber_card: {
        padding: 10,
        backgroundColor: "#6e563f",
        display: "flex",
        width: "100%"
    },
    available_card: {
        paddingHorizontal: 20,
        backgroundColor: "#6e563f",
        display: "flex",
        width: "100%",
        height: 400
    },
    schedule_button: {
        padding: 10,
        paddingHorizontal: 20,
        display: "flex",
        alignItems: "center"
    },
    container_image: {
        width: "100%",
        height: "75%",
        backgroundColor: "#6e563f",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#000000"
    },
    image: {
        width: "50%",
        height: "50%",
        resizeMode:"contain"
    }
});