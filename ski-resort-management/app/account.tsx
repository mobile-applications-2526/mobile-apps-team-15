import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";
import H1 from "@components/text/H1";
import SubHeading from "@components/text/SubHeading";
import Paragraph from "@components/text/Paragraph";


export default function Account() {

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
                    <H1>Account</H1>
                    <SubHeading>View your account info</SubHeading>
                    <View style={{ padding: 20 }}>
                        <Paragraph style={{ marginTop: 20, textDecorationLine: 'underline', fontSize: 18 }}>Account
                            info</Paragraph>
                        <Paragraph>👤{User.name}</Paragraph>
                        <Paragraph>🏠 Road 123, 12345 City</Paragraph>
                        <Paragraph>📧 {User.email}</Paragraph>

                        <Paragraph style={{ marginTop: 20, textDecorationLine: 'underline', fontSize: 18 }}>Purchases</Paragraph>
                        {User.purchases.map((purchase) => (
                            <Paragraph
                                key={purchase.item}>⭐ {purchase.item} {purchase.status !== "Active" && `- ${purchase.status}`}</Paragraph>
                        ))}

                        <Paragraph style={{ marginTop: 20, textDecorationLine: 'underline', fontSize: 18 }}>Loans</Paragraph>

                        {User.loans.map((loan) => (
                            <Paragraph key={loan.item}>⭐ {loan.item} - {loan.status}</Paragraph>
                        ))}
                    </View>
                </Card>
            </SafeAreaView>
        </>
    );
}
