import { ScrollView, Text } from "react-native"
import SkiPassCard from "@components/shop/SkiPassCard"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import Card from "@components/Card";
import useTheme from "@components/ThemeContext";


export default function SkiPass() {

    const theme = useTheme();
    const insets = useSafeAreaInsets();

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
                    headerBackButtonDisplayMode: 'minimal',
                    headerStyle: {
                        backgroundColor: theme.colors.surface,
                    },
                    headerTitleStyle: {
                        color: theme.colors.text
                    },
                    headerTintColor: theme.colors.text,
                }}
            />
            <ScrollView
                contentContainerStyle={{ backgroundColor: theme.colors.background, paddingBottom: insets.bottom + 70 }}>
                <Card>
                    <Text style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: '#000',
                    }}>
                        Ski Passes
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        color: '#333',
                    }}>
                        Get your ski pass
                    </Text>
                </Card>


                {skipasscards.map((card) => (
                    <SkiPassCard
                        key={card.title}
                        title={card.title}
                        price={card.price}
                        includedList={card.includedList}
                    />
                ))}
            </ScrollView>
        </>
    )
}
