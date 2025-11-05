import { ScrollView, TextInput, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import MaterialCard from "@components/shop/MaterialCard";
import Card from "@components/Card";
import React, { useMemo, useState } from "react";
import useTheme from "@components/ThemeContext";
import H1 from "@components/text/H1";
import SubHeading from "@components/text/SubHeading";


type Material = {
    name: string;
    pricePerHour: number;
    pricePerDay: number;
    size: string;
};

export default function SkiPass() {

    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const materials: Material[] = [
        { name: "Boots", pricePerHour: 5, pricePerDay: 25, size: "38" },
        { name: "Jacket", pricePerHour: 6, pricePerDay: 30, size: "M" },
        { name: "Pants", pricePerHour: 5, pricePerDay: 25, size: "M" },
        { name: "Skis", pricePerHour: 8, pricePerDay: 40, size: "38" },
    ]


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
            <ScrollView
                contentContainerStyle={{ backgroundColor: theme.colors.background, paddingBottom: insets.bottom + 70 }}>
                <Card>
                    <H1>Materials</H1>
                    <SubHeading>Rent out materials</SubHeading>
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
