import { Pressable, Text } from "react-native";
import Card from "@components/Card";
import {router} from "expo-router";


export default function SkiPassCard({ title, price, includedList }: {
    readonly title: string,
    readonly price: number,
    readonly includedList: readonly string[]
}) {
    return (
        <Card>
            {/* Title */}
            <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 10,
                alignSelf: "center",
            }}>{title}</Text>

            {/* Price */}
            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 20,
                alignSelf: "center",
            }}>${price}/mo</Text>

            {/* Included List */}
            {includedList.map((item) => (
                <Text key={item} style={{
                    fontSize: 14,
                    color: '#666',
                    marginBottom: 5,
                }}>• {item}</Text>
            ))}

            {/* Button */}
            <Pressable onPress={() => {
                router.push({
                    pathname: "shop/skipasscheckout",
                    params: {
                        selectedSkiPassTitle: title
                    }})
            }} style={{
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
                }}>Button</Text>
            </Pressable>
        </Card>
    )
}
