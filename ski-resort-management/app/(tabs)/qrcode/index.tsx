import { ScrollView, Text } from "react-native";
import Header from "@components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";


export default function Index() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header/>
            <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <Card>
                    <Text style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: '#000',
                    }}>QR Code</Text>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}
