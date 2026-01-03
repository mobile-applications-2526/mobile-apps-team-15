import { Stack } from 'expo-router'
import "@/services/FirebaseConfig";
import { ThemeProvider } from "@components/ThemeContext";
import { AuthProvider } from "@components/AuthContext";


const RootLayout = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            title: 'SkiFree',
                        }}/>
                </Stack>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default RootLayout
