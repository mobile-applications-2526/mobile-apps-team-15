import { Text } from "react-native";
import useTheme from "@components/ThemeContext";
import { HeadingProps } from "@constants/types";


export default function H4({ children, style }: Readonly<HeadingProps>) {
    const theme = useTheme();

    return (
        <Text style={[theme.text.H4, style]}>
            {children}
        </Text>
    );
}
