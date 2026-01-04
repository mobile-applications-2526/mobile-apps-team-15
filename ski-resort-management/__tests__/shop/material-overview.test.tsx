import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MaterialOverview from "../../components/shop/MaterialOverview";

// Mock router.push en expose om te asserten
jest.mock("expo-router", () => {
    const mockPush = jest.fn();
    return { router: { push: mockPush }, __mockPush: mockPush };
});

// Mock theme (component gebruikt colors.textSecondary)
jest.mock("@components/ThemeContext", () => () => ({
    colors: { text: "#000", textSecondary: "#666" },
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

describe("MaterialOverview", () => {
    beforeEach(() => {
        const { __mockPush } = require("expo-router");
        __mockPush.mockClear();
    });

    // Tests that the component renders the material info (name, size, price)
    it("renders name, size and price", () => {
        const { getByText } = render(
            <MaterialOverview name="Boots" pricePerHour={5} pricePerDay={25} size="38" />
        );

        expect(getByText("Boots")).toBeTruthy();
        expect(getByText("Size: 38")).toBeTruthy();
        expect(getByText("$5/hr or $25/day")).toBeTruthy();
        expect(getByText("Add to cart")).toBeTruthy();
    });

    // Tests that pressing "Add to cart" navigates to the add-to-cart screen with correct params
    it("navigates to add-to-cart with params when pressing the button", () => {
        const { __mockPush } = require("expo-router");
        const { getByText } = render(
            <MaterialOverview name="Boots" pricePerHour={5} pricePerDay={25} size="38" />
        );

        fireEvent.press(getByText("Add to cart"));

        expect(__mockPush).toHaveBeenCalledWith({
            pathname: "/(tabs)/shop/add-to-cart",
            params: {
                name: "Boots",
                pricePerHour: "5",
                pricePerDay: "25",
            },
        });
    });
});
