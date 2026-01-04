import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Home from "../app/(tabs)/index";

jest.mock("expo-router", () => {
    const mockPush = jest.fn();
    return {
        router: { push: mockPush },
        __mockPush: mockPush,
    };
});

jest.mock("@components/ThemeContext", () => () => ({
    colors: {
        background: "#fff",
        surface: "#eee",
        tabBackground: "#fff",
        tabIndicator: "#000",
        text: "#000",
    },
    border: {},
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

jest.mock("@components/Header", () => {
    const React = require("react");
    const { View } = require("react-native");
    return function Header() {
        return <View testID="mock-header" />;
    };
});

jest.mock("@components/slopes/SlopeOverview", () => {
    const React = require("react");
    const { View, Text } = require("react-native");
    return function SlopeOverview() {
        return (
            <View testID="mock-slope-overview">
                <Text>Mock SlopeOverview</Text>
            </View>
        );
    };
});

describe("Home screen", () => {
    beforeEach(() => {
        const { __mockPush } = require("expo-router");
        __mockPush.mockClear();
    });

    it("renders home screen content", () => {
        const { getByTestId, getByText } = render(<Home />);
        expect(getByTestId("screen-home")).toBeTruthy();
        expect(getByText("Ski-Free")).toBeTruthy();
        expect(getByText("Welcome back, Mark!")).toBeTruthy();
    });

    it('navigates to "slopes" when favorite slope is pressed', () => {
        const { __mockPush } = require("expo-router");
        const { getByTestId } = render(<Home />);

        fireEvent.press(getByTestId("btn-favorite-slope"));
        expect(__mockPush).toHaveBeenCalledWith("slopes");
    });
});