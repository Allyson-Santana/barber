
import { Tabs, Redirect } from "expo-router";
import {
    MaterialIcons,
    FontAwesome,
    AntDesign
} from '@expo/vector-icons';
import { Text } from 'react-native';

import { auth } from "@/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const TabRoutersLayout = () => (
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
                // href: "/service",
                // title: "Service",
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

export default function AppLayout() {

    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         // User is signed in, see docs for a list of available properties
    //         // https://firebase.google.com/docs/reference/js/auth.user
    //         const uid = user.uid;
    //         // ...
    //     } else {
    //         // User is signed out
    //         // ...
    //     }
    // });
    
    // const { session, isLoading } = auth();

    // // You can keep the splash screen open, or render a loading screen like we do here.
    // if (isLoading) {
    //     return <Text>Loading...</Text>;
    // }

    // // Only require authentication within the (app) group's layout as users
    // // need to be able to access the (auth) group and sign in again.
    // if (!session) {
    //     // On web, static rendering will stop here as the user is not authenticated
    //     // in the headless Node process that the pages are rendered in.
    //     return <Redirect href="/sign-in" />;
    // }

    // // This layout can be deferred because it's not the root layout.
    return <TabRoutersLayout />;
}
