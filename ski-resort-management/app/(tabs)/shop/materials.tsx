import { ScrollView, Text, TextInput, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import MaterialCard from "@components/MaterialCard";
import Card from "@components/Card";
import React, { useMemo, useState } from "react";


type Material = {
    name: string;
    pricePerHour: number;
    pricePerDay: number;
    size: string;
};

export default function SkiPass() {

    const materials: Material[] = [
        { name: "Boots", pricePerHour: 5, pricePerDay: 25, size: "38" },
        { name: "Jacket", pricePerHour: 6, pricePerDay: 30, size: "M" },
        { name: "Pants", pricePerHour: 5, pricePerDay: 25, size: "M" },
        { name: "Skis", pricePerHour: 8, pricePerDay: 40, size: "38" },
    ]

    const insets = useSafeAreaInsets();

    const [query, setQuery] = useState("");

    const data = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return materials;
        return materials.filter((s) => s.name.toLowerCase().includes(q));
    }, [query]);

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Materials',
                    headerShown: true,
                }}
            />
            <ScrollView
                contentContainerStyle={{ paddingBottom: insets.bottom + 70 }} >
                <Card>
                    <Text style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: '#000',
                    }}>Ski Passes</Text>
                    <Text style={{
                        fontSize: 18,
                        color: '#333',
                    }}>Rent out materials</Text>
                    <View
                        style={{
                            marginTop: 12,
                            backgroundColor: "#f3f3f3",
                            borderRadius: 10,
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                        }}
                    >
                        <TextInput
                            placeholder="Search"
                            value={query}
                            onChangeText={setQuery}
                            style={{ fontSize: 16 }}
                            autoCorrect={false}
                        />
                    </View>
                </Card>

                    <Card>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            gap: 8,
                        }}>
                            {data.map((material) => (
                                <View style={{ width: '48%' }} key={material.name}>
                                    <MaterialCard
                                        name={material.name}
                                        pricePerHour={material.pricePerHour}
                                        pricePerDay={material.pricePerDay}
                                        size={material.size}
                                    />
                                </View>
                            ))}
                        </View>
                    </Card>
            </ScrollView>
        </>
    )
}
