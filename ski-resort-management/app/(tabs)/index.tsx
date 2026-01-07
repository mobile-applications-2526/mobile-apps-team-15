import { Platform, ScrollView } from "react-native";
import Header from "@components/header/Header";
import SlopeOverview from "@components/slopes/SlopeOverview";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "@components/Card";
import H1 from "@components/text/H1";
import SubHeading from "@components/text/SubHeading";
import useTheme from "@components/ThemeContext";
import H2 from "@components/text/H2";
import React, { useContext } from "react";
import { AuthContext } from "@components/AuthContext";
import SkiPassCard from "@components/SkiPassCard";
import { useUserStore } from "@/store/UserStore";
import { useFavoriteSlopeStore } from "@/store/FavoriteSlopeStore";
import StyledLink from "@components/StyledLink";
import Description from "@components/text/Description";


export default function Index() {

    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const { user } = useContext(AuthContext);
    const { user: backEndUser } = useUserStore()
    const { favoriteSlope } = useFavoriteSlopeStore()



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView style={[{ flex: 1 }, Platform.OS === "android" && { marginBottom: insets.bottom + 60 }]}>

                <Header/>

                {/* Welcome Card */}
                <Card>
                    <H1>Ski-Free</H1>
                    {backEndUser && <SubHeading>Welcome back, {backEndUser.firstName}!</SubHeading> }
                </Card>

                <SkiPassCard user={user}/>

                <Card>
                    <H2 style={{paddingBottom: theme.spacing.md}}>Your favorite slope</H2>
                    {favoriteSlope === null && (<>
                        <Description style={{ textAlign: "center" }}>No favorite slope yet</Description>
                        <StyledLink href={"(tabs)/slopes"}>See
                        slopes</StyledLink>
                    </>)}
                    {!!(favoriteSlope) && <SlopeOverview slope={favoriteSlope} expanded/>}
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}
