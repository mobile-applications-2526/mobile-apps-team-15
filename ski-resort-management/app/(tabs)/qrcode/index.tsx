import { Text, View, ScrollView } from "react-native";
import Header from "@components/header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ScrollView style={{ flex: 1,  backgroundColor: '#f5f5f5' }}>
                <View style={{
                    backgroundColor: '#fff',
                    margin: 20,
                    padding: 20,
                    borderRadius: 12,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                }}>
                    <Text style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: '#000',
                    }}>QR Code</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
