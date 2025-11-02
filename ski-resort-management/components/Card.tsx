import { View } from "react-native";
import { ReactNode } from "react";

interface CardProps {
    readonly children?: ReactNode;
    readonly marginX?: number;
    readonly marginY?: number;
}

export default function Card({ children, marginX = 20, marginY = 20 }: CardProps) {
    return (
        <View style={{
            backgroundColor: '#fff',
            marginLeft: marginX,
            marginRight: marginX,
            marginTop: marginY,
            marginBottom: marginY,
            padding: 20,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        }} >
            {children}
        </View>
    );
}
