import React, { useMemo, useState } from "react";
import { LayoutAnimation, Platform, ScrollView, UIManager } from "react-native";
import Header from "@components/header/Header";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import SlopeOverview from "@components/slopes/SlopeOverview";
import Card from "@components/Card";
import H1 from "@components/text/H1";
import SubHeading from "@components/text/SubHeading";
import useTheme from "@components/ThemeContext";
import { Stack } from "expo-router";
import StyledTextInput from "@components/StyledTextInput";
import useSWR from "swr";
import slopeService from "@/services/SlopeService";
import ErrorPopup from "@components/ErrorPopup";


if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


export default function Index() {

    const theme = useTheme();
    const safeAreaInsets = useSafeAreaInsets();

    const [query, setQuery] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);


    const slopesFetcher = async () => {
        return await slopeService.getAllSlopes();
    }
    const { data: slopes, isLoading, error } = useSWR("api/slopes", slopesFetcher);

    const data = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return slopes;
        return slopes.filter((s) => s.slopeName.toLowerCase().includes(q));
    }, [query]);

    const toggle = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId((curr) => (curr === id ? null : id));
    };

    return (
        <>
            <Stack.Screen options={{headerShown: false, title: "Slopes"}}/>
            <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
                <ScrollView style={{flex: 1}}
                            contentContainerStyle={Platform.OS === "android" ? {paddingBottom: safeAreaInsets.bottom + 56} : null}>
                    <Header/>

                    <Card>
                        <H1>Discover the slopes!</H1>
                        <SubHeading>View the condition and busyness of all your favorite slopes</SubHeading>

                        <StyledTextInput
                            placeholder="Search"
                            value={query}
                            onChangeText={setQuery}
                        />
                    </Card>

                    {!!(slopes) && data.map((slope) => (
                        <Card key={slope.id}>
                            <SlopeOverview
                                slope={slope}
                                expandable
                                expanded={expandedId === slope.id}
                                onToggle={() => toggle(slope.id)}
                            />
                        </Card>
                    ))}
                </ScrollView>
            </SafeAreaView>
            { error && <ErrorPopup message={error.message}/> }
        </>
    );
}
