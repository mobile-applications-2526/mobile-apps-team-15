import { Pressable, View } from "react-native";
import { router } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import useTheme from "@components/ThemeContext";


export default function Header() {

    const theme = useTheme();

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: theme.colors.surface,
        }}>
            <Pressable
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: theme.colors.textSecondary,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => router.push('account')}
            >
                <FontAwesome6 name={"user-large"} size={24} color={theme.colors.surface}/>
            </Pressable>
        </View>
    )
}
