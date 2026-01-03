import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Card from "@components/Card";
import H2 from "@components/text/H2";
import H3 from "@components/text/H3";
import Paragraph from "@components/text/Paragraph";
import Description from "@components/text/Description";
import Divider from "@components/text/Divider";
import StyledButton from "@components/StyledButton";
import useTheme from "@components/ThemeContext";

type Unit = "hours" | "days";

type IncomingItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    durationUnit?: Unit;
    durationValue?: number;
    pph?: number;
    ppd?: number;
};

type ItemState = {
    id: string;
    name: string;
    quantity: number;
    unit: Unit;
    duration: number;
    pph?: number;
    ppd?: number;
    inferredRate: number;
};

export default function MaterialsCheckout() {
    const theme = useTheme();
    const router = useRouter();

    const { items } = useLocalSearchParams<{ items?: string }>();
    const parsed: IncomingItem[] = useMemo(() => {
        try {
            if (!items) return [];
            const arr = JSON.parse(items);
            return Array.isArray(arr) ? arr : [];
        } catch {
            return [];
        }
    }, [items]);

    const [rows, setRows] = useState<ItemState[]>(
        () =>
            parsed.map((it) => {
                const unit: Unit = it.durationUnit ?? "days";
                const duration = Math.max(1, it.durationValue ?? 1);
                const inferredRate = it.price / duration;
                return {
                    id: it.id,
                    name: it.name,
                    quantity: Math.max(1, it.quantity ?? 1),
                    unit,
                    duration,
                    pph: it.pph,
                    ppd: it.ppd,
                    inferredRate: isFinite(inferredRate) ? inferredRate : it.price,
                };
            }) ?? []
    );

    const calcSingleItemBasePrice = (row: ItemState) => {
        const rate =
            row.unit === "hours"
                ? row.pph ?? row.inferredRate
                : row.ppd ?? row.inferredRate;
        return row.duration * rate;
    };

    const calcLineTotal = (row: ItemState) => row.quantity * calcSingleItemBasePrice(row);

    const total = useMemo(
        () => rows.reduce((sum, r) => sum + calcLineTotal(r), 0),
        [rows]
    );

    const updateRow = (id: string, patch: Partial<ItemState>) =>
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

    const pill = {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
    } as const;

    const smallBtn = {
        height: 36,
        width: 36,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.buttonBackground,
    } as const;

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Materials Checkout",
                    headerShown: true,
                    headerBackButtonDisplayMode: "minimal",
                    headerStyle: { backgroundColor: theme.colors.surface },
                    headerTitleStyle: { color: theme.colors.text },
                    headerTintColor: theme.colors.text,
                }}
            />
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Card>
                    <H2 style={{ marginBottom: 12 }}>Checkout</H2>

                    {rows.map((row) => (
                        <View
                            key={row.id}
                            style={{
                                ...theme.border,
                                borderRadius: 12,
                                padding: 12,
                                marginBottom: 16,
                                backgroundColor: theme.colors.surface,
                            }}
                        >
                            {/* Title + price */}
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 10,
                                }}
                            >
                                <Paragraph style={{ fontWeight: "600" }}>{row.name}</Paragraph>
                                <H3 style={{ fontWeight: "700" }}>
                                    ${calcLineTotal(row).toFixed(0)}
                                </H3>
                            </View>

                            <Divider />

                            {/* Amount */}
                            <View
                                style={{
                                    marginTop: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Description>Amount:</Description>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                                    <Pressable
                                        onPress={() =>
                                            updateRow(row.id, { quantity: Math.max(1, row.quantity - 1) })
                                        }
                                        style={smallBtn}
                                    >
                                        <Paragraph style={{ color: theme.colors.button }}>-</Paragraph>
                                    </Pressable>
                                    <View style={[pill, { paddingVertical: 6 }]}>
                                        <Paragraph style={{ textAlign: "center", minWidth: 24 }}>
                                            {row.quantity}
                                        </Paragraph>
                                    </View>
                                    <Pressable
                                        onPress={() => updateRow(row.id, { quantity: row.quantity + 1 })}
                                        style={smallBtn}
                                    >
                                        <Paragraph style={{ color: theme.colors.button }}>+</Paragraph>
                                    </Pressable>
                                </View>
                            </View>

                            {/* Duration */}
                            <View
                                style={{
                                    marginTop: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Description>Duration:</Description>

                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Pressable
                                        onPress={() =>
                                            updateRow(row.id, { duration: Math.max(1, row.duration - 1) })
                                        }
                                        style={smallBtn}
                                    >
                                        <Paragraph style={{ color: theme.colors.button }}>-</Paragraph>
                                    </Pressable>

                                    <Pressable
                                        style={[pill, { flexDirection: "row", alignItems: "center", gap: 8 }]}
                                    >
                                        <Paragraph>
                                            {row.duration} {row.unit}
                                        </Paragraph>
                                    </Pressable>

                                    <Pressable
                                        onPress={() =>
                                            updateRow(row.id, { duration: Math.max(1, row.duration + 1) })
                                        }
                                        style={smallBtn}
                                    >
                                        <Paragraph style={{ color: theme.colors.button }}>+</Paragraph>
                                    </Pressable>

                                    <Pressable
                                        onPress={() =>
                                            updateRow(row.id, { unit: row.unit === "days" ? "hours" : "days" })
                                        }
                                        style={smallBtn}
                                    >
                                        <Paragraph style={{ color: theme.colors.button }}>
                                            {row.unit === "days" ? "d" : "h"}
                                        </Paragraph>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    ))}

                    <Divider />

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
                            <H3 style={{ fontWeight: "700" }}>${total.toFixed(0)}</H3>
                        </View>
                    </View>

                    {/* Pay -> navigate to payment complete */}
                    <StyledButton
                        onPress={() => {
                            // eventueel: lokale cart leegmaken hier
                            router.replace("/(tabs)/shop/payment-complete");
                        }}
                        style={{ marginBottom: 12 }}
                    >
                        Pay
                    </StyledButton>

                    <Description style={{ opacity: 0.7 }}>
                        Items will be available for pickup after payment was completed.
                    </Description>
                </Card>
            </View>
        </>
    );
}
