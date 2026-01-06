import { router } from "expo-router";
import H3 from "@components/text/H3";
import Description from "@components/text/Description";
import useTheme from "@components/ThemeContext";
import StyledButton from "@components/StyledButton";
import H2 from "@components/text/H2";
import Paragraph from "@components/text/Paragraph";


export default function SkiPassOverview({ title, price, includedList, passType, hasActiveSkiPass = false }: {
    readonly title: string,
    readonly price: number,
    readonly includedList: readonly string[]
    readonly passType: string
    readonly hasActiveSkiPass?: boolean
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
                ${price}
            </H3>

            {/* Included List */}
            {includedList.map((item) => (
                <Description key={item} style={{ marginBottom: 5, fontSize: 16 }}>• {item}</Description>
            ))}

            {/* Button */}
            {hasActiveSkiPass ? (
                <StyledButton disabled>
                    Active skipass detected
                </StyledButton>
                
            ) : (
                <StyledButton onPress={() => {
                    router.push({
                        pathname: "shop/skipasscheckout",
                        params: {
                            title, price, passType
                        }
                    })
                }}>
                    Get ski pass
                </StyledButton>
            )}
        </>
    )
}
