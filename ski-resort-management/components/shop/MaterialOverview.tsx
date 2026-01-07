import { Image } from "react-native";
import H4 from "@components/text/H4";
import H3 from "@components/text/H3";
import useTheme from "@components/ThemeContext";
import { router } from "expo-router";
import { Material } from "@constants/types";
import StyledButton from "@components/StyledButton";
import { useCartStore } from "@/store/CartStore";


type MaterialOverviewProps = {
    material: Material;
};

export default function MaterialOverview({ material }: Readonly<MaterialOverviewProps>) {

    const theme = useTheme();

    const { materials: cartMaterials } = useCartStore();

    return (
        <>
            <Image source={{ uri: material.imageUrl }} style={{
                width: "100%",
                height: 120,
                borderRadius: 12,
                marginBottom: 8,
                backgroundColor: "#f3f3f3",
            }}/>
            <H4>{material.name}</H4>

            <H3 style={{ marginTop: 8, color: theme.colors.textSecondary }}>${material.pricePerHour}/hr or
                ${material.pricePerDay}/day</H3>

            <StyledButton style={{marginBottom: 0}} onPress={() => router.push({
                pathname: "/(tabs)/shop/materials/add-to-cart",
                params: { id: material.id }
            })} primary
            disabled={cartMaterials.some(cartMaterial => cartMaterial.id === material.id)}>
                {cartMaterials.some(cartMaterial => cartMaterial.id === material.id) ? "Added!" : "View"}
            </StyledButton>
        </>
    )
}
