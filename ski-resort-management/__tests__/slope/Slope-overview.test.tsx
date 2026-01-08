import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SlopeOverview from "@components/slopes/SlopeOverview";

jest.mock(
    "@react-native-async-storage/async-storage",
    () => require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Keep zustand store simple/deterministic for these unit tests
jest.mock("@/store/FavoriteSlopeStore", () => ({
    useFavoriteSlopeStore: () => ({
        favoriteSlope: null,
        setFavoriteSlope: jest.fn(),
    }),
}));

// Vector icons shouldn't affect unit tests
jest.mock("@expo/vector-icons/FontAwesome6", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return function Icon() {
        return <Text>icon</Text>;
    };
});

jest.mock("@components/ThemeContext", () => () => ({
    colors: { text: "#000", textSecondary: "#666", error: "#f00" },
    text: {
        H1: {},
        H2: {},
        H3: {},
        H4: {},
        subHeading: {},
        paragraph: {},
        description: {},
    },
    card: {},
    shadow: {},
    border: {},
    spacing: { xs: 4, sm: 8, md: 12, lg: 16 },
    radius: { sm: 6, md: 10, lg: 12 },
}));

const slope = {
    id: "1",
    slopeName: "Bluebird Ridge",
    domain: { name: "Domain A" },
    status: "OPEN",
    difficulty: "BLUE",
};

describe("SlopeOverview", () => {
    it("renders slope name and domain", () => {
        const { getByText } = render(<SlopeOverview slope={slope as any} />);
        expect(getByText("Bluebird Ridge")).toBeTruthy();
        expect(getByText("Domain A")).toBeTruthy();
    });

    it("shows details when expandable and expanded", () => {
        const { getByText } = render(
            <SlopeOverview slope={slope as any} expandable expanded onToggle={() => {}} />
        );

        expect(getByText("Weather")).toBeTruthy();
        expect(getByText("Status:")).toBeTruthy();
        expect(getByText("OPEN")).toBeTruthy();
        expect(getByText("Difficulty:")).toBeTruthy();
        expect(getByText("BLUE")).toBeTruthy();
    });

    it("calls onToggle when pressing the expand button", () => {
        const onToggle = jest.fn();
        const { getByLabelText } = render(
            <SlopeOverview slope={slope as any} expandable expanded={false} onToggle={onToggle} />
        );

        fireEvent.press(getByLabelText("expand"));
        expect(onToggle).toHaveBeenCalledTimes(1);

    });
});
