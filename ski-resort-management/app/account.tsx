import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";
import useTheme from "@components/ThemeContext";


export default function Account() {

    const theme = useTheme();

    const User = {
        name: "Mark Johnson",
        email: "mark.johnson@example.com",
        purchases: [
            { item: "Gold Ski Pass", status: "Active" },
            { item: "Silver Ski Pass", status: "Expired" },
        ],
        loans: [
            { item: "Ski Boots", status: "Returned" },
            { item: "Helmet", status: "Overdue" },
            { item: "Goggles", status: "Returned" },
        ]
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Account',
                    headerShown: true,
                    headerBackButtonDisplayMode: 'minimal',
                }}
            />
            <SafeAreaView style={{ flex: 1 }}>
                <Card>
                    <Text style={theme.text.H1}>Account</Text>
                    <Text style={theme.text.subheading}>View your account info</Text>
                    <View style={{ padding: 20 }}>
                        <Text style={{ marginTop: 20, textDecorationLine: 'underline', fontSize: 18 }}>Account
                            info</Text>
                        <Text>👤{User.name}</Text>
                        <Text>🏠 Road 123, 12345 City</Text>
                        <Text>📧 {User.email}</Text>

                        <Text style={{ marginTop: 20, textDecorationLine: 'underline', fontSize: 18 }}>Purchases</Text>
                        {User.purchases.map((purchase) => (
                            <Text
                                key={purchase.item}>⭐ {purchase.item} {purchase.status !== "Active" && `- ${purchase.status}`}</Text>
                        ))}

                        <Text style={{ marginTop: 20, textDecorationLine: 'underline', fontSize: 18 }}>Loans</Text>

                        {User.loans.map((loan) => (
                            <Text key={loan.item}>⭐ {loan.item} - {loan.status}</Text>
                        ))}
                    </View>
                </Card>
            </SafeAreaView>
        </>
    );
}
