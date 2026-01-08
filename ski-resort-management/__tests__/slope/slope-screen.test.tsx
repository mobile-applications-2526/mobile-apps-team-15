import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SlopesScreen from "../../app/(tabs)/slopes";

jest.mock(
    "@react-native-async-storage/async-storage",
    () => require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Mock SWR so we don't hit the real back-end in unit tests
jest.mock("swr", () => {
    return () => ({
        data: [
            { id: "1", slopeName: "Bluebird Ridge" },
            { id: "2", slopeName: "Eagle Pass" },
            { id: "3", slopeName: "Glacier Line" },
        ],
        isLoading: false,
        error: null,
    });
});

// Theme mock: voldoende props voor Card + text components
jest.mock("@components/ThemeContext", () => () => ({
    colors: {
        background: "#fff",
        surface: "#eee",
        text: "#000",
        tabBackground: "#fff",
        tabIndicator: "#000",
        textInputBackground: "#f5f5f5",
        textPlaceholder: "#999",
    },
    border: {},
    shadow: {},
    card: {},
    divider: {},
    list: { listItem: {} },
    spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 },
    radius: { sm: 6, md: 10, lg: 12 },
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

// Maak Header simpel
jest.mock("@components/header/Header", () => {
    const React = require("react");
    const { View } = require("react-native");
    return function Header() {
        return <View testID="mock-header" />;
    };
});

// Mock SlopeOverview so we can test expand/collapse deterministically
jest.mock("@components/slopes/SlopeOverview", () => {
    const React = require("react");
    const { Pressable, Text, View } = require("react-native");
    return function SlopeOverview({ slope, expanded, onToggle }: any) {
        return (
            <View>
                <Pressable onPress={onToggle}>
                    <Text>{slope.slopeName}</Text>
                </Pressable>
                {expanded ? <Text>Weather</Text> : null}
            </View>
        );
    };
});

describe("Slopes screen", () => {
    it("renders screen and all slopes initially", () => {
        const { getByTestId, getByText } = render(<SlopesScreen />);

        expect(getByTestId("screen-slopes")).toBeTruthy();
        expect(getByText("Bluebird Ridge")).toBeTruthy();
        expect(getByText("Eagle Pass")).toBeTruthy();
        expect(getByText("Glacier Line")).toBeTruthy();
    });

    it("filters slopes using search input", () => {
        const { getByPlaceholderText, queryByText } = render(<SlopesScreen />);

        fireEvent.changeText(getByPlaceholderText("Search"), "Eagle");

        expect(queryByText("Eagle Pass")).toBeTruthy();
        expect(queryByText("Bluebird Ridge")).toBeNull();
        expect(queryByText("Glacier Line")).toBeNull();
    });

    it("expands and collapses a slope when pressed (shows/hides Weather)", () => {
        const { getByText, queryByText } = render(<SlopesScreen />);

        // init: Weather niet zichtbaar
        expect(queryByText("Weather")).toBeNull();

        // klik op slope name (SlopeOverview header wrapper is Pressable in expandable mode)
        fireEvent.press(getByText("Bluebird Ridge"));
        expect(getByText("Weather")).toBeTruthy();

        // klik opnieuw: Weather verdwijnt
        fireEvent.press(getByText("Bluebird Ridge"));
        expect(queryByText("Weather")).toBeNull();
    });
});
