import { Platform, ScrollView } from "react-native"
import SkiPassOverview from "@components/shop/SkiPassOverview"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import Card from "@components/Card";
import useTheme from "@components/ThemeContext";
import H1 from "@components/text/H1";
import SubHeading from "@components/text/SubHeading";


export default function SkiPass() {

    const theme = useTheme();
    const safeAreaInsets = useSafeAreaInsets();

    const skipasscards = [
        { title: "Gold", price: 50, includedList: ["Allowed in domain 1 to 3", "Free drinks at the ski resort bars"] },
        {
            title: "Basic",
            price: 25,
            includedList: ["Access to beginner slopes", "Equipment rental discount", "Basic parking"]
        },
        {
            title: "Premium",
            price: 75,
            includedList: ["Access to all slopes", "Free equipment rental", "VIP lounge access", "Free ski lessons"]
        },
        {
            title: "Family",
            price: 120,
            includedList: ["Access for up to 4 people", "Kids ski school included", "Family restaurant discounts"]
        }
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

            <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={Platform.OS === "android" ? { paddingBottom: safeAreaInsets.bottom + 80 } : null } >
                <Card>
                    <H1>Ski Passes</H1>
                    <SubHeading>Get your ski pass</SubHeading>
                </Card>


                {skipasscards.map((card) => (
                    <Card key={card.title}>
                        <SkiPassOverview
                        title={card.title}
                        price={card.price}
                        includedList={card.includedList}
                    />
                    </Card>
                ))}
            </ScrollView>
        </>
    )
}
