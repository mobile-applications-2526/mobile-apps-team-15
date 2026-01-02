import { ScrollView } from "react-native";
import Header from "@components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListNavigationCard } from "@components/shop/ListNavigationCard";
import Card from "@components/Card";
import useTheme from "@components/ThemeContext";
import H1 from "@components/text/H1";


export default function Index() {

    const theme = useTheme();

    return (
        <SafeAreaView testID="screen-shop" style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Header/>
            <ScrollView style={{ flex: 1 }}>
                <Card>
                    <H1>Shop</H1>
                </Card>
                <ListNavigationCard
                    items={[
                        { title: "Ski Passes", route: "shop/skipass" },
                        { title: "Materials", route: "shop/materials" },
                    ]}/>
            </ScrollView>
        </SafeAreaView>
    );
}
