import { View, Text, Image } from "react-native";

export default function SlopeCard({ imageUrl, name, description }: { imageUrl: any; name: string; description?: string }) {
    return (
        <View>
                           
                {/* Inner content container with border */} 
                <View style={{
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 8,
                padding: 15,
                }}>
                {/* Slope Image */}
                <Image
                    source={imageUrl}
                    style={{
                    width: '100%',
                    height: 120,
                    borderRadius: 8,
                    marginBottom: 15,
                    }}
                />
                {/* Title */}
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: 8,
                }}>{name}</Text>
                
                {/* Description */}
                <Text style={{
                    fontSize: 14,
                    color: '#666',
                    lineHeight: 20,
                }}>{description}</Text>
                </View>
        </View>
    )}