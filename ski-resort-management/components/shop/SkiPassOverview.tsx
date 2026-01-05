import { router } from "expo-router";
import H3 from "@components/text/H3";
import Description from "@components/text/Description";
import useTheme from "@components/ThemeContext";
import StyledButton from "@components/StyledButton";
import H2 from "@components/text/H2";


export default function SkiPassOverview({ title, price, includedList }: {
    readonly title: string,
    readonly price: number,
    readonly includedList: readonly string[]
}) {

    const theme = useTheme();

    return (
        <>
            {/* Title */}
            <H2 style={{ marginBottom: 10, alignSelf: "center", fontSize: 26 }}>
                {title}
            </H2>

            {/* Price */}
            <H3 style={{ marginBottom: 20, alignSelf: "center", color: theme.colors.textSecondary }}>
                ${price}/mo
            </H3>

            {/* Included List */}
            {includedList.map((item) => (
                <Description key={item} style={{ marginBottom: 5, fontSize: 16 }}>• {item}</Description>
            ))}

            {/* Button */}
            <StyledButton onPress={() => {
                router.push({
                    pathname: "shop/skipasscheckout",
                    params: {
                        selectedSkiPassTitle: title
                    }
                })
            }}>
                Get ski pass
            </StyledButton>
        </>
    )
}
