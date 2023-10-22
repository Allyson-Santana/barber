
import { Stack, Tabs } from "expo-router";
import {
    MaterialIcons,
    FontAwesome,
    AntDesign
} from '@expo/vector-icons';

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