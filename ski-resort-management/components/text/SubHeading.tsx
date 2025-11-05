import { StyleProp, Text, TextStyle } from "react-native";
import { ReactNode } from "react";
import useTheme from "@components/ThemeContext";


interface SubHeadingProps {
    readonly children?: ReactNode;
    readonly style?: StyleProp<TextStyle>;
}

export default function SubHeading({ children, style }: SubHeadingProps) {
    const theme = useTheme();

    return (
        <Text style={[theme.text.subheading, style]}>
            {children}
        </Text>
    );
}
