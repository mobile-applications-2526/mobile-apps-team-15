import React from "react";
import HeaderButton from "@components/header/HeaderButton";


export default function MaterialCartHeaderButton() {
    return (
        <HeaderButton href={"/(tabs)/shop/materials/cart"} accessibilityLabel={"Cart"} iconName={"basket-shopping"}/>
    )
}

