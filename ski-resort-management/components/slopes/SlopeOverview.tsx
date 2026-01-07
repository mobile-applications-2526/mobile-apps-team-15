import React from "react";
import { View } from "react-native";
import { Slope } from "@constants/types";
import H3 from "@components/text/H3";
import H4 from "@components/text/H4";
import Description from "@components/text/Description";
import Paragraph from "@components/text/Paragraph";
import Divider from "@components/text/Divider";
import StyledButtonSmall from "@components/StyledButtonSmall";
import { useFavoriteSlopeStore } from "@/store/FavoriteSlopeStore";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useTheme from "@components/ThemeContext";


type SlopeOverviewProps = {
    slope: Slope;
    expandable?: boolean;
    expanded?: boolean;
    onToggle?: () => void;
}

export default function SlopeOverview({
                                          slope,
                                          expandable = false,
                                          expanded = false,
                                          onToggle,
                                      }: Readonly<SlopeOverviewProps>) {

    const theme = useTheme();


    const { favoriteSlope, setFavoriteSlope } = useFavoriteSlopeStore();

    return (
        <>
            <View
                {...(expandable
                    ? { style: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" } }
                    : {})}
            >
                <View style={{ flex: 1 }}>
                    <H3>{slope.slopeName}</H3>
                    <Description>{slope.domain.name}</Description>
                </View>

                {expandable && (
                    <View style={{ flexDirection: "row" }}>
                        <StyledButtonSmall onPress={() => favoriteSlope?.id === slope.id ? setFavoriteSlope(null) : setFavoriteSlope(slope) } style={{backgroundColor: "transparent"}} accessibilityLabel={favoriteSlope?.id === slope.id ? "Remove favorite" : "Favorite"} >
                            <FontAwesome6 name={"heart"} solid size={20} color={favoriteSlope?.id === slope.id ? theme.colors.error : theme.colors.textSecondary} />
                        </StyledButtonSmall>
                        <StyledButtonSmall onPress={onToggle} style={{backgroundColor: "transparent"}} accessibilityLabel={expanded ? "close" : "expand"} >
                            <FontAwesome6 name={expanded ? "chevron-up" : "chevron-down"} solid size={20} color={theme.colors.text} />
                        </StyledButtonSmall>
                    </View>
                )}
            </View>

            {expanded && (
                <View style={{ marginTop: 8 }}>
                    <Divider/>
                    <H4 style={{ marginTop: 16, marginBottom: 8 }}>Weather</H4>
                    <View style={{ paddingVertical: 8, gap: 12 }}>
                        <Row label="Status:" value={slope.status}/>
                        <Row label="Difficulty:" value={slope.difficulty}/>
                    </View>
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
