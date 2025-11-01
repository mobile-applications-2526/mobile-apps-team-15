import { Text, View, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";



export default function Header({ title }: { title: string }) {
    return (
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingTop: 60,
                paddingBottom: 20,
                backgroundColor: '#fff',
              }}>
                <Text style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: '#000',
                }}>{title}</Text>
                <Pressable
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#e0e0e0',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => router.push('account')}
                >
                  <Text style={{ fontSize: 20 }}>👤</Text>
                </Pressable>
              </View>
        )
    }