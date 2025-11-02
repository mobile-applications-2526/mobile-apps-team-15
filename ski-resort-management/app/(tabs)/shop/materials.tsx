import { ScrollView, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import MaterialCard from "@components/MaterialCard";
import Card from "@components/Card";


export default function SkiPass() {

    const materials = [
        { title: "Boots", pricePerHour: 5, pricePerDay: 25, size: "38" },
        { title: "Jacket", pricePerHour: 6, pricePerDay: 30, size: "M" },
        { title: "Pants", pricePerHour: 5, pricePerDay: 25, size: "M" },
        { title: "Skis", pricePerHour: 8, pricePerDay: 40, size: "38" },
    ]

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Materials',
                    headerShown: true,
                }}
            />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <Card>
                        <Text style={{
                            fontSize: 32,
                            fontWeight: 'bold',
                            color: '#000',
                        }}>Ski Passes</Text>
                        <Text style={{
                            fontSize: 18,
                            color: '#333',
                        }}>Get your skipass</Text>
                    </Card>


                    {materials.map((card) => (
                        <MaterialCard
                            key={card.title}
                            title={card.title}
                            pricePerHour={card.pricePerHour}
                            pricePerDay={card.pricePerDay}
                            size={card.size}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </>
    )
}
