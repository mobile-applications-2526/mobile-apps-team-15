import { Text, View, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";



export default function Header() {
    return (
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingTop: 60,
                paddingBottom: 20,
                backgroundColor: '#fff',
              }}>
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