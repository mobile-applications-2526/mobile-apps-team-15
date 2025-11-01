import { Text, View, Pressable } from "react-native";

export default function SkiPassCard({title, price, includedList}: {readonly title: string, readonly price: number, readonly includedList: readonly string[]}) {
    return (
            <View style={{
                backgroundColor: '#fff',
                margin: 20,
                padding: 20,
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            }}>
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
            </View>
    )
}