import { View } from "react-native";
import { ReactNode } from "react";


interface CardProps {
    readonly children?: ReactNode;
    readonly marginX?: number;
    readonly marginY?: number;
    readonly paddingX?: number;
    readonly paddingY?: number;
    readonly border?: boolean;
    readonly shadow?: boolean;
}

export default function Card({ children, marginX = 20, marginY = 20, paddingX = 20, paddingY = 20, shadow = true, border }: CardProps) {
    return (
        <View style={{
            backgroundColor: '#fff',
            marginLeft: marginX,
            marginRight: marginX,
            marginTop: marginY,
            marginBottom: marginY,
            paddingLeft: paddingX,
            paddingRight: paddingX,
            paddingTop: paddingY,
            paddingBottom: paddingY,
            borderRadius: 12,
            ...(shadow && {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            }),
            ...(border && {
                borderWidth: 1,
                borderColor: "#e0e0e0",
            })
        }}>
            {children}
        </View>
    );
}
