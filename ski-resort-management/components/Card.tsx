import { StyleProp, View, ViewStyle } from "react-native";
import { ReactNode } from "react";
import useTheme from "@components/ThemeContext";


interface CardProps {
    readonly children?: ReactNode;
    readonly style?: StyleProp<ViewStyle>;
    readonly border?: boolean;
    readonly shadow?: boolean;
}

export default function Card({ children, style, shadow = true, border }: CardProps) {
    const theme = useTheme();

    return (
        <View style={[theme.card, style]}>
            {children}
        </View>
    );
}
