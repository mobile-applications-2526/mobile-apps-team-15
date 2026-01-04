import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SlopeOverview from "../components/slopes/SlopeOverview";

const slope = {
    id: "1",
    name: "Bluebird Ridge",
    description: "A nice slope",
    imageUrl: 1, // dummy
    weather: { windKmh: 18, snowQuality: "good", visibility: "clear", busyness: "Calm" },
};

jest.mock("@components/ThemeContext", () => () => ({
    colors: { text: "#000" },
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
}));

describe("SlopeOverview", () => {
    it("renders slope name and description", () => {
        const { getByText } = render(<SlopeOverview slope={slope as any} />);
        expect(getByText("Bluebird Ridge")).toBeTruthy();
        expect(getByText("A nice slope")).toBeTruthy();
    });

    it("shows Weather section when expandable and expanded", () => {
        const { getByText } = render(
            <SlopeOverview slope={slope as any} expandable expanded onToggle={() => {}} />
        );
        expect(getByText("Weather")).toBeTruthy();
        expect(getByText("wind")).toBeTruthy();
        expect(getByText("18 km/h")).toBeTruthy();
    });

    it("calls onToggle when pressed if expandable", () => {
        const onToggle = jest.fn();
        const { getByText } = render(
            <SlopeOverview slope={slope as any} expandable expanded={false} onToggle={onToggle} />
        );

        fireEvent.press(getByText("Bluebird Ridge"));
        expect(onToggle).toHaveBeenCalledTimes(1);
    });

    it("renders '-' for missing weather values", () => {
        const slopeMissing = {
            ...slope,
            weather: { windKmh: null, snowQuality: null, visibility: "low", busyness: null },
        };

        const { getAllByText } = render(
            <SlopeOverview slope={slopeMissing as any} expandable expanded onToggle={() => {}} />
        );

        const dashes = getAllByText("-");
        expect(dashes.length).toBeGreaterThan(0);
    });

});
