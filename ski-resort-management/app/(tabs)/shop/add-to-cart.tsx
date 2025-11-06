import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import Card from "@components/Card";
import { useState } from "react";

export default function AddToCart() {
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
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <Stack.Screen options={{ headerShown: false }} />
            <Card>
                <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 6 }}>
                    {name ?? "Item"}
                </Text>
                <Text style={{ color: "#666", marginBottom: 14 }}>
                    Choose amount and duration
                </Text>

                <Card border paddingX={12} paddingY={12}>
                    <Text style={{ marginBottom: 8 }}>Price per hour: ${pph}</Text>
                    <Text style={{ marginBottom: 12 }}>Price per day: ${ppd}</Text>

                    {/* Amount */}
                    <Text style={{ marginBottom: 6 }}>Amount:</Text>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <Pressable onPress={() => setAmount((a) => Math.max(1, a - 1))} style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8 }}>
                            <Text>-</Text>
                        </Pressable>
                        <Text style={{ width: 24, textAlign: "center" }}>{amount}</Text>
                        <Pressable onPress={() => setAmount((a) => a + 1)} style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8 }}>
                            <Text>+</Text>
                        </Pressable>
                    </View>

                    {/* Duration */}
                    <Text style={{ marginTop: 16, marginBottom: 6 }}>Duration:</Text>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <Pressable onPress={() => setDurationValue((v) => Math.max(1, v - 1))} style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8 }}>
                            <Text>-</Text>
                        </Pressable>
                        <Text style={{ width: 24, textAlign: "center" }}>{durationValue}</Text>
                        <Pressable onPress={() => setDurationValue((v) => v + 1)} style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8 }}>
                            <Text>+</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setDurationUnit((u) => (u === "days" ? "hours" : "days"))}
                            style={{ padding: 10, backgroundColor: "#eee", borderRadius: 8 }}
                        >
                            <Text>{durationUnit}</Text>
                        </Pressable>
                    </View>

                    <Text style={{ marginTop: 16, fontWeight: "600" }}>Estimated total: ${total}</Text>
                </Card>

                <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
                    <Pressable
                        onPress={() => router.back()}
                        style={{ flex: 1, backgroundColor: "#333", padding: 14, borderRadius: 10, alignItems: "center" }}
                    >
                        <Text style={{ color: "#fff", fontWeight: "600" }}>Continue shopping</Text>
                    </Pressable>
                    <Pressable
                        style={{ flex: 1, backgroundColor: "#111", padding: 14, borderRadius: 10, alignItems: "center" }}
                    >
                        <Text style={{ color: "#fff", fontWeight: "600" }}>Checkout</Text>
                    </Pressable>
                </View>
            </Card>
        </View>
    );
}
