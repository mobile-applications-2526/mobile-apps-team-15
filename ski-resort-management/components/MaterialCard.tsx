import { Pressable, Text, Image } from "react-native";
import Card from "@components/Card";
import {router} from "expo-router";


export default function MaterialCard({ name, pricePerHour, pricePerDay, size }: {
    readonly name: string,
    readonly pricePerHour: number,
    readonly pricePerDay: number,
    readonly size: string
}) {
    return (
        <Card marginY={0} marginX={0} paddingY={10} paddingX={10} shadow={false} border>
            {/* Title */}
            <Image source={require("@assets/material.svg")} style={{
                width: "100%",
                height: 120,
                borderRadius: 8,
                marginBottom: 12,
                backgroundColor: "#f3f3f3",
            }} />
            <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 10,
            }}>{name}</Text>

            {/* Price */}
            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 15,
            }}>${pricePerHour}/hr or ${pricePerDay}/day</Text>

            {/* Size */}
            <Text style={{
                fontSize: 14,
                color: '#666',
                marginBottom: 5,
            }}>Size: {size}</Text>

            {/* Button */}
            <Pressable
                onPress={() =>
                    router.push({
                        pathname: "/(tabs)/shop/add-to-cart",
                        params: {
                            name,
                            pricePerHour: String(pricePerHour),
                            pricePerDay: String(pricePerDay),
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
        </Card>
    )
}
