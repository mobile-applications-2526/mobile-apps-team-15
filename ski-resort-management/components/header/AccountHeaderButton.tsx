import React from "react";
import HeaderButton from "@components/header/HeaderButton";


export default function AccountHeaderButton() {
    return (
        <HeaderButton
            href={"account"}
            accessibilityLabel={"Account"}
            iconName={"user-large"}
            testID="account-button"
        />
    );
}

