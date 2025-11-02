import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
                          }}>Account</Text>
                  <Text style={{
                    fontSize: 18,
                    color: '#333',
                  }}>View your account info</Text>
                  <View style={{ padding: 20 }}>
                      <Text style={{ marginTop: 20, textDecorationLine: 'underline',  fontSize: 18 }}>Account info</Text>
                      <Text>👤{User.name}</Text>
                      <Text>🏠 Road 123, 12345 City</Text>
                      <Text>📧 {User.email}</Text>

                      <Text style={{ marginTop: 20, textDecorationLine: 'underline',  fontSize: 18 }}>Purchases</Text>
                      {User.purchases.map((purchase) => (
                          <Text key={purchase.item}>⭐ {purchase.item} {purchase.status !== "Active" && `- ${purchase.status}`}</Text>
                      ))}

                      <Text style={{ marginTop: 20, textDecorationLine: 'underline',  fontSize: 18 }}>Loans</Text>

                      {User.loans.map((loan) => (
                          <Text key={loan.item}>⭐ {loan.item} - {loan.status}</Text>
                      ))}
                  </View>
                </View>
            </SafeAreaView>
        </>
    );
}
