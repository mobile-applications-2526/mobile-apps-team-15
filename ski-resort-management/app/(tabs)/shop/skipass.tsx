import { View, Text, ScrollView } from "react-native"
import SkiPassCard from "@components/SkiPassCard"
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function SkiPass() {

    const skipasscards = [
        {title: "Gold", price: 50, includedList: ["Allowed in domain 1 to 3", "Free drinks at the ski resort bars"]},
        {title: "Basic", price: 25, includedList: ["Access to beginner slopes", "Equipment rental discount", "Basic parking"]},
        {title: "Premium", price: 75, includedList: ["Access to all slopes", "Free equipment rental", "VIP lounge access", "Free ski lessons"]},
        {title: "Family", price: 120, includedList: ["Access for up to 4 people", "Kids ski school included", "Family restaurant discounts"]}
    ]

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Ski Passes',
                    headerShown: true,
                }}
            />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
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
                                    }}>Ski Passes</Text>
                            <Text style={{
                            fontSize: 18,
                            color: '#333',
                            }}>Get your skipass</Text>
                    </View>


                    {skipasscards.map((card) => (
                        <SkiPassCard
                            key={card.title}
                            title={card.title}
                            price={card.price}
                            includedList={card.includedList}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </>
    )
}
