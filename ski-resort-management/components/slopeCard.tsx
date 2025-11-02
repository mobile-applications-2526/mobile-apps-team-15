import React from "react";
import { View, Text, Image, Pressable } from "react-native";

export type WeatherInfo = {
    windKmh?: number | null;
    snowQuality?: string | null;
    visibility?: string | null;
    busyness?: string | null;
};

export default function SlopeCard({
                                      imageUrl,
                                      name,
                                      description,
                                      expandable = false,
                                      expanded = false,
                                      onToggle,
                                      weather,
                                  }: {
    readonly imageUrl: any;
    readonly name: string;
    readonly description?: string;
    readonly expandable?: boolean;
    readonly expanded?: boolean;
    readonly onToggle?: () => void;
    readonly weather?: WeatherInfo;
}) {
    const HeaderWrapper = expandable ? Pressable : View;

    const safe = (v?: string | number | null, suffix = "") =>
        v === undefined || v === null || v === "" ? "-" : `${v}${suffix}`;

    return (
        <View style={{ backgroundColor: "#fff" }}>
            <View
                style={{
                    borderWidth: 1,
                    borderColor: "#e0e0e0",
                    borderRadius: 12,
                    padding: 16,
                }}
            >
                <HeaderWrapper
                    {...(expandable
                        ? { onPress: onToggle, style: { flexDirection: "row", alignItems: "center" } }
                        : {})}
                >
                    <View style={{ flex: 1, marginRight: expandable ? 8 : 0 }}>
                        <Image
                            source={imageUrl}
                            style={{
                                width: "100%",
                                height: 120,
                                borderRadius: 8,
                                marginBottom: 12,
                                backgroundColor: "#f3f3f3",
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                color: "#333",
                                marginBottom: 8,
                            }}
                        >
                            {name}
                        </Text>

                        {!!description && (
                            <Text style={{ fontSize: 14, color: "#666", lineHeight: 20 }}>
                                {description}
                            </Text>
                        )}
                    </View>

                    {expandable && (
                        <Text style={{ fontSize: 18, color: "#111" }}>
                            {expanded ? "▲" : "▼"}
                        </Text>
                    )}
                </HeaderWrapper>

                {expandable && expanded && (
                    <View style={{ marginTop: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>
                            Weather
                        </Text>

                        <View
                            style={{
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: "#e9e9e9",
                                paddingVertical: 10,
                                gap: 12,
                            }}
                        >
                            <Row label="wind" value={safe(weather?.windKmh, " km/h")} />
                            <Row label="snow quality" value={safe(weather?.snowQuality ?? null)} />
                            <Row label="visibility" value={safe(weather?.visibility ?? null)} />
                        </View>

                        <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 16 }}>
                            Busyness
                        </Text>
                        <Text style={{ marginTop: 6, color: "#333" }}>
                            {safe(weather?.busyness ?? null)}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Text style={{ color: "#444" }}>{label}</Text>
            <Text style={{ color: "#111" }}>{value}</Text>
        </View>
    );
}
