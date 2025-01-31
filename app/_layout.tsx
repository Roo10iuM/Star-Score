import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{statusBarStyle: 'light', statusBarColor: 'rgba(0, 0, 0, 0)'}}>
            <Stack.Screen name="index" options={{headerShown: false}} />
        </Stack>
    );
}