import { Pressable, Text, Image } from "react-native";
import Description from "@components/text/Description";
import H4 from "@components/text/H4";
import H3 from "@components/text/H3";
import useTheme from "@components/ThemeContext";


export default function MaterialOverview({ name, pricePerHour, pricePerDay, size }: {
    readonly name: string,
    readonly pricePerHour: number,
    readonly pricePerDay: number,
    readonly size: string
}) {

    const theme = useTheme();

    return (
        <>
            {/* Title */}
            <Image source={require("@assets/material.svg")} style={{
                width: "100%",
                height: 120,
                borderRadius: 12,
                marginBottom: 8,
                backgroundColor: "#f3f3f3",
            }} />
            <H4>{name}</H4>

            {/* Size */}
            <Description>Size: {size}</Description>

            {/* Price */}
            <H3 style={{ marginTop: 8, color: theme.colors.textSecondary }}>${pricePerHour}/hr | ${pricePerDay}/day</H3>

            {/* Button */}
            <Pressable style={{
                backgroundColor: '#333',
                padding: 15,
                borderRadius: 8,
                marginTop: 10,
                alignItems: 'center',
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: '600',
                }}>Add</Text>
            </Pressable>
        </>
    )
}
