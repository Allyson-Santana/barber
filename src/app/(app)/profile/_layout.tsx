
import { Stack } from "expo-router";

export default function TabRoutersLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    )
}