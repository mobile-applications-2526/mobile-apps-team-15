import React from "react";
import { Platform, Text } from "react-native";
import { Stack } from "expo-router";
import { Icon, Label, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useTheme from "@components/ThemeContext";

export default function TabsLayout() {
    const theme = useTheme();

    // Web fallback: avoid NativeTabs + Icon renderingToImageAsync issue
    if (Platform.OS === "web") {
        // For web (and Cypress), just render routes normally.
        return <Stack screenOptions={{ headerShown: false }} />;
    }

    //Native tabs for iOS/Android
    return (
        <NativeTabs
            backgroundColor={Platform.OS === "android" ? theme.colors.tabBackground : undefined}
            indicatorColor={Platform.OS === "android" ? theme.colors.tabIndicator : undefined}
        >
            <NativeTabs.Trigger name={"index"}>
                <Label>Home</Label>
                <Icon src={<VectorIcon family={FontAwesome6} name={"house"} />} />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name={"slopes/index"}>
                <Label>Slopes</Label>
                <Icon src={<VectorIcon family={FontAwesome6} name={"person-skiing"} />} />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name={"shop"}>
                <Label>Shop</Label>
                <Icon src={<VectorIcon family={FontAwesome6} name={"basket-shopping"} />} />
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name={"qrcode/index"}>
                <Label>QR Code</Label>
                <Icon src={<VectorIcon family={FontAwesome6} name={"qrcode"} />} />
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
