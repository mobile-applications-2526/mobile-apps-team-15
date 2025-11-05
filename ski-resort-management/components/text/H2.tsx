import { Text } from "react-native";
import useTheme from "@components/ThemeContext";
import { HeadingProps } from "@constants/types";


export default function H2({ children, style }: Readonly<HeadingProps>) {
    const theme = useTheme();

    return (
        <Text style={[theme.text.H2, style]}>
            {children}
        </Text>
    );
}
