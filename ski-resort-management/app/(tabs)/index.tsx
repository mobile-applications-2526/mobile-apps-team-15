import { Platform, Pressable, ScrollView, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import Header from "@components/Header";
import SlopeOverview from "@components/slopes/SlopeOverview";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "@components/Card";
import H1 from "@components/text/H1";
import SubHeading from "@components/text/SubHeading";
import useTheme from "@components/ThemeContext";
import H2 from "@components/text/H2";
import { Slope } from "@constants/types";
import React, { useCallback, useContext, useState } from "react";
import SkiPassService from "@/services/SkiPassService";
import { SkiPass } from "@/types";
import { AuthContext } from "@components/AuthContext";
import Paragraph from "@components/text/Paragraph";


export default function Index() {

    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const { user } = useContext(AuthContext);
    const [activeSkiPass, setActiveSkiPass] = useState<SkiPass | null>(null);
    const [isLoadingSkiPass, setIsLoadingSkiPass] = useState(false);
    const [skiPassError, setSkiPassError] = useState<string>("");

    const fetchActiveSkiPass = useCallback(async () => {
        if (!user?.uid) {
            setActiveSkiPass(null);
            return;
        }
        
        setIsLoadingSkiPass(true);
        setSkiPassError("");
        try {
            const skipasses = await SkiPassService.getCurrentSkiPassByUserId(user.uid);
            setActiveSkiPass(skipasses.length > 0 ? skipasses[0] : null);
        } catch (error) {
            console.error('Failed to fetch active ski pass:', error);
            setSkiPassError('Unable to load ski pass');
        } finally {
            setIsLoadingSkiPass(false);
        }
    }, [user?.uid]);

    useFocusEffect(
        useCallback(() => {
            fetchActiveSkiPass();
        }, [fetchActiveSkiPass])
    );

    const favouriteSlope: Slope = {
        id: "1",
        imageUrl: require('@assets/skislope1.png'),
        name: "Slope 1",
        description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.",
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView style={[{ flex: 1 }, Platform.OS === "android" && { marginBottom: insets.bottom + 60 }]}>

                <Header/>

                {/* Welcome Card */}
                <Card>
                    <H1>Ski-Free</H1>
                    <SubHeading>Welcome back, Mark!</SubHeading>
                </Card>

                {/* Ski Pass Card */}
                <Card>
                    <H2>Your Ski Pass</H2>
                    {(() => {
                        if (isLoadingSkiPass) {
                            return (
                                <View style={{
                                    backgroundColor: theme.colors.surface,
                                    padding: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Paragraph>Loading ski pass...</Paragraph>
                                </View>
                            );
                        } else if (activeSkiPass) {
                            return (
                                <View style={{
                                    backgroundColor: theme.colors.surface,
                                    padding: 20,
                                    borderRadius: 12,
                                }}>
                                    <H1 style={{ textAlign: 'center', marginBottom: 8 }}>
                                        {activeSkiPass.name}
                                    </H1>
                                    <Paragraph style={{ textAlign: 'center', fontSize: 16, marginBottom: 8 }}>
                                        {activeSkiPass.skiPassType} Pass
                                    </Paragraph>
                                    <Paragraph style={{ textAlign: 'center', color: theme.colors.textSecondary }}>
                                        Valid until: {(() => {
                                            try {
                                                const endDate = new Date(activeSkiPass.endDate);
                                                if (isNaN(endDate.getTime())) {
                                                    return 'Date unavailable';
                                                }
                                                return endDate.toLocaleDateString();
                                            } catch (error) {
                                                return 'Date unavailable';
                                            }
                                        })()}
                                    </Paragraph>
                                </View>
                            );
                        } else {
                            return (
                                <Pressable onPress={() => router.push('/(tabs)/shop/skipass')}>
                                    <View style={{
                                        backgroundColor: theme.colors.surface,
                                        padding: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 12,
                                    }}>
                                        <H1>No Active Ski Pass</H1>
                                        <Paragraph style={{ marginTop: 8, textAlign: 'center' }}>
                                            Tap to purchase a ski pass
                                        </Paragraph>
                                    </View>
                                </Pressable>
                            );
                        }
                    })()}
                </Card>

                <Card>
                    <H2>Your favorite slope</H2>

                    <Pressable onPress={() => {
                        router.push("slopes")
                    }}>
                        <SlopeOverview slope={favouriteSlope}/>
                    </Pressable>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}
