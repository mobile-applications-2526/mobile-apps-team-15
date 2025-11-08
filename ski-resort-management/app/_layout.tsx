import { Stack } from 'expo-router'
import { ThemeProvider } from "@components/ThemeContext";


const RootLayout = () => {
    return (
        <ThemeProvider>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false
                    }}
                />
            </Stack>
        </ThemeProvider>
    )
}

export default RootLayout
