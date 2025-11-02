import React from "react";
import { Icon, Label, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function TabsLayout() {
    return (
        <React.Fragment>
            <NativeTabs>
                <NativeTabs.Trigger name={"index"} >
                    <Label>Home</Label>
                    <Icon src={<VectorIcon family={FontAwesome6} name={"house"} />} />
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name={"slopes/index"} >
                    <Label>Slopes</Label>
                    <Icon src={<VectorIcon family={FontAwesome6} name={"person-skiing"} />} />
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name={"shop"} >
                    <Label>Shop</Label>
                    <Icon src={<VectorIcon family={FontAwesome6} name={"basket-shopping"} />} />
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name={"qrcode/index"} >
                    <Label>QR Code</Label>
                    <Icon src={<VectorIcon family={FontAwesome6} name={"qrcode"} />} />
                </NativeTabs.Trigger>
            </NativeTabs>
        </React.Fragment>
        );
}
