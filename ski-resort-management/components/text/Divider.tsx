import { View } from "react-native";
import useTheme from "@components/ThemeContext";


export default function Divider() {
    const theme = useTheme();

    return (
        <View style={theme.divider}/>
    );
}
