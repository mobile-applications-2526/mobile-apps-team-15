import { StyleProp, Text, TextStyle } from "react-native";
import { ReactNode } from "react";
import useTheme from "@components/ThemeContext";


interface DescriptionProps {
    readonly children?: ReactNode;
    readonly style?: StyleProp<TextStyle>;
}

export default function Description({ children, style }: DescriptionProps) {
    const theme = useTheme();

    return (
        <Text style={[theme.text.description, style]}>
            {children}
        </Text>
    );
}
