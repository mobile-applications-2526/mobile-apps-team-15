import React from "react";
import { render } from "@testing-library/react-native";
import SkiPassScreen from "../../app/(tabs)/shop/skipass";

// Mock Stack.Screen
jest.mock("expo-router", () => ({
    Stack: { Screen: () => null },
}));

// Mock safe area insets
jest.mock("react-native-safe-area-context", () => ({
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock theme
jest.mock("@components/ThemeContext", () => () => ({
    colors: { background: "#fff", surface: "#eee", text: "#000", textSecondary: "#666" },
    border: {},
    shadow: {},
    card: {},
    divider: {},
    spacing: { sm: 8 },
    list: { listItem: {} },
    text: { H1: {}, H2: {}, H3: {}, H4: {}, subHeading: {}, paragraph: {}, description: {} },
}));

// Mock SkiPassOverview so this test focuses on screen rendering + list content
jest.mock("@components/shop/SkiPassOverview", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return function SkiPassOverview(props: any) {
        return <Text>{props.title}</Text>;
    };
});

describe("SkiPass screen", () => {
    // Tests that the screen renders and shows all available ski passes
    it("renders all ski passes", () => {
        const { getByTestId, getByText } = render(<SkiPassScreen />);

        expect(getByTestId("screen-shop-skipass")).toBeTruthy();

        expect(getByText("Gold")).toBeTruthy();
        expect(getByText("Basic")).toBeTruthy();
        expect(getByText("Premium")).toBeTruthy();
        expect(getByText("Family")).toBeTruthy();
    });
});
