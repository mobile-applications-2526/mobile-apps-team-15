import { StyleProp, Text, TextStyle } from "react-native";
import { ReactNode } from "react";
import useTheme from "@components/ThemeContext";


interface H2Props {
    readonly children?: ReactNode;
    readonly style?: StyleProp<TextStyle>;
}

export default function H2({ children, style }: H2Props) {
    const theme = useTheme();

    return (
        <Text style={[theme.text.H2, style]}>
            {children}
        </Text>
    );
}
