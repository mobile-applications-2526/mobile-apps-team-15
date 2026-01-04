import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SkiPassOverview from "../../components/shop/SkiPassOverview";

// Mock router.push and expose it
jest.mock("expo-router", () => {
    const mockPush = jest.fn();
    return { router: { push: mockPush }, __mockPush: mockPush };
});

// Mock theme
jest.mock("@components/ThemeContext", () => () => ({
    colors: { text: "#000", textSecondary: "#666", buttonBackground: "#333", button: "#fff" },
    text: { H1: {}, H2: {}, H3: {}, H4: {}, subHeading: {}, paragraph: {}, description: {} },
}));

describe("SkiPassOverview", () => {
    beforeEach(() => {
        const { __mockPush } = require("expo-router");
        __mockPush.mockClear();
    });

    // Tests that the component renders title, price and included list
    it("renders title, price and included items", () => {
        const { getByText } = render(
            <SkiPassOverview
                title="Gold"
                price={50}
                includedList={["Allowed in domain 1 to 3", "Free drinks at the ski resort bars"]}
            />
        );

        expect(getByText("Gold")).toBeTruthy();
        expect(getByText("$50/mo")).toBeTruthy();
        expect(getByText("• Allowed in domain 1 to 3")).toBeTruthy();
        expect(getByText("• Free drinks at the ski resort bars")).toBeTruthy();
        expect(getByText("Get ski pass")).toBeTruthy();
    });

    // Tests that pressing the button navigates to skipasscheckout with the selected title
    it("navigates to skipasscheckout when pressing Get ski pass", () => {
        const { __mockPush } = require("expo-router");
        const { getByText } = render(
            <SkiPassOverview title="Gold" price={50} includedList={["Allowed in domain 1 to 3"]} />
        );

        fireEvent.press(getByText("Get ski pass"));

        expect(__mockPush).toHaveBeenCalledWith({
            pathname: "shop/skipasscheckout",
            params: { selectedSkiPassTitle: "Gold" },
        });
    });
});
