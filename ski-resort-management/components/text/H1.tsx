import { StyleProp, Text, TextStyle } from "react-native";
import { ReactNode } from "react";
import useTheme from "@components/ThemeContext";


interface H1Props {
    readonly children?: ReactNode;
    readonly style?: StyleProp<TextStyle>;
}

export default function H1({ children, style }: H1Props) {
    const theme = useTheme();

    return (
        <Text style={[theme.text.H1, style]}>
            {children}
        </Text>
    );
}
