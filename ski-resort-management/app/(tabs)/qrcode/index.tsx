import { ScrollView } from "react-native";
import Header from "@components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";
import useTheme from "@components/ThemeContext";
import H1 from "@components/text/H1";


export default function Index() {

    const theme = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Header/>
            <ScrollView style={{ flex: 1 }}>
                <Card>
                    <H1>QR Code</H1>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}
