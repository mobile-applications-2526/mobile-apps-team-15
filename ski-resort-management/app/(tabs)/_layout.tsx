import React from "react";
import { Icon, Label, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Platform } from "react-native";
import useTheme from "@components/ThemeContext";
import { Stack } from "expo-router";
import { Tabs } from "expo-router"

export default function TabsLayout() {

    const theme = useTheme();

    // WEB: use stable Tabs (shows tab bar)
    if (Platform.OS === "web") {
        return (
            <Tabs screenOptions={{ headerShown: false }}>
                <Tabs.Screen name="index" options={{ title: "Home" }} />
                <Tabs.Screen name="slopes/index" options={{ title: "Slopes" }} />
                <Tabs.Screen name="shop" options={{ title: "Shop" }} />
                <Tabs.Screen name="qrcode/index" options={{ title: "QR Code" }} />
            </Tabs>
        );
    }

    // NATIVE: keep NativeTabs
    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <NativeTabs
                backgroundColor={Platform.OS === "android" ? theme.colors.tabBackground : undefined}
                indicatorColor={Platform.OS === "android" ? theme.colors.tabIndicator : undefined}
            >
                <NativeTabs.Trigger name={"index"}>
                    <Label>Home</Label>
                    <Icon src={<VectorIcon family={FontAwesome6} name={"house"}/>}/>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name={"slopes"}>
                    <Label>Slopes</Label>
                    <Icon src={<VectorIcon family={FontAwesome6} name={"person-skiing"}/>}/>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name={"shop"}>
                    <Label>Shop</Label>
                    <Icon src={<VectorIcon family={FontAwesome6} name={"basket-shopping"}/>}/>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name={"qrcode"}>
                    <Label>QR Code</Label>
                    <Icon src={<VectorIcon family={FontAwesome6} name={"qrcode"}/>}/>
                </NativeTabs.Trigger>
            </NativeTabs>
        </>
    );
}
