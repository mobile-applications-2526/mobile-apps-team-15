import { Platform, ScrollView } from "react-native"
import SkiPassOverview from "@components/shop/SkiPassOverview"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack, useFocusEffect } from "expo-router";
import Card from "@components/Card";
import useTheme from "@components/ThemeContext";
import H1 from "@components/text/H1";
import { useCallback, useContext, useState } from "react";
import SubHeading from "@components/text/SubHeading";
import StyledButton from "@/components/StyledButton";
import { AuthContext } from "@components/AuthContext";
import SkiPassService from "@/services/SkiPassService";


export default function SkiPass() {
    const [passType, setPassType] = useState<'day' | 'week'>('day');
    const [hasActiveSkiPass, setHasActiveSkiPass] = useState(false);
    const { user } = useContext(AuthContext);

    const theme = useTheme();
    const safeAreaInsets = useSafeAreaInsets();

    const checkActiveSkiPass = useCallback(async () => {
        if (!user?.uid) {
            setHasActiveSkiPass(false);
            return;
        }
        try {
            const skipasses = await SkiPassService.getCurrentSkiPassByUserId(user.uid);
            setHasActiveSkiPass(skipasses.length > 0);
        } catch (error) {
            console.error('Failed to check active ski pass:', error);
            setHasActiveSkiPass(false);
        }
    }, [user?.uid]);

    useFocusEffect(
        useCallback(() => {
            checkActiveSkiPass();
        }, [checkActiveSkiPass])
    );

    const skipasscards = [
            {
                title: "Gold",
                price: 30,
                includedList: [
                    "Access to all slopes",
                    "Free equipment rental",
                    "VIP lounge access",
                    "Free ski lessons"
                ]
            },
            {
                title: "Silver",
                price: 20,
                includedList: [
                    "Allowed in domain 1 to 3",
                    "Free drinks at the ski resort bars"
                ]
            },
            {
                title: "Bronze",
                price: 10,
                includedList: [
                    "Access to beginner slopes",
                    "Equipment rental discount",
                    "Basic parking"
                ]
            }
    ]

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Ski Passes',
                    headerShown: true,
                    headerStyle: { backgroundColor: theme.colors.surface },
                    headerTitleStyle: { color: theme.colors.text },
                    headerTintColor: theme.colors.text,
                }}
            />

            <ScrollView testID = "screen-shop-skipass" style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={Platform.OS === "android" ? { paddingBottom: safeAreaInsets.bottom + 80 } : null } >
                <Card>
                    <H1>Ski Passes</H1>
                    <SubHeading>Get your ski pass</SubHeading>
                </Card>
                <Card style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 8, gap: 4 }}>
                    <StyledButton
                        onPress={() => setPassType('day')}
                        primary={passType === 'day'}
                        style={{ marginRight: 8 }}
                    >
                        Day Pass
                    </StyledButton>
                    <StyledButton
                        onPress={() => setPassType('week')}
                        primary={passType === 'week'}
                    >
                        Week Pass
                    </StyledButton>
                </Card>

                {skipasscards.map((card) => (
                    <Card key={card.title}>
                        <SkiPassOverview
                            title={card.title}
                            price={passType === 'day' ? card.price : card.price * 6}
                            includedList={card.includedList}
                            passType={passType}
                            hasActiveSkiPass={hasActiveSkiPass}
                        />
                    </Card>
                ))}
            </ScrollView>
        </>
    )
}
