import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
} from "react-native";
import BasePage from "@/app.base";
import DayChoseCard from "@/components/day-chose-card";
import CustomButton from "@/components/custom-button";

const dataMock = {
    barber: [
        {
            id: 1,
            name: "Allyson",
            hour: [
                "09h00", "10h00", "11h00", "12h00", "14h00", 
            ],
            isVisible: true
        },
        {
            id: 2,
            name: "Vini",
            hour: [
                "11h00", "12h00", "14h00", "15h00", "16h00", 
            ],
            isVisible: true
        },
        {
            id: 3,
            name: "Victor",
            hour: [
                "15h00", "16h00", "17h00", "18h00", "19h00", 
            ],
            isVisible: true
        },
        {
            id: 4,
            name: "Samuel",
            hour: [
                "15h00", "16h00", "17h00", "18h00", "19h00", 
            ],
            isVisible: true
        }
    ]
}

const select = (idSelected: number) => {
    dataMock.barber.forEach((obj)=>{
        if(obj.id == idSelected) {
            obj.isVisible = true;
        } else {
            obj.isVisible = false;
        }
    })
}

export default function Service() {
    return (
        <BasePage>
            <View style={styles.container}>
                <View style={styles.day_chose_card}>
                    <DayChoseCard/>
                </View>
                <View style={{backgroundColor:"#6e563f"}}>
                    <View style={styles.barber_name_container}>
                        <FlatList
                            data={dataMock.barber}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({item}) => 
                                <CustomButton title={item.name}
                                                onPress={() => select(item.id)}
                                                style={styles.barber_name_button}
                                                titleStyle={styles.barber_name_text}
                                />}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToAlignment="start"
                            decelerationRate={"fast"}
                        />
                    </View>
                    <View style={styles.available_card_container}>
                        <ScrollView>
                            { dataMock.barber
                                .filter((barber) => barber.isVisible == true)
                                .map((barber_data, barber_key)=> 
                                    <View style={styles.barber_hour_container} key={barber_key}>
                                        <View>
                                            <Text style={styles.barber_text}>
                                                {barber_data.name}
                                            </Text>
                                        </View>
                                        <View style={styles.hour_container}>
                                            {barber_data.hour.map((hour, hour_key)=>
                                                <CustomButton
                                                    key={hour_key}
                                                    title={hour}
                                                    onPress={null}
                                                    style={styles.hour_button}
                                                    titleStyle={styles.hour_text}
                                                />
                                            )}
                                        </View>
                                    </View>
                            )}
                        </ScrollView>
                    </View>
                    <View style={styles.schedule_container}>
                        <CustomButton
                            title="Agendar"
                            onPress={null}
                            style={styles.schedule_button}
                            titleStyle={styles.schedule_text}
                        />
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
    barber_name_container: {
        padding: 10,
        backgroundColor: "#6e563f",
        display: "flex",
        width: "100%"
    },
    barber_name_button: {
        paddingHorizontal: 30,
        marginRight: 5,
        backgroundColor: "#fff",
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
        backgroundColor: "#6e563f",
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
        borderRadius: 50
    },
    schedule_text: {
        color: "#000",
        padding: 5,
        fontSize: 20
    }
});