import { Pressable, PressableProps } from "react-native";
import React, { ReactNode } from "react";
import useTheme from "@components/ThemeContext";
import Paragraph from "@components/text/Paragraph";


interface ButtonProps {
    readonly children?: ReactNode;
}

export default function Button({ children, onPress }: ButtonProps & PressableProps) {
    const theme = useTheme();

    return (
        <Pressable style={{
            backgroundColor: theme.colors.buttonBackground,
            borderRadius: 8,
            marginVertical: 15,
            alignItems: 'center',
            padding: 15
        }} onPress={onPress}>
            <Paragraph style={{
                color: theme.colors.button,
                fontWeight: '600',
            }}>
                {children}
            </Paragraph>
        </Pressable>
    );
}
