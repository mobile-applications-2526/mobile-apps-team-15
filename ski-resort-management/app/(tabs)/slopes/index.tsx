import React, { useMemo, useState } from "react";
import { LayoutAnimation, Platform, ScrollView, TextInput, UIManager, View, } from "react-native";
import Header from "@components/Header";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import SlopeOverview from "@components/slopes/SlopeOverview";
import Card from "@components/Card";
import H1 from "@components/text/H1";
import SubHeading from "@components/text/SubHeading";
import { Slope } from "@constants/types";
import useTheme from "@components/ThemeContext";
import { Stack } from "expo-router";
import StyledTextInput from "@components/StyledTextInput";


if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


const MOCK_SLOPES: Slope[] = [
    {
        id: "1",
        name: "Bluebird Ridge",
        description:
            "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.",
        imageUrl: require("@assets/skislope1.png"),
        weather: { windKmh: 18, snowQuality: "good", visibility: "clear", busyness: "Calm" },
    },
    {
        id: "2",
        name: "Eagle Pass",
        description: "Short description of the slope with a few notes.",
        imageUrl: require("@assets/skislope1.png"),
        weather: { windKmh: null, snowQuality: null, visibility: "low", busyness: null },
    },
    {
        id: "3",
        name: "Glacier Line",
        description: "A scenic route with wide turns.",
        imageUrl: require("@assets/skislope1.png"),
    },
];

export default function Index() {

    const theme = useTheme();
    const safeAreaInsets = useSafeAreaInsets();

    const [query, setQuery] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const data = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return MOCK_SLOPES;
        return MOCK_SLOPES.filter((s) => s.name.toLowerCase().includes(q));
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

                    {data.map((slope) => (
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
        </>
    );
}
