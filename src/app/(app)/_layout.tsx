
import { Tabs, Redirect } from "expo-router";
import {
    MaterialIcons,
    FontAwesome,
    AntDesign
} from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";

export default function AppLayout() {
    const { authState } = useAuth();
    
    if (!authState?.authenticated) {
        return <Redirect href="/sign-in" />;
    }

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#755843",
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="service"
                options={{
                    tabBarLabel: "Service",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="calendar" size={size} color={color} />
                    )
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}
