import { ScrollView, View } from "react-native";
import Header from "@components/header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";
import useTheme from "@components/ThemeContext";
import { QrCodeSvg } from "react-native-qr-svg";
import { Stack } from "expo-router";
import Paragraph from "@/components/text/Paragraph";
import { useUserStore } from "@/store/UserStore";


export default function Index() {
    const { user } = useUserStore()


    const theme = useTheme();

    return (
        <>
            <Stack.Screen options={{ headerShown: false, title: "QR Code" }}/>
            <SafeAreaView testID="screen-qrcode" style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Header/>
                <ScrollView style={{ flex: 1 }}>
                    <Card style={{ alignItems: "center" }}>
                        {user?.uid ? (
                            <View style={{ padding: theme.spacing.sm, backgroundColor: "#ffffff", borderRadius: theme.spacing.xs }}>
                                <QrCodeSvg value={user.uid} frameSize={200}/>
                            </View>
                        ) : (
                            <Paragraph>{"No UID found.\n\nPlease log in to view your QR code."}</Paragraph>
                        )}
                    </Card>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
