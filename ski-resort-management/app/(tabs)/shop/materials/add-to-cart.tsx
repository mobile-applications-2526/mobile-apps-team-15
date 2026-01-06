import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Image, View } from "react-native";
import Card from "@components/Card";
import React, { useEffect, useState } from "react";
import Paragraph from "@components/text/Paragraph";
import H2 from "@components/text/H2";
import SubHeading from "@components/text/SubHeading";
import useTheme from "@components/ThemeContext";
import StyledButton from "@components/StyledButton";
import { Material } from "@/types";
import { CartMaterial, useCartStore } from "@/store/CartStore";
import materialService from "@/services/MaterialService";
import ErrorPopup from "@components/ErrorPopup";


export default function AddToCart() {

    const router = useRouter();
    const theme = useTheme();

    const { addMaterial, duration, durationType } = useCartStore()

    const { id } = useLocalSearchParams<{ id: string; }>();

    const [material, setMaterial] = useState<Material | null>();
    const [total, setTotal] = useState(0);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (!id) return;
        materialService.getMaterialById(id)
            .then(material => setMaterial(material))
            .catch(error => setError(error.message));
    }, [id])

    useEffect(() => {
        if (!material) return;
        setTotal(durationType === "hours" ? material.pricePerHour * duration : material.pricePerDay * duration)
    }, [material, duration, durationType]);

    function handleAddToCart() {
        const cartMaterial: CartMaterial = {
            ...material, total
        }
        addMaterial(cartMaterial)
        router.back();
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Materials',
                    headerShown: true,
                    headerBackButtonDisplayMode: 'minimal',
                    headerStyle: { backgroundColor: theme.colors.surface },
                    headerTitleStyle: { color: theme.colors.text },
                    headerTintColor: theme.colors.text,
                }}
            />
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                { material && <Card>
                    <H2 style={{ marginBottom: 6 }}>
                        {material.name}
                    </H2>
                    <Image source={{ uri: material.imageUrl }} style={{
                        width: "100%",
                        height: 200,
                        borderRadius: 12,
                        marginBottom: 8,
                        backgroundColor: "#f3f3f3",
                    }}/>
                    <SubHeading style={{ marginTop: theme.spacing.lg, marginBottom: theme.spacing.sm }}>
                        Pricing
                    </SubHeading>

                    <View style={{ padding: 12, ...theme.border }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Paragraph style={{ marginBottom: 8 }}>Price per hour:</Paragraph><Paragraph
                            style={{ fontWeight: "600" }}>${material.pricePerHour}</Paragraph>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Paragraph>Price per day:</Paragraph><Paragraph
                            style={{ fontWeight: "600" }}>${material.pricePerDay}</Paragraph>
                        </View>
                    </View>
                    <StyledButton style={{marginTop: theme.spacing.lg}} onPress={handleAddToCart} primary>Add to cart</StyledButton>
                </Card> }
            </View>
            { error && <ErrorPopup message={error.message}/> }
        </>
    );
}
