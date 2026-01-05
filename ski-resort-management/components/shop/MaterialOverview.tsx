import { Image, Pressable, Text } from "react-native";
import H4 from "@components/text/H4";
import H3 from "@components/text/H3";
import useTheme from "@components/ThemeContext";
import { router } from "expo-router";
import { Material } from "@/types";


type MaterialOverviewProps = {
    material: Material;
};

export default function MaterialOverview({material}: Readonly<MaterialOverviewProps>) {

    const theme = useTheme();

    return (
        <>
            <Image source={{uri: material.imageUrl}} style={{
                width: "100%",
                height: 120,
                borderRadius: 12,
                marginBottom: 8,
                backgroundColor: "#f3f3f3",
            }}/>
            <H4>{material.name}</H4>

            <H3 style={{marginTop: 8, color: theme.colors.textSecondary}}>${material.pricePerHour}/hr or
                ${material.pricePerDay}/day</H3>

            <Pressable
                accessibilityRole={"button"}
                onPress={() =>
                    router.push({
                        pathname: "/(tabs)/shop/add-to-cart",
                        params: {
                            name: material.name,
                            pricePerHour: String(material.pricePerHour),
                            pricePerDay: String(material.pricePerDay),
                        },
                    })
                }
                style={{
                    backgroundColor: '#333',
                    padding: 15,
                    borderRadius: 8,
                    marginTop: 20,
                    alignItems: 'center',
                }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: '600',
                }}>Add to cart</Text>
            </Pressable>
        </>
    )
}
