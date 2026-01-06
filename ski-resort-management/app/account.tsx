import { Redirect, Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";
import H1 from "@components/text/H1";
import SubHeading from "@components/text/SubHeading";
import Paragraph from "@components/text/Paragraph";
import useTheme from "@components/ThemeContext";
import StyledButton from "@components/StyledButton";
import { auth } from "@/services/FirebaseConfig"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@components/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkiPassService from "@/services/SkiPassService";


export default function Account() {

    const theme = useTheme();
    const { user } = useContext(AuthContext)
    const [ownedSkipasses, setOwnedSkipasses] = useState([]);

    useEffect(() => {
        const fetchSkipasses = async () => {
            if (user?.uid) {
                try {
                    const skipasses = await SkiPassService.getSkiPassesByUserId(user.uid);
                    setOwnedSkipasses(skipasses);
                } catch (error) {
                    setOwnedSkipasses([]);
                }
            }
        };
        fetchSkipasses();
    }, [user?.uid]);

    const handleLogoutClick = async () => {
        await auth.signOut();
        AsyncStorage.removeItem("user");
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Account',
                    headerShown: true,
                    headerBackButtonDisplayMode: 'minimal',
                    headerStyle: {
                        backgroundColor: theme.colors.surface,
                    },
                    headerTitleStyle: {
                        color: theme.colors.text
                    },
                    headerTintColor: theme.colors.text,
                }}
            />
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Card>
                    <H1>Account</H1>
                    <SubHeading>View your account info</SubHeading>
                    <View style={{ padding: 20 }}>
                        <Paragraph style={{ marginTop: 20, textDecorationLine: 'underline', fontSize: 18 }}>Account
                            info</Paragraph>
                        <Paragraph>👤Placeholder name</Paragraph>
                        <Paragraph>🏠 Road 123, 12345 City</Paragraph>
                        <Paragraph>📧 Placeholder email</Paragraph>

                        <Paragraph style={{ marginTop: 20, textDecorationLine: 'underline', fontSize: 18 }}>Owned Skipasses</Paragraph>
                        {ownedSkipasses.length === 0 ? (
                            <Paragraph>No skipasses found.</Paragraph>
                        ) : (
                            ownedSkipasses.map((pass: any) => (
                                <Paragraph key={pass.id}>
                                    ⭐ {pass.name} - {pass.skiPassType} {new Date(pass.endDate).getTime() > Date.now() ? "(Active)" : "(Expired)"}
                                </Paragraph>
                            ))
                        )}
                    </View>
                </Card>

                <View style={{ paddingHorizontal: theme.spacing.lg }}>
                    <StyledButton onPress={handleLogoutClick}>
                        Log out
                    </StyledButton>
                </View>
            </SafeAreaView>
            { user === null && <Redirect href={"(landing)"} />}
        </>
    );
}
