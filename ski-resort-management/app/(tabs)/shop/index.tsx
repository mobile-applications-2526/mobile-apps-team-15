import { ScrollView } from "react-native";
import Header from "@components/header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListNavigationCard } from "@components/shop/ListNavigationCard";
import Card from "@components/Card";
import useTheme from "@components/ThemeContext";
import H1 from "@components/text/H1";
import { Stack } from "expo-router";
import React from "react";


export default function Index() {

    const theme = useTheme();

    return (
        <>
            <Stack.Screen options={{headerShown: false, title: "Shop"}}/>
            <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
                <Header/>
                <ScrollView style={{flex: 1}}>
                    <Card>
                        <H1>Shop</H1>
                    </Card>
                    <ListNavigationCard
                        items={[
                            {title: "Ski Passes", href: "shop/skipass"},
                            {title: "Materials", href: "shop/materials"},
                        ]}/>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
