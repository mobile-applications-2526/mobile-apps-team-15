import React from "react";
import { ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import useTheme from "@components/ThemeContext";
import StyledButton from "@components/StyledButton";
import Card from "@components/Card";
import H2 from "@components/text/H2";
import H1 from "@components/text/H1";


export default function PaymentComplete() {

    const theme = useTheme();
    const router = useRouter();

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Payment Complete',
                    headerLargeTitle: false,
                    headerShown: false,
                    headerStyle: { backgroundColor: theme.colors.surface },
                    headerTitleStyle: { color: theme.colors.text },
                    headerTintColor: theme.colors.text,
                }}
            />

            <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ marginVertical: "auto" }}>
                <Card>
                    <View style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}>
                        <View
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 32,
                                borderWidth: 4,
                                borderColor: theme.colors.text,
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 12,
                            }}
                        >
                            <H1>✓</H1>
                        </View>
                    </View>

                    <H2>Payment complete!</H2>

                    <StyledButton onPress={() => router.replace("/(tabs)/shop")}>
                        Back to shop
                    </StyledButton>
                </Card>
            </ScrollView>
        </>
    );
}
