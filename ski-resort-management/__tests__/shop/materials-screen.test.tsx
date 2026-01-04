import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MaterialsScreen from "../../app/(tabs)/shop/materials";

// Mock Stack.Screen (we don't need navigation header behavior in unit tests)
jest.mock("expo-router", () => ({
    Stack: { Screen: () => null },
}));

// Mock safe area insets so paddingBottom doesn't crash
jest.mock("react-native-safe-area-context", () => ({
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock theme for Card + text components
jest.mock("@components/ThemeContext", () => () => ({
    colors: { background: "#fff", surface: "#eee", text: "#000", textSecondary: "#666" },
    border: {},
    shadow: {},
    card: {},
    spacing: { sm: 8 },
    list: { listItem: {} },
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

// Mock MaterialOverview to keep this test focused on "screen behavior" (filtering / list)
jest.mock("@components/shop/MaterialOverview", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return function MaterialOverview(props: any) {
        return <Text>{props.name}</Text>;
    };
});

describe("Materials screen", () => {
    // Tests that the screen renders and shows all materials by default
    it("renders all materials initially", () => {
        const { getByTestId, getByText } = render(<MaterialsScreen />);

        expect(getByTestId("screen-shop-materials")).toBeTruthy();
        expect(getByText("Boots")).toBeTruthy();
        expect(getByText("Jacket")).toBeTruthy();
        expect(getByText("Pants")).toBeTruthy();
        expect(getByText("Skis")).toBeTruthy();
    });

    // Tests that typing in search filters the materials list
    it("filters materials using search input", () => {
        const { getByPlaceholderText, queryByText } = render(<MaterialsScreen />);

        fireEvent.changeText(getByPlaceholderText("Search"), "Jacket");

        expect(queryByText("Jacket")).toBeTruthy();
        expect(queryByText("Boots")).toBeNull();
        expect(queryByText("Pants")).toBeNull();
        expect(queryByText("Skis")).toBeNull();
    });
});
