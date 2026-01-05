import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import Card from "@components/Card";
import { View } from "react-native";
import H3 from "@components/text/H3";
import H1 from "@components/text/H1";
import Description from "@components/text/Description";
import useTheme from "@components/ThemeContext";
import StyledButton from "@components/StyledButton";


export default function SkiPassCheckout() {
    const theme = useTheme();
    const router = useRouter();

    const { selectedSkiPassTitle } = useLocalSearchParams();
    //Use this param to lookup skipass price

    const mockedSkipass = {
        title: "Gold",
        price: 50,
        includedList: ["Allowed in domain 1 to 3", "Free drinks at the ski resort bars"]
    }


    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Ski-Pass Checkout',
                    headerShown: true,
                    headerBackButtonDisplayMode: 'minimal',
                    headerStyle: { backgroundColor: theme.colors.surface },
                    headerTitleStyle: { color: theme.colors.text },
                    headerTintColor: theme.colors.text,
                }}
            />

            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Card>
                    <H3 style={{ marginTop: 10, alignSelf: "center" }}>Summary</H3>
                    <H1 style={{ marginTop: 5, alignSelf: "center", }}>${mockedSkipass.price}/mo</H1>
                    <Description style={{ fontSize: 18, marginTop: 20 }}>
                        You'll pay once in the app. Your subscription renews automatically each month until cancelled.
                    </Description>
                    <StyledButton
                        onPress={() => {

                            router.replace("/(tabs)/shop/payment-complete");
                        }}
                        style={{ marginBottom: 12 }}
                    >
                        Pay
                    </StyledButton>
                </Card>
            </View>
        </>
    )
}
