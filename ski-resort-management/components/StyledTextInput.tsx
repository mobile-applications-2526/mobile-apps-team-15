import { TextInput } from "react-native";
import useTheme from "@components/ThemeContext";
import React, { forwardRef } from "react";
import { TextInputProps } from "react-native/Libraries/Components/TextInput/TextInput";


const StyledTextInput = forwardRef<TextInput, TextInputProps>((props, ref) => {

    const theme = useTheme();

    return (
        <TextInput
            {...props}
            ref={ref}
            style={[
                theme.border, {
                    marginTop: theme.spacing.md,
                    backgroundColor: theme.colors.textInputBackground,
                    borderRadius: theme.radius.lg,
                    padding: theme.spacing.sm,
                }, theme.text.paragraph]}
            placeholderTextColor={theme.colors.textPlaceholder}
        />
    );
});

export default StyledTextInput
