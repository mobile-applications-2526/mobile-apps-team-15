import React from "react";
import { View, Text, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import useTheme from "@components/ThemeContext";

export default function PaymentComplete() {

    const theme = useTheme();
    const router = useRouter();

    const colors = {
        background: theme?.colors?.background ?? "#f5f5f5",
        surfaceMuted: theme?.colors?.surfaceMuted ?? "#e0e0e0",
        surface: theme?.colors?.surface ?? "#ffffff",
        card: theme?.colors?.card ?? "#ffffff",
        text: theme?.colors?.text ?? "#1f1f1f",
        border: theme?.colors?.border ?? "#e5e5e5",
        primary: theme?.colors?.primary ?? "#111111",
        shadow: theme?.colors?.shadow ?? "#000000",
        buttonText: theme?.colors?.buttonText ?? "#ffffff",
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Payment Complete',
                    headerLargeTitle: false,
                    headerShown: true,
                    headerStyle: { backgroundColor: theme.colors.surface },
                    headerTitleStyle: { color: theme.colors.text },
                    headerTintColor: theme.colors.text,
                }}
            />

            {/* 👇 Pagina-achtergrond nu in lijn met andere schermen */}
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                {/* Bovenste balk als surface, zoals andere headers */}
                <View
                    style={{
                        backgroundColor: colors.surface,
                        paddingTop: 16,
                        paddingHorizontal: 16,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        borderBottomColor: colors.border,
                        borderBottomWidth: 0,
                        marginBottom: 12,
                        height: 60,
                    }}
                />

                {/* Succeskaart */}
                <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                    <View
                        style={{
                            backgroundColor: colors.card,
                            borderRadius: 12,
                            paddingVertical: 28,
                            paddingHorizontal: 16,
                            alignItems: "center",
                            justifyContent: "center",
                            shadowColor: colors.shadow,
                            shadowOpacity: 0.08,
                            shadowRadius: 12,
                            shadowOffset: { width: 0, height: 2 },
                            elevation: 2,
                            borderWidth: 1,
                            borderColor: colors.border,
                        }}
                    >
                        <View
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 32,
                                borderWidth: 4,
                                borderColor: colors.text,
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 12,
                                backgroundColor: colors.card,
                            }}
                        >
                            <Text style={{ fontSize: 28, color: colors.text }}>✓</Text>
                        </View>

                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "700",
                                color: colors.text,
                                textAlign: "center",
                                marginBottom: 20,
                            }}
                        >
                            Payment complete!
                        </Text>

                        <Pressable
                            onPress={() => router.replace("/(tabs)/shop")}
                            style={{
                                backgroundColor: colors.shadow,
                                paddingVertical: 12,
                                paddingHorizontal: 32,
                                borderRadius: 10,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.buttonText,
                                    fontWeight: "600",
                                    fontSize: 16,
                                }}
                            >
                                Back to shop
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    );
}
