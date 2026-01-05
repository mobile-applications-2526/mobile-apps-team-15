import useTheme from "@components/ThemeContext";
import { View } from "react-native";
import Paragraph from "@components/text/Paragraph";

interface ErrorProps {
    readonly message: string;
}

export default function ErrorPopup({message}: ErrorProps) {
    const theme = useTheme();

    return (
        <View style={{
            backgroundColor: theme.colors.errorBackground,
            margin: theme.spacing.lg,
            padding: theme.spacing.lg,
            borderRadius: theme.spacing.md,
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0
        }}>
            <Paragraph>{message}</Paragraph>
        </View>
    );
}
