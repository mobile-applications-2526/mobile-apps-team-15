import Card from "@components/Card";
import H2 from "@components/text/H2";
import { View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { SkiPass } from "@/types";
import SkiPassService from "@/services/SkiPassService";
import StyledButton from "@components/StyledButton";
import Description from "@components/text/Description";
import Paragraph from "@components/text/Paragraph";
import H1 from "@components/text/H1";
import useTheme from "@components/ThemeContext";
import { User } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";

type SkiPassCardProps = {
    user: User
}

export default function SkiPassCard({ user }: Readonly<SkiPassCardProps>) {

    const theme = useTheme();

    const [activeSkiPass, setActiveSkiPass] = useState<SkiPass | null>(null);
    const [isLoadingSkiPass, setIsLoadingSkiPass] = useState(false);

    const fetchActiveSkiPass = useCallback(async () => {
        if (!user?.uid) {
            setActiveSkiPass(null);
            return;
        }

        setIsLoadingSkiPass(true);
        try {
            const skipasses = await SkiPassService.getCurrentSkiPassByUserId(user.uid);
            setActiveSkiPass(skipasses.length > 0 ? skipasses[0] : null);
        } catch (error) {
            console.error('Failed to fetch active ski pass:', error);
        } finally {
            setIsLoadingSkiPass(false);
        }
    }, [user?.uid]);

    useFocusEffect(
        useCallback(() => {
            fetchActiveSkiPass();
        }, [fetchActiveSkiPass])
    );

    return (
        <Card>
            <H2>Your Ski Pass</H2>
            {isLoadingSkiPass && (
                <View style={{
                    backgroundColor: theme.colors.surface,
                    padding: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Paragraph>Loading ski pass...</Paragraph>
                </View>
            )}
            {activeSkiPass && (
                <LinearGradient
                    colors={
                    activeSkiPass.skiPassType === "GOLD"
                        ? ['#bfae4f', '#fffbe6', '#ffe066', '#bfae4f']
                        : activeSkiPass.skiPassType === "SILVER"
                        ? ['#aaa', '#eee', '#ccc', '#aaa']
                        : ['#ad7a50', '#fff2e0', '#cd7f32', '#ad7a50']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                    padding: 20,
                    borderRadius: 12,
                    marginBottom: 10,
                    marginTop: 10
                    }}
                >
                    <H1 style={{ textAlign: 'center', marginBottom: 8 }}>
                        {activeSkiPass.name}
                    </H1>
                    <Paragraph style={{ textAlign: 'center', fontSize: 16, marginBottom: 8 }}>
                        {activeSkiPass.skiPassType} Pass
                    </Paragraph>
                    <Paragraph style={{ textAlign: 'center', color: theme.colors.textSecondary }}>
                        {new Date(activeSkiPass.endDate).toLocaleDateString()}
                    </Paragraph>
                </LinearGradient>
            )}
            {!isLoadingSkiPass && !activeSkiPass && (<>
                    <Description style={{ textAlign: "center", paddingTop: theme.spacing.lg }}>No active ski
                        pass
                        yet</Description>
                    <StyledButton primary onPress={() => router.push('/(tabs)/shop/skipass')}>
                        Purchase Ski Pass
                    </StyledButton>
                </>
            )}
        </Card>
    );
}
