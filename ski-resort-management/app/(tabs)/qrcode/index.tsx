import { ScrollView } from "react-native";
import Header from "@components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";
import useTheme from "@components/ThemeContext";
import { QrCodeSvg } from "react-native-qr-svg";
import { getQRCodeInfo } from "@/lib/storage";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";


export default function Index() {
    const [qrInfo, setQRInfo] = useState<string | null>(null);

    useEffect(() => {
        const fetchQR = async () => {
            const storedQR = await getQRCodeInfo();
            setQRInfo(storedQR);
        }
        fetchQR();
    })

    const theme = useTheme();

    return (
        <>
            <Stack.Screen options={{ headerShown: false, title: "QR Code" }}/>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Header/>
                <ScrollView style={{ flex: 1 }}>
                    <Card style={{ alignItems: "center" }}>
                        <QrCodeSvg value={ qrInfo || "No UID found"} frameSize={200}/>
                    </Card>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
