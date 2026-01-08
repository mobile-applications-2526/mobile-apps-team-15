import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";
import H1 from "@components/text/H1";
import useTheme from "@components/ThemeContext";
import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";
import StyledLink from "@components/StyledLink";
import Paragraph from "@components/text/Paragraph";
import { AuthContext } from "@components/AuthContext";


export default function Index() {

    const theme = useTheme();
    const {user, loading} = useContext(AuthContext);

    if (!loading && user) return (
        <Redirect href={"(tabs)"}/>
    )

    return (
        <>
            <Stack.Screen options={{title: "Landing", headerShown: false}}/>
            <SafeAreaView
                style={{flex: 1, backgroundColor: theme.colors.background, justifyContent: "center"}}
                testID="landing-screen"
                >
                <Card>
                    {/*<Image source={require('@assets/logo.png')}/>*/}
                    <H1 style={{textAlign: "center"}}>Welcome!</H1>
                </Card>

                <View style={{marginTop: theme.spacing.lg, paddingHorizontal: theme.spacing.lg}}>
                    <StyledLink href={"(landing)/login"} accessibilityLabel={"Log in"} primary testID="login-button">Log in</StyledLink>
                    <Paragraph style={{textAlign: "center", color: theme.colors.textSecondary}}>— or —</Paragraph>
                    <StyledLink href={"(landing)/register"} accessibilityLabel={"Register"} testID="register-button">Register</StyledLink>
                </View>
            </SafeAreaView>
        </>
    );
}
