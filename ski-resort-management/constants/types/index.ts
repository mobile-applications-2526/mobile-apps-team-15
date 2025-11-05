import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";


export type Slope = {
    id: string;
    name: string;
    description?: string;
    imageUrl: any;
    weather?: WeatherInfo;
};

export type WeatherInfo = {
    windKmh?: number | null;
    snowQuality?: string | null;
    visibility?: string | null;
    busyness?: string | null;
};

export type HeadingProps = {
    readonly children?: ReactNode;
    readonly style?: StyleProp<TextStyle>;
}
