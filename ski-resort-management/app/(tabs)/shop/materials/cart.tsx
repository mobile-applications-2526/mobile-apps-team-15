import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import Card from "@components/Card";
import H2 from "@components/text/H2";
import H3 from "@components/text/H3";
import Paragraph from "@components/text/Paragraph";
import Description from "@components/text/Description";
import Divider from "@components/text/Divider";
import StyledButton from "@components/StyledButton";
import useTheme from "@components/ThemeContext";
import { useCartStore } from "@/store/CartStore";
import StyledButtonSmall from "@components/StyledButtonSmall";
import loanService from "@/services/LoanService";
import { LoanRequestDto } from "@constants/types";
import dayjs, { Dayjs } from "dayjs";
import { useUserStore } from "@/store/UserStore";
import ErrorPopup from "@components/ErrorPopup";


export default function Cart() {

    const router = useRouter();
    const theme = useTheme();

    const { materials, duration, durationType, setDuration, setDurationType, getTotalPrice, clearCart } = useCartStore();

    const { user } = useUserStore()

    const [error, setError] = useState<Error | null>(null);

    const pill = {
        width: 95,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
    } as const;

    function handlePay() {
        setError(null);
        const startDate: Dayjs = dayjs();
        const endDate: Dayjs = startDate.add(duration, durationType);
        const loan: LoanRequestDto = {
            userId: user.id,
            startTime: startDate.toDate(),
            endTime: endDate.toDate(),
            materials: materials.map(material => material.id)
        }
        loanService.postLoan(loan)
            .then(() => {
                clearCart();
                router.replace("/(tabs)/shop/payment-complete");
            })
            .catch((error) => {
                setError(error);
            })
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Cart",
                    headerShown: true,
                    headerBackButtonDisplayMode: "minimal",
                    headerStyle: { backgroundColor: theme.colors.surface },
                    headerTitleStyle: { color: theme.colors.text },
                    headerTintColor: theme.colors.text,
                }}
            />
            <ScrollView testID="screen-shop-materials-cart" style={{ flex: 1, backgroundColor: theme.colors.background }}>
                {materials && <Card>
                    <H2 style={{ marginBottom: 12 }}>Checkout</H2>
                    {materials.length === 0 &&
                        <Paragraph style={{ marginVertical: theme.spacing.md }}>Your cart is empty.</Paragraph>}
                    {materials.length !== 0 && (<>
                        <View
                            style={{
                                ...theme.border,
                                borderRadius: 12,
                                paddingHorizontal: 12,
                                marginBottom: 16,
                                backgroundColor: theme.colors.surface,
                            }}
                        >

                            {materials.map((cartMaterial, index) => (
                                <React.Fragment key={cartMaterial.id}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginVertical: theme.spacing.md,
                                        }}
                                    >
                                        <Paragraph style={{ fontWeight: "600" }}>{cartMaterial.name}</Paragraph>
                                        <H3 style={{ fontWeight: "700" }}>
                                            ${cartMaterial.total.toFixed(2)}
                                        </H3>
                                    </View>
                                    {index !== materials.length - 1 && <Divider/>}
                                </React.Fragment>
                            ))}
                        </View>
                        <View style={{ marginVertical: theme.spacing.md }}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 8
                            }}>
                                <Description>Duration:</Description>
                                <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
                                    <StyledButtonSmall
                                        onPress={() => setDuration(Math.max(1, duration - 1))}>
                                        -
                                    </StyledButtonSmall>

                                    <View style={[pill, { flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }]}>
                                        <Paragraph>
                                            {duration} {durationType}
                                        </Paragraph>
                                    </View>

                                    <StyledButtonSmall
                                        onPress={() => setDuration(Math.max(1, duration + 1))}>
                                        +
                                    </StyledButtonSmall>
                                </View>
                                <StyledButtonSmall
                                    onPress={() => setDurationType(durationType === "days" ? "hours" : "days")}>
                                    {durationType === "days" ? "d" : "h"}
                                </StyledButtonSmall>
                            </View>
                        </View>
                        <Divider/>
                    </>)}


                    {/* Total */}
                    <View
                        style={{
                            ...theme.border,
                            borderRadius: 12,
                            padding: 12,
                            marginTop: 12,
                            marginBottom: 16,
                            backgroundColor: theme.colors.surface,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Paragraph style={{ fontWeight: "600" }}>Total:</Paragraph>
                            <H3 style={{ fontWeight: "700" }}>${getTotalPrice().toFixed(2)}</H3>
                        </View>
                    </View>

                    {/* Pay -> navigate to payment complete */}
                    <StyledButton
                        onPress={handlePay}
                        disabled={materials.length === 0}
                        primary
                    >
                        Pay
                    </StyledButton>

                    <Description style={{ opacity: 0.7 }}>
                        Items will be available for pickup after payment was completed.
                    </Description>
                </Card>}

                <Card style={{ marginTop: 16 }}>
                    <Description style={{ marginBottom: 12 }}>
                        Clear your cart to start over.
                    </Description>
                    <StyledButton
                        onPress={() => Alert.alert("Clear cart?", "Are you sure you want to clear your cart?", [
                            { text: "Cancel", style: "cancel" },
                            { text: "Yes", onPress: clearCart, style: "destructive" }
                        ])}
                        disabled={materials.length === 0}
                        dangerous
                    >
                        Clear Cart
                    </StyledButton>
                </Card>
            </ScrollView>
            {error && <ErrorPopup message={error.message}/>}
        </>
    );
}
