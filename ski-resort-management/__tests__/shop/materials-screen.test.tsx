import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import  MaterialsScreen  from "../../app/(tabs)/shop/materials/index";

jest.mock(
    "@react-native-async-storage/async-storage",
    () => require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("swr", () => {
    return () => ({
        data: [
            { id: "1", name: "Boots" },
            { id: "2", name: "Jacket" },
            { id: "3", name: "Pants" },
            { id: "4", name: "Skis" },
        ],
        isLoading: false,
        error: null,
    });
});

// Mock Stack.Screen (we don't need navigation header behavior in unit tests)
jest.mock("expo-router", () => ({
    Stack: { Screen: () => null },
}));

jest.mock("@components/header/MaterialCartHeaderButton", () => () => null);

// Mock safe area insets so paddingBottom doesn't crash
jest.mock("react-native-safe-area-context", () => ({
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock theme for Card + text components
jest.mock("@components/ThemeContext", () => () => ({
    colors: {
        background: "#fff",
        surface: "#eee",
        text: "#000",
        textSecondary: "#666",
        textInputBackground: "#f5f5f5",
        textPlaceholder: "#999",
    },
    border: {},
    shadow: {},
    card: {},
    divider: {},
    spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 },
    radius: { sm: 6, md: 10, lg: 12 },
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
        return <Text>{props.material?.name}</Text>;
    };
});

describe("Materials screen", () => {
    // Tests that the screen renders and shows all materials by default
    it("renders all materials initially", () => {
        const { getByText } = render(<MaterialsScreen />);

        expect(getByText("Materials")).toBeTruthy();
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
