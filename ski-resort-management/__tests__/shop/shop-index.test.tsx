import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ShopIndex from "../../app/(tabs)/shop/index";

// Mock expo-router + expose push so we can assert navigation
jest.mock("expo-router", () => {
    const mockPush = jest.fn();
    return {
        router: { push: mockPush },
        __mockPush: mockPush,
    };
});

// Mock theme so UI components (Card, Paragraph, etc.) don't crash
jest.mock("@components/ThemeContext", () => () => ({
    colors: { background: "#fff", surface: "#eee", text: "#000" },
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

// Mock Header so it doesn't pull in extra dependencies
jest.mock("@components/Header", () => {
    const React = require("react");
    const { View } = require("react-native");
    return function Header() {
        return <View testID="mock-header" />;
    };
});

describe("Shop Index screen", () => {
    beforeEach(() => {
        const { __mockPush } = require("expo-router");
        __mockPush.mockClear();
    });

    // Tests that the Shop screen renders and shows the expected navigation items
    it("renders Shop screen and navigation items", () => {
        const { getByTestId, getByText } = render(<ShopIndex />);

        expect(getByTestId("screen-shop")).toBeTruthy();
        expect(getByText("Shop")).toBeTruthy();
        expect(getByText("Ski Passes")).toBeTruthy();
        expect(getByText("Materials")).toBeTruthy();
    });

    // Tests that pressing "Materials" triggers navigation to shop/materials
    it("navigates to Materials when pressed", () => {
        const { __mockPush } = require("expo-router");
        const { getByText } = render(<ShopIndex />);

        fireEvent.press(getByText("Materials"));
        expect(__mockPush).toHaveBeenCalledWith("shop/materials");
    });

    // Tests that pressing "Ski Passes" triggers navigation to shop/skipass
    it("navigates to Ski Passes when pressed", () => {
        const { __mockPush } = require("expo-router");
        const { getByText } = render(<ShopIndex />);

        fireEvent.press(getByText("Ski Passes"));
        expect(__mockPush).toHaveBeenCalledWith("shop/skipass");
    });
});
