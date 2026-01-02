import { Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import Header from "@components/Header";
import SlopeOverview from "@components/slopes/SlopeOverview";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@components/Card";
import H1 from "@components/text/H1";
import SubHeading from "@components/text/SubHeading";
import useTheme from "@components/ThemeContext";
import H2 from "@components/text/H2";
import { Slope } from "@constants/types";


export default function Index() {

    const theme = useTheme();

    const favouriteSlope: Slope = {
        id: "1",
        imageUrl: require('@assets/skislope1.png'),
        name: "Slope 1",
        description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.",
    }


    return (
        <SafeAreaView testID="screen-home" style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ScrollView style={{ flex: 1 }}>

                <Header/>

                {/* Welcome Card */}
                <Card>
                    <H1>Ski-Free</H1>
                    <SubHeading>Welcome back, Mark!</SubHeading>
                </Card>

                {/* Ski Pass Card */}
                <Card>
                    <View style={{
                        backgroundColor: theme.colors.surface,
                        padding: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <H1>Ski pass</H1>
                    </View>
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
