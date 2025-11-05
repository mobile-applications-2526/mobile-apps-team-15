import { Pressable, View } from "react-native";
import { router } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";


export default function Header() {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 20,
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
                <FontAwesome6 name={"user-large"} size={24} color={"black"}/>
            </Pressable>
        </View>
    )
}
