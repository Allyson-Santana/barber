
import { Stack } from "expo-router";

export default function TabRoutersLayout() {
    return (
        <Stack screenOptions={{
             headerShown: false
        }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}