import { Pressable, Text } from "react-native";
import H3 from "@components/text/H3";
import H4 from "@components/text/H4";
import Description from "@components/text/Description";
import useTheme from "@components/ThemeContext";


export default function SkiPassOverview({ title, price, includedList }: {
    readonly title: string,
    readonly price: number,
    readonly includedList: readonly string[]
}) {

    const theme = useTheme();

    return (
        <>
            {/* Title */}
            <H4 style={{
                marginBottom: 10,
            }}>{title}</H4>

            {/* Price */}
            <H3 style={{ marginBottom: 15, color: theme.colors.textSecondary }}>${price}/mo</H3>

            {/* Included List */}
            {includedList.map((item) => (
                <Description key={item} style={{ marginBottom: 5 }}>• {item}</Description>
            ))}

            {/* Button */}
            <Pressable style={{
                backgroundColor: '#333',
                padding: 15,
                borderRadius: 8,
                marginTop: 20,
                alignItems: 'center',
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: '600',
                }}>Button</Text>
            </Pressable>
        </>
    )
}
