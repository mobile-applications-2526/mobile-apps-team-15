import { TextInput, View } from "react-native";
import useTheme from "@components/ThemeContext";
import React from "react";
import { TextInputProps } from "react-native/Libraries/Components/TextInput/TextInput";


export default function StyledTextInput({ placeholder, value, onChangeText, accessibilityLabel, autoCorrect, secureTextEntry, keyboardType, autoCapitalize, textContentType }: Readonly<TextInputProps>) {

    const theme = useTheme();

    return (
        <View style={[
            theme.border, {
            marginTop: theme.spacing.md,
            backgroundColor: theme.colors.textInputBackground,
            borderRadius: theme.radius.lg,
            padding: theme.spacing.sm,
        }]}
        >
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textPlaceholder}
                value={value}
                accessibilityLabel={accessibilityLabel}
                secureTextEntry={secureTextEntry ?? false}
                onChangeText={onChangeText}
                style={theme.text.paragraph}
                autoCorrect={autoCorrect ?? false}
                autoCapitalize={autoCapitalize ?? "none"}
                textContentType={textContentType ?? "none"}
                keyboardType={keyboardType ?? "default"}
            />
        </View>
    );
}