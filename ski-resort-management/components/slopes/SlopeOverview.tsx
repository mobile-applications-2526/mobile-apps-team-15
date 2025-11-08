import React from "react";
import { Image, Pressable, View } from "react-native";
import { Slope } from "@constants/types";
import H3 from "@components/text/H3";
import H4 from "@components/text/H4";
import Description from "@components/text/Description";
import Paragraph from "@components/text/Paragraph";
import Divider from "@components/text/Divider";


export default function SlopeOverview({
                                          slope: {
                                              name,
                                              description,
                                              imageUrl,
                                              weather,
                                          },
                                          expandable = false,
                                          expanded = false,
                                          onToggle,
                                      }: {
    readonly slope: Slope;
    readonly expandable?: boolean;
    readonly expanded?: boolean;
    readonly onToggle?: () => void;
}) {

    const HeaderWrapper = expandable ? Pressable : View;

    const safe = (v?: string | number | null, suffix = "") =>
        v === undefined || v === null || v === "" ? "-" : `${v}${suffix}`;

    return (
        <>
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
                    <H3>{name}</H3>
                    {!!description && <Description>{description}</Description>}
                </View>

                {expandable && (
                    <Paragraph style={{ fontSize: 18 }}>
                        {expanded ? "▲" : "▼"}
                    </Paragraph>
                )}
            </HeaderWrapper>

            {expandable && expanded && (
                <View style={{ marginTop: 8 }}>
                    <Divider/>
                    <H4 style={{ marginTop: 16, marginBottom: 8 }}>Weather</H4>
                    <View style={{ paddingVertical: 8, gap: 12 }}>
                        <Row label="wind" value={safe(weather?.windKmh, " km/h")}/>
                        <Row label="snow quality" value={safe(weather?.snowQuality ?? null)}/>
                        <Row label="visibility" value={safe(weather?.visibility ?? null)}/>
                    </View>

                    <Divider/>
                    <H4 style={{ marginTop: 16 }}>Busyness</H4>
                    <Paragraph style={{ marginTop: 6 }}>{safe(weather?.busyness ?? null)}</Paragraph>
                </View>
            )}
        </>
    );
}

function Row({ label, value }: Readonly<{ label: string; value: string }>) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Description>{label}</Description>
            <Paragraph>{value}</Paragraph>
        </View>
    );
}
