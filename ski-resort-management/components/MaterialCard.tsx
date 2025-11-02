import { Pressable, Text } from "react-native";
import Card from "@components/Card";


export default function MaterialCard({ title, pricePerHour, pricePerDay, size }: {
    readonly title: string,
    readonly pricePerHour: number,
    readonly pricePerDay: number,
    readonly size: string
}) {
    return (
        <Card>
            {/* Title */}
            <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 10,
            }}>{title}</Text>

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
            <Pressable style={{
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
