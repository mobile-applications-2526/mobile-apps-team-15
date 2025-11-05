import { StyleProp, Text, TextStyle } from "react-native";
import { ReactNode } from "react";
import useTheme from "@components/ThemeContext";


interface ParagraphProps {
    readonly children?: ReactNode;
    readonly style?: StyleProp<TextStyle>;
}

export default function Paragraph({ children, style }: ParagraphProps) {
    const theme = useTheme();

    return (
        <Text style={[theme.text.paragraph, style]}>
            {children}
        </Text>
    );
}
