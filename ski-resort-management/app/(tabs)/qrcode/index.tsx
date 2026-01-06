import { ScrollView } from "react-native";
import Header from "@components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";
import useTheme from "@components/ThemeContext";
import { QrCodeSvg } from "react-native-qr-svg";
import { useCallback, useState } from "react";
import { Stack, useFocusEffect } from "expo-router";
import Paragraph from "@/components/text/Paragraph";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Index() {
    const [uid, setUid] = useState<string | null>(null);

    const fetchQR = useCallback(async () => {
        try {
            const userString = await AsyncStorage.getItem("user");
            if (userString) {
                const user = JSON.parse(userString);
                setUid(user.uid);
            } else {
                setUid(null);
            }
        } catch (error) {
            console.error("Failed to fetch user from AsyncStorage:", error);
            setUid(null);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchQR();
        }, [fetchQR])
    );

    const theme = useTheme();

    return (
        <>
            <Stack.Screen options={{ headerShown: false, title: "QR Code" }}/>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Header/>
                <ScrollView style={{ flex: 1 }}>
                    <Card style={{ alignItems: "center" }}>
                        {uid ? (
                            <QrCodeSvg value={uid} frameSize={200}/>
                        ) : (
                            <Paragraph>{"No UID found.\n\nPlease log in to view your QR code."}</Paragraph>
                        )}
                    </Card>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
