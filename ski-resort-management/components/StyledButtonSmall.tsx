import { Pressable, PressableProps, View } from "react-native";
import React, { forwardRef, ReactNode } from "react";
import useTheme from "@components/ThemeContext";
import Paragraph from "@components/text/Paragraph";


interface ButtonProps extends PressableProps {
    readonly children: ReactNode;
    readonly primary?: boolean;
    readonly dangerous?: boolean;
}

const StyledButtonSmall = forwardRef<View, ButtonProps>((props, ref) => {
    const theme = useTheme();

    return (
        <Pressable
            {...props}
            accessibilityRole={"button"}
            ref={ref}
            style={({ pressed }) => [
                {
                    height: 42,
                    width: 42,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: pressed ? theme.colors.buttonPressedBackground : theme.colors.buttonBackground,
                },
                typeof props.style === 'function' ? props.style({ pressed }) : props.style
            ]}
        >
            <Paragraph style={{
                color: theme.colors.button,
            }}>
                {props.children}
            </Paragraph>
        </Pressable>
    );
});

export default StyledButtonSmall;
