import { Platform, ScrollView, TextInput, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import MaterialOverview from "@components/shop/MaterialOverview";
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
    const safeAreaInsets = useSafeAreaInsets();

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
                    headerStyle: { backgroundColor: theme.colors.surface },
                    headerTitleStyle: { color: theme.colors.text },
                    headerTintColor: theme.colors.text,
                }}
            />
            <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={Platform.OS === "android" ? { paddingBottom: safeAreaInsets.bottom + 80 } : null } >
                <Card>
                    <H1>Materials</H1>
                    <SubHeading>Rent out materials</SubHeading>
                    <View
                        style={[theme.border, {
                            marginTop: 12,
                            backgroundColor: "#f3f3f3",
                            borderRadius: 10,
                            paddingHorizontal: 12,
                            paddingVertical: 10,
                        }]}
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

                <View style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: 19,
                }}>
                    {data.map((material) => (
                        <Card style={{ width: '47%', margin: 0 }} key={material.name}>
                            <MaterialOverview
                                key={material.name}
                                name={material.name}
                                pricePerHour={material.pricePerHour}
                                pricePerDay={material.pricePerDay}
                                size={material.size}
                            />
                        </Card>
                    ))}
                </View>
            </ScrollView>
        </>
    )
}
