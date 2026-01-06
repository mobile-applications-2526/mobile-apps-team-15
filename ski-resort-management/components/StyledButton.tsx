import { Pressable, PressableProps, View } from "react-native";
import React, { forwardRef, ReactNode } from "react";
import useTheme from "@components/ThemeContext";
import Paragraph from "@components/text/Paragraph";


interface ButtonProps extends PressableProps {
    readonly children: ReactNode;
    readonly primary?: boolean;
}

const StyledButton = forwardRef<View, ButtonProps>((props, ref) => {
    const theme = useTheme();

    const getBackgroundColor = (pressed: boolean) => {
        if (props.disabled) return theme.colors.buttonDisabledBackground;
        if (pressed) {
            return props.primary ? theme.colors.pressedPrimary : theme.colors.buttonPressedBackground;
        } else {
            return props.primary ? theme.colors.primary : theme.colors.buttonBackground;
        }
    }

    return (
        <Pressable
            {...props}
            accessibilityRole={"button"}
            ref={ref}
            style={({ pressed }) => [
                {
                    borderRadius: 8,
                    marginVertical: 15,
                    alignItems: 'center',
                    padding: theme.spacing.md,
                    backgroundColor: getBackgroundColor(pressed),
                },
                typeof props.style === 'function' ? props.style({ pressed }) : props.style
            ]}
        >
            <Paragraph style={{
                color: theme.colors.button,
                fontWeight: '600',
            }}>
                {props.children}
            </Paragraph>
        </Pressable>
    );
});

export default StyledButton;
