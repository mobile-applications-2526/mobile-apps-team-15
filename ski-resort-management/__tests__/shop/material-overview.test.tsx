import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

// Mock Image zonder react-native volledig te require’en (vermijdt native issues)
jest.mock("react-native/Libraries/Image/Image", () => "Image");

// MaterialOverview gebruikt `router.push(...)`
jest.mock("expo-router", () => {
    const push = jest.fn();
    return {
        router: { push },
        __mocks: { push },
    };
});

// Mock H3/H4 naar plain Text
jest.mock("@components/text/H3", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return function H3({ children }: any) {
        return <Text>{children}</Text>;
    };
});

jest.mock("@components/text/H4", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return function H4({ children }: any) {
        return <Text>{children}</Text>;
    };
});

// Mock StyledButton naar TouchableOpacity
jest.mock("@components/StyledButton", () => {
    const React = require("react");
    const { Text, TouchableOpacity } = require("react-native");
    return function StyledButton({ children, onPress, disabled }: any) {
        return (
            <TouchableOpacity onPress={onPress} disabled={disabled}>
                <Text>{children}</Text>
            </TouchableOpacity>
        );
    };
});

// CartStore (MaterialOverview leest materials uit cart om button te disablen)
jest.mock("@/store/CartStore", () => ({
    useCartStore: () => ({ materials: [] }),
}));

// ThemeContext
jest.mock("@components/ThemeContext", () => () => ({
    colors: { text: "#000", textSecondary: "#666" },
    spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 },
    radius: { sm: 6, md: 10, lg: 12 },
    border: {},
    shadow: {},
    card: {},
    text: {
        H1: {},
        H2: {},
        H3: {},
        H4: {},
        subHeading: {},
        paragraph: {},
        description: {},
    },
}));


function getMaterialOverviewComponent() {
    const mod = require("../../components/shop/MaterialOverview");
    return mod?.default ?? mod?.MaterialOverview ?? mod;
}

describe("MaterialOverview", () => {
    beforeEach(() => {
        const expoRouter = require("expo-router");
        expoRouter.__mocks.push.mockClear();
    });

    it("renders name and price", () => {
        const MaterialOverview = getMaterialOverviewComponent();

        const { getByText } = render(
            <MaterialOverview
                material={{
                    id: "mat-1",
                    name: "Boots",
                    pricePerHour: 5,
                    pricePerDay: 25,
                    imageUrl: "https://example.com/boots.png",
                }}
            />
        );

        expect(getByText("Boots")).toBeTruthy();
        expect(getByText(/\$5\/hr\s*or\s*\$25\/day/i)).toBeTruthy();
        expect(getByText("View")).toBeTruthy();
    });

    it("navigates to materials/add-to-cart with id when pressing View", () => {
        const MaterialOverview = getMaterialOverviewComponent();
        const expoRouter = require("expo-router");

        const { getByText } = render(
            <MaterialOverview
                material={{
                    id: "mat-1",
                    name: "Boots",
                    pricePerHour: 5,
                    pricePerDay: 25,
                    imageUrl: "https://example.com/boots.png",
                }}
            />
        );

        fireEvent.press(getByText("View"));

        expect(expoRouter.__mocks.push).toHaveBeenCalledWith({
            pathname: "/(tabs)/shop/materials/add-to-cart",
            params: { id: "mat-1" },
        });
    });
});
