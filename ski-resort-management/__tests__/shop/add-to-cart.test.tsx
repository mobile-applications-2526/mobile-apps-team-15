import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddToCart from "../../app/(tabs)/shop/add-to-cart";

// --- Mock expo-router hooks used by the screen ---
jest.mock("expo-router", () => {
    const mockPush = jest.fn();
    const mockBack = jest.fn();

    return {
        Stack: { Screen: () => null },
        useRouter: () => ({ push: mockPush, back: mockBack }),
        useLocalSearchParams: () => ({
            name: "Boots",
            pricePerHour: "5",
            pricePerDay: "25",
        }),
        __mockPush: mockPush,
        __mockBack: mockBack,
    };
});

// --- Mock theme so Card/Text/Button styles don't crash ---
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
    spacing: { sm: 8 },
    list: { listItem: {} },
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

describe("AddToCart screen", () => {
    beforeEach(() => {
        const { __mockPush, __mockBack } = require("expo-router");
        __mockPush.mockClear();
        __mockBack.mockClear();

        // Make Date.now deterministic so the cart item id is stable
        jest.spyOn(Date, "now").mockReturnValue(123456);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    // Tests that the screen renders and shows the received params (name + prices)
    it("renders item info from route params", () => {
        const { getByTestId, getByText } = render(<AddToCart />);

        expect(getByTestId("screen-shop-add-to-cart")).toBeTruthy();
        expect(getByText("Boots")).toBeTruthy();
        expect(getByText("$5")).toBeTruthy();   // price per hour
        expect(getByText("$25")).toBeTruthy();  // price per day
        expect(getByText(/Estimated total:/i)).toBeTruthy();
    });

    // Tests that changing amount/duration updates the estimated total
    it("updates estimated total when amount/duration changes", () => {
        const { getByText, getAllByText } = render(<AddToCart />);

        // Default: amount=1, durationUnit=days, durationValue=2 => total = 1 * 2 * 25 = 50
        expect(getByText("Estimated total: $50")).toBeTruthy();

        // Increase amount (+) once: amount=2 => total = 2 * 2 * 25 = 100
        const plusButtons = getAllByText("+");
        fireEvent.press(plusButtons[0]); // first "+" belongs to Amount section
        expect(getByText("Estimated total: $100")).toBeTruthy();

        // Toggle unit to hours: now total = 2 * 2 * 5 = 20
        fireEvent.press(getByText("days"));
        expect(getByText("Estimated total: $20")).toBeTruthy();

        // Increase durationValue (+) once: duration=3 => total = 2 * 3 * 5 = 30
        fireEvent.press(plusButtons[1]); // second "+" belongs to Duration section
        expect(getByText("Estimated total: $30")).toBeTruthy();
    });

    // Tests that pressing Checkout navigates to materials-checkout with correct JSON payload
    it("pushes to materials-checkout with cart items when pressing Checkout", () => {
        const { __mockPush } = require("expo-router");
        const { getByText, getAllByText } = render(<AddToCart />);

        // Make it a bit different from defaults to validate payload
        // Increase amount: 1 -> 2
        fireEvent.press(getAllByText("+")[0]);

        // Toggle to hours (days -> hours), durationValue default is 2
        fireEvent.press(getByText("days"));

        // Checkout
        fireEvent.press(getByText("Checkout"));

        // itemPrice = pph * durationValue = 5 * 2 = 10
        // quantity = amount = 2
        const expectedItems = [
            {
                id: "Boots-123456",
                name: "Boots",
                price: 10,
                quantity: 2,
            },
        ];

        expect(__mockPush).toHaveBeenCalledWith({
            pathname: "/(tabs)/shop/materials-checkout",
            params: { items: JSON.stringify(expectedItems) },
        });
    });
});
