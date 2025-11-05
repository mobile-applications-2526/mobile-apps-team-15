import React, { useMemo, useState } from "react";
import { LayoutAnimation, Platform, ScrollView, TextInput, UIManager, View, } from "react-native";
import Header from "@components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import SlopeCard, { WeatherInfo } from "@components/slopeCard";
import { Slope } from "@constants/types";

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
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
            <ScrollView style={{ flex: 1 }}>
                <Header />

                <View
                    style={{
                        backgroundColor: "#fff",
                        marginHorizontal: 16,
                        marginTop: 12,
                        padding: 16,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: "#ececec",
                    }}
                >
                    <Text style={{ fontSize: 22, fontWeight: "800", marginBottom: 4 }}>
                        Discover the slopes!
                    </Text>
                    <Text style={{ color: "#666" }}>
                        View the condition and busyness of all your favorite slopes
                    </Text>

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
                </View>

                <View style={{ padding: 16, gap: 12, paddingBottom: 100 }}>
                    {data.map((item) => (
                        <SlopeCard
                            key={item.id}
                            imageUrl={item.imageUrl}
                            name={item.name}
                            description={item.description}
                            weather={item.weather}
                            expandable
                            expanded={expandedId === item.id}
                            onToggle={() => toggle(item.id)}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
