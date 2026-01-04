import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SlopesScreen from "../app/(tabs)/slopes/index";

// Theme mock: voldoende props voor Card + text components
jest.mock("@components/ThemeContext", () => () => ({
    colors: {
        background: "#fff",
        surface: "#eee",
        text: "#000",
        tabBackground: "#fff",
        tabIndicator: "#000",
    },
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

// Maak Header simpel
jest.mock("@components/Header", () => {
    const React = require("react");
    const { View } = require("react-native");
    return function Header() {
        return <View testID="mock-header" />;
    };
});

// We willen SlopeOverview NIET volledig mocken, want we willen echt togglen op "Weather".
// Maar Image kan soms warnings geven; meestal ok.
// Als je errors krijgt rond Image/assets, dan kunnen we SlopeOverview mocken óf Image mocken.

describe("Slopes screen", () => {
    it("renders screen and all slopes initially", () => {
        const { getByTestId, getByText } = render(<SlopesScreen />);

        expect(getByTestId("screen-slopes")).toBeTruthy();
        expect(getByText("Bluebird Ridge")).toBeTruthy();
        expect(getByText("Eagle Pass")).toBeTruthy();
        expect(getByText("Glacier Line")).toBeTruthy();
    });

    it("filters slopes using search input", () => {
        const { getByTestId, queryByText } = render(<SlopesScreen />);

        fireEvent.changeText(getByTestId("input-slopes-search"), "Eagle");

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
