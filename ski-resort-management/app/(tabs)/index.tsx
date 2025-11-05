import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import Header from "@components/Header";
import SlopeOverview from "@components/slopes/SlopeOverview";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";


export default function Index() {

    const favouriteSlope: Slope = {
        id: "1",
        imageUrl: require('@assets/skislope1.png'),
        name: "Slope 1",
        description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.",
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{
                flex: 1,
                backgroundColor: '#f5f5f5',
            }}>

                <Header/>

                {/* Welcome Card */}
                <Card>
                    <Text style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: '#000',
                    }}>
                        Ski-Free
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        color: '#333',
                    }}>
                        Welcome back, Mark!
                    </Text>
                </Card>

                {/* Ski Pass Card */}
                <Card>
                    <View style={{
                        backgroundColor: '#d0d0d0',
                        padding: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: '#333',
                        }}>Ski pass</Text>
                    </View>
                </Card>

                <Card>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#333',
                        marginBottom: 15,
                    }}>
                        Your favorite slope
                    </Text>

                    <Pressable onPress={() => {
                        router.push("slopes")
                    }}>
                        <SlopeOverview slope={favouriteSlope}/>
                    </Pressable>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}
