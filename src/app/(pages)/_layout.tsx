import { Tabs } from "expo-router";
import {
    MaterialIcons,
    FontAwesome, 
    AntDesign
} from '@expo/vector-icons';

export default function TabRoutersLayout() {
    return (
        <Tabs screenOptions={{ 
            headerShown: false,
            tabBarActiveTintColor: "#755843",
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "index",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="services"
                options={{
                    title: "services",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="calendar" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}