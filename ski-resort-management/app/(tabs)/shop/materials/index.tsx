import { Platform, ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import MaterialOverview from "@components/shop/MaterialOverview";
import Card from "@components/Card";
import React, { useMemo, useState } from "react";
import useTheme from "@components/ThemeContext";
import H1 from "@components/text/H1";
import SubHeading from "@components/text/SubHeading";
import useSWR from "swr";
import materialService from "@/services/MaterialService";
import ErrorPopup from "@components/ErrorPopup";
import StyledTextInput from "@components/StyledTextInput";
import MaterialCartHeaderButton from "@components/header/MaterialCartHeaderButton";


export default function SkiPass() {

    const theme = useTheme();
    const safeAreaInsets = useSafeAreaInsets();

    const materialFetcher = async () => {
        return await materialService.getAllAvailableMaterials()
    }

    const {data: materials, isLoading, error} = useSWR("api/materials", materialFetcher)

    const [query, setQuery] = useState("");

    const filteredMaterials = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return materials ?? [];
        return materials.filter((s) => s.name.toLowerCase().includes(q));
    }, [materials, query]);

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Materials',
                    headerShown: true,
                    headerStyle: { backgroundColor: theme.colors.surface },
                    headerTitleStyle: { color: theme.colors.text },
                    headerTintColor: theme.colors.text,
                    headerRight: () => <MaterialCartHeaderButton />
                }}
            />
            <ScrollView testID="screen-shop-materials"  style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={Platform.OS === "android" ? { paddingBottom: safeAreaInsets.bottom + 80 } : null } >
                <Card>
                    <H1>Materials</H1>
                    <SubHeading>Rent out materials</SubHeading>
                    <StyledTextInput placeholder={"Search"} value={query} onChangeText={setQuery} />
                </Card>

                <View style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: 19,
                }}>
                    { isLoading && <></> }
                    { !!(materials) && filteredMaterials.map((material) => (
                        <Card style={{width: '47%', margin: 0}} key={material.id}>
                            <MaterialOverview
                                key={material.id}
                                material={material}
                            />
                        </Card>
                    )) }
                </View>
            </ScrollView>
            { error && <ErrorPopup message={error.message}/> }
        </>
    )
}
