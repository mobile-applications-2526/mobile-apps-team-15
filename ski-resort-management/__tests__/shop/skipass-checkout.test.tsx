import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SkiPassCheckout from "../../app/(tabs)/shop/skipasscheckout";

// Mock expo-router hooks
jest.mock("expo-router", () => {
    const mockReplace = jest.fn();

    return {
        Stack: { Screen: () => null },
        useRouter: () => ({ replace: mockReplace }),
        useLocalSearchParams: () => ({ selectedSkiPassTitle: "Gold" }),
        __mockReplace: mockReplace,
    };
});

// Mock theme
jest.mock("@components/ThemeContext", () => () => ({
    colors: {
        background: "#fff",
        surface: "#eee",
        text: "#000",
        buttonBackground: "#333",
        button: "#fff",
    },
    border: {},
    shadow: {},
    card: {},
    divider: {},
    text: { H1: {}, H2: {}, H3: {}, H4: {}, subHeading: {}, paragraph: {}, description: {} },
}));

describe("SkiPassCheckout screen", () => {
    beforeEach(() => {
        const { __mockReplace } = require("expo-router");
        __mockReplace.mockClear();
    });

    // Tests that checkout screen renders summary + mocked price
    it("renders the checkout summary", () => {
        const { getByTestId, getByText } = render(<SkiPassCheckout />);

        expect(getByTestId("screen-shop-skipasscheckout")).toBeTruthy();
        expect(getByText("Summary")).toBeTruthy();
        expect(getByText("$50/mo")).toBeTruthy(); // mockedSkipass.price
        expect(getByText("Pay")).toBeTruthy();
    });

    // Tests that pressing Pay navigates to payment-complete
    it("navigates to payment-complete when pressing Pay", () => {
        const { __mockReplace } = require("expo-router");
        const { getByText } = render(<SkiPassCheckout />);

        fireEvent.press(getByText("Pay"));
        expect(__mockReplace).toHaveBeenCalledWith("/(tabs)/shop/payment-complete");
    });
});
