import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import Card from "@components/Card";
import { View } from "react-native";
import H3 from "@components/text/H3";
import H1 from "@components/text/H1";
import Description from "@components/text/Description";
import useTheme from "@components/ThemeContext";
import StyledButton from "@components/StyledButton";
import SkiPassService from "@/services/SkiPassService";
import { SkiPassType, SkiPassRequestDto } from "@constants/types";
import { AuthContext } from "@components/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleSkiPassExpiryNotification, requestNotificationPermissions } from "@/services/NotificationService";

export default function SkiPassCheckout() {
    const theme = useTheme();
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const [isProcessing, setIsProcessing] = useState(false);

    const { title, price, passType } = useLocalSearchParams();
    //Use this param to lookup skipass price

    const askForNotificationPermission = async () => {
        console.log('=== Starting notification permission flow ===');
        
        const granted = await requestNotificationPermissions();
        console.log('Permission result:', granted);
        
        if (granted) {
            const notificationTime = new Date(Date.now() + (61 * 60 * 1000)); //Normaal passeren we hier de expiryDate van de SkiPass, maar voor testing 1 minuut in de toekomst.
            scheduleSkiPassExpiryNotification(notificationTime);
            await AsyncStorage.setItem('user_notification_permission_asked', 'true');
        } else {            
            const hasAsked = await AsyncStorage.getItem('user_notification_permission_asked');
            
            if (hasAsked === 'true') {
                return;
            }
            
            
            const secondAttempt = await requestNotificationPermissions();
            if (secondAttempt) {
                const notificationTime = new Date(Date.now() + (61 * 60 * 1000));
                scheduleSkiPassExpiryNotification(notificationTime);
            } else {
                console.log('Second attempt also denied');
            }
            
            await AsyncStorage.setItem('user_notification_permission_asked', 'true');
        }
    };


    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Ski-Pass Checkout',
                    headerShown: true,
                    headerBackButtonDisplayMode: 'minimal',
                    headerStyle: { backgroundColor: theme.colors.surface },
                    headerTitleStyle: { color: theme.colors.text },
                    headerTintColor: theme.colors.text,
                }}
            />

            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Card>
                    <H3 style={{ marginTop: 10, alignSelf: "center" }}>Summary</H3>
                    <H1 style={{ marginTop: 5, alignSelf: "center", }}>${price}</H1>
                    <Description style={{ fontSize: 18, marginTop: 20 }}>
                        You'll pay once in the app. Your subscription renews automatically each month until cancelled.
                    </Description>
                    <StyledButton
                        onPress={async () => {
                            if (!user || !title || !passType) {
                                console.error('Missing required data for ski pass purchase');
                                return;
                            }

                            setIsProcessing(true);
                            try {
                                const endDate = new Date();
                                if (passType === 'week') {
                                    endDate.setDate(endDate.getDate() + 7);
                                } else {
                                    endDate.setDate(endDate.getDate() + 1);
                                }

                                let skiPassType: SkiPassType;
                                switch (title.toString().toUpperCase()) {
                                    case 'GOLD':
                                        skiPassType = SkiPassType.GOLD;
                                        break;
                                    case 'SILVER':
                                        skiPassType = SkiPassType.SILVER;
                                        break;
                                    case 'BRONZE':
                                        skiPassType = SkiPassType.BRONZE;
                                        break;
                                    default:
                                        skiPassType = SkiPassType.BRONZE;
                                }

                                const skiPassRequest: SkiPassRequestDto = {
                                    name: `${title} ${passType} Pass`,
                                    skiPassType,
                                    userId: user.uid,
                                    endDateTime: endDate
                                };

                                await SkiPassService.postSkiPass(skiPassRequest);
                                
                                // Ask for notification permissions after successful purchase
                                await askForNotificationPermission();
                                
                                router.replace("/(tabs)/shop/payment-complete");
                            } catch (error) {
                                console.error('Failed to create ski pass:', error);
                            } finally {
                                setIsProcessing(false);
                            }
                        }}
                        style={{ marginBottom: 12 }}
                        disabled={isProcessing || !user}
                    >
                        {isProcessing ? 'Processing...' : 'Pay'}
                    </StyledButton>
                </Card>
            </View>
        </>
    )
}
