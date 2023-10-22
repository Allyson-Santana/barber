
import { Stack, Tabs } from "expo-router";
import {
    MaterialIcons,
    FontAwesome,
    AntDesign
} from '@expo/vector-icons';

export default function TabRoutersLayout() {
    return (
        <Stack screenOptions={{
             headerShown: false
        }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}