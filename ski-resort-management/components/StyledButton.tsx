import { ColorValue, Pressable, PressableProps } from "react-native";
import React, { ReactNode } from "react";
import useTheme from "@components/ThemeContext";
import Paragraph from "@components/text/Paragraph";


interface ButtonProps {
    readonly children?: ReactNode;
    readonly primary?: boolean;
    readonly disabled?: boolean;
}

export default function StyledButton({ children, onPress, primary, disabled }: ButtonProps & PressableProps) {
    const theme = useTheme();

    const getBackgroundColor = (pressed: boolean) => {
        if (disabled) return theme.colors.buttonDisabledBackground;
        if (pressed) {
            return primary ? theme.colors.pressedPrimary : theme.colors.buttonPressedBackground;
        } else {
            return primary ? theme.colors.primary : theme.colors.buttonBackground;
        }
    }

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) =>
                ({
                    borderRadius: 8,
                    marginVertical: 15,
                    alignItems: 'center',
                    padding: theme.spacing.md,
                    backgroundColor: getBackgroundColor(pressed),
                })
            }
        >
            <Paragraph style={{
                color: theme.colors.button,
                fontWeight: '600',
            }}>
                {children}
            </Paragraph>
        </Pressable>
    );
}
