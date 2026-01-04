import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MaterialsCheckout from "../../app/(tabs)/shop/materials-checkout";

jest.mock("expo-router", () => {
    const mockReplace = jest.fn();

    return {
        Stack: { Screen: () => null },
        useRouter: () => ({ replace: mockReplace }),
        useLocalSearchParams: () => ({
            items: JSON.stringify([
                {
                    id: "Boots-123",
                    name: "Boots",
                    price: 10,
                    quantity: 2,
                    durationUnit: "days",
                    durationValue: 2,
                },
            ]),
        }),
        __mockReplace: mockReplace,
    };
});

jest.mock("@components/ThemeContext", () => () => ({
    colors: {
        background: "#fff",
        surface: "#eee",
        text: "#000",
        buttonBackground: "#333",
        button: "#fff",
        border: "#ccc",
    },
    border: {},
    shadow: {},
    card: {},
    divider: {},
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

describe("MaterialsCheckout screen", () => {
    beforeEach(() => {
        const { __mockReplace } = require("expo-router");
        __mockReplace.mockClear();
    });

    //Tests that checkout renders and initial totals are correct
    it("renders items and shows initial totals", () => {
        const { getByTestId, getByText, getAllByText } = render(<MaterialsCheckout />);

        expect(getByTestId("screen-shop-materials-checkout")).toBeTruthy();
        expect(getByText("Checkout")).toBeTruthy();
        expect(getByText("Boots")).toBeTruthy();

        // Calc:
        // inferredRate = price/duration = 10/2 = 5
        // single base price = duration * rate = 2 * 5 = 10
        // line total = quantity * base = 2 * 10 = 20
        // "$20" appears twice (line total + total)
        expect(getAllByText("$20").length).toBeGreaterThanOrEqual(2);
    });

    //Tests that increasing quantity updates line total and overall total
    it("increases total when quantity is increased", () => {
        const { getAllByText } = render(<MaterialsCheckout />);

        // Initial total should include $20 (line + total)
        expect(getAllByText("$20").length).toBeGreaterThanOrEqual(1);

        // First "+" should be quantity "+"
        fireEvent.press(getAllByText("+")[0]);

        // Quantity: 2 -> 3, base stays 10 => line total 30 => total 30
        // "$30" appears twice (line total + total)
        expect(getAllByText("$30").length).toBeGreaterThanOrEqual(2);
    });

    // Tests that increasing duration updates totals (based on inferred rate)
    it("increases total when duration is increased", () => {
        const { getAllByText } = render(<MaterialsCheckout />);

        // Initial total should include $20
        expect(getAllByText("$20").length).toBeGreaterThanOrEqual(1);

        // Second "+" is duration "+"
        fireEvent.press(getAllByText("+")[1]);

        // Duration: 2 -> 3 => total becomes $30 (line + total)
        expect(getAllByText("$30").length).toBeGreaterThanOrEqual(2);
    });

    //Tests that pressing Pay navigates to payment-complete
    it("navigates to payment-complete when pressing Pay", () => {
        const { __mockReplace } = require("expo-router");
        const { getByText } = render(<MaterialsCheckout />);

        fireEvent.press(getByText("Pay"));
        expect(__mockReplace).toHaveBeenCalledWith("/(tabs)/shop/payment-complete");
    });
});
