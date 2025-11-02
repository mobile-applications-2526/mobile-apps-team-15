import { router, Stack } from 'expo-router'
import { Pressable, Text } from "react-native";

export default function StackLayout(){
    return (
        <Stack screenOptions={{ headerShown: false }} />
        );
}
