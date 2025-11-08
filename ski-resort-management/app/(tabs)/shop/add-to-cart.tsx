import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import Card from "@components/Card";
import React, { useState } from "react";
import Paragraph from "@components/text/Paragraph";
import H2 from "@components/text/H2";
import SubHeading from "@components/text/SubHeading";
import useTheme from "@components/ThemeContext";
import Button from "@components/Button";
import H3 from "@components/text/H3";
import Divider from "@components/text/Divider";
import Description from "@components/text/Description";


export default function AddToCart() {

    const theme = useTheme();

    const router = useRouter();
    // Receive item info from previous screen
    const { name, pricePerHour, pricePerDay } = useLocalSearchParams<{
        name: string;
        pricePerHour?: string;
        pricePerDay?: string;
    }>();

    const pph = Number(pricePerHour ?? 0);
    const ppd = Number(pricePerDay ?? 0);

    const [amount, setAmount] = useState(1);
    const [durationUnit, setDurationUnit] = useState<"hours" | "days">("days");
    const [durationValue, setDurationValue] = useState(2);

    // Simple total calc for preview
    const total =
        durationUnit === "hours"
            ? amount * durationValue * pph
            : amount * durationValue * ppd;

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Materials',
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
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Card>
                    <H2 style={{ marginBottom: 6 }}>
                        {name}
                    </H2>
                    <SubHeading style={{ marginBottom: 14 }}>
                        Choose amount and duration
                    </SubHeading>

                    <View style={{ padding: 12, ...theme.border }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Paragraph style={{ marginBottom: 8 }}>Price per hour:</Paragraph><Paragraph
                            style={{ fontWeight: "600" }}>${pph}</Paragraph>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Paragraph style={{ marginBottom: 12 }}>Price per day:</Paragraph><Paragraph
                            style={{ fontWeight: "600" }}>${ppd}</Paragraph>
                        </View>

                        <Divider/>
                        {/* Amount */}
                        <View style={{
                            paddingTop: 10,
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <Description style={{ marginBottom: 6 }}>Amount:</Description>
                            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                                <Pressable onPress={() => setAmount((a) => Math.max(1, a - 1))} style={{
                                    padding: 10,
                                    backgroundColor: theme.colors.buttonBackground,
                                    borderRadius: 8,
                                    height: 40,
                                    width: 40,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Paragraph style={{ color: theme.colors.button }}>-</Paragraph>
                                </Pressable>
                                <Paragraph style={{ width: 24, textAlign: "center" }}>{amount}</Paragraph>
                                <Pressable onPress={() => setAmount((a) => a + 1)} style={{
                                    padding: 10,
                                    backgroundColor: theme.colors.buttonBackground,
                                    borderRadius: 8,
                                    height: 40,
                                    width: 40,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Paragraph style={{ color: theme.colors.button }}>+</Paragraph>
                                </Pressable>
                            </View>
                        </View>

                        {/* Duration */}
                        <View style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <Description style={{ marginTop: 16, marginBottom: 6 }}>Duration:</Description>
                            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                                <Pressable onPress={() => setDurationValue((v) => Math.max(1, v - 1))} style={{
                                    padding: 10,
                                    backgroundColor: theme.colors.buttonBackground,
                                    borderRadius: 8,
                                    height: 40,
                                    width: 40,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Paragraph style={{ color: theme.colors.button }}>-</Paragraph>
                                </Pressable>
                                <Paragraph style={{ width: 24, textAlign: "center" }}>{durationValue}</Paragraph>
                                <Pressable onPress={() => setDurationValue((v) => v + 1)} style={{
                                    padding: 10,
                                    backgroundColor: theme.colors.buttonBackground,
                                    borderRadius: 8,
                                    height: 40,
                                    width: 40,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Paragraph style={{ color: theme.colors.button }}>+</Paragraph>
                                </Pressable>
                                <Pressable
                                    onPress={() => setDurationUnit((u) => (u === "days" ? "hours" : "days"))}
                                    style={{
                                        padding: 10,
                                        backgroundColor: theme.colors.buttonBackground,
                                        borderRadius: 8
                                    }}
                                >
                                    <Paragraph style={{ color: theme.colors.button }}>{durationUnit}</Paragraph>
                                </Pressable>
                            </View>
                        </View>

                        <H3 style={{ marginTop: 16, fontWeight: "600" }}>Estimated total: ${total}</H3>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        gap: 10,
                        marginTop: 16,
                        alignItems: "stretch",
                        justifyContent: "space-evenly"
                    }}>
                        <Button onPress={() => router.back()}>Continue shopping</Button>
                        <Button>Checkout</Button>
                    </View>
                </Card>
            </View>
        </>
    );
}
