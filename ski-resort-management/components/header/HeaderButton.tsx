import { Platform, Pressable } from "react-native";
import { router } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import useTheme from "@components/ThemeContext";


type HeaderButtonProps = {
    href: string;
    accessibilityLabel: string;
    iconName: string;
    testID?: string;
}

export default function HeaderButton({ href, accessibilityLabel, iconName, testID }: Readonly<HeaderButtonProps>) {

    const theme = useTheme();

    const getBackgroundColor = (pressed: boolean) => {
        if (Platform.OS === "ios") return "transparent"
        if (pressed) {
            return theme.colors.textPlaceholder
        }
        return theme.colors.textSecondary
    }


    return (
        <Pressable
            accessibilityLabel={accessibilityLabel}
            accessibilityRole={"button"}
            testID={testID}
            style={({ pressed }) =>
                ({
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: getBackgroundColor(pressed),
                })
            }
            onPress={() => router.push(href)}
        >
            <FontAwesome6 name={iconName} size={24} color={Platform.OS === "ios" ? theme.colors.text : theme.colors.surface}/>
        </Pressable>
    )
}

