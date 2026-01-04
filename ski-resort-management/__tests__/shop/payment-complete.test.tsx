import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PaymentComplete from "../../app/(tabs)/shop/payment-complete";

// --- Mock expo-router (Stack.Screen + router.replace) ---
jest.mock("expo-router", () => {
    const mockReplace = jest.fn();
    return {
        Stack: { Screen: () => null },
        useRouter: () => ({ replace: mockReplace }),
        __mockReplace: mockReplace,
    };
});

// --- Mock theme (component uses theme?.colors?....) ---
jest.mock("@components/ThemeContext", () => () => ({
    colors: {
        background: "#fff",
        surface: "#eee",
        card: "#fff",
        text: "#000",
        border: "#ccc",
        shadow: "#000",
        buttonText: "#fff",
    },
}));

describe("PaymentComplete screen", () => {
    beforeEach(() => {
        const { __mockReplace } = require("expo-router");
        __mockReplace.mockClear();
    });

    // Tests that the screen renders and shows the success message + button
    it("renders payment complete screen UI", () => {
        const { getByTestId, getByText } = render(<PaymentComplete />);

        expect(getByTestId("screen-shop-payment-complete")).toBeTruthy();
        expect(getByText("Payment complete!")).toBeTruthy();
        expect(getByText("Back to shop")).toBeTruthy();
    });

    // Tests that pressing "Back to shop" navigates back to the shop index
    it('navigates back to "/(tabs)/shop" when pressing Back to shop', () => {
        const { __mockReplace } = require("expo-router");
        const { getByText } = render(<PaymentComplete />);

        fireEvent.press(getByText("Back to shop"));

        expect(__mockReplace).toHaveBeenCalledWith("/(tabs)/shop");
    });
});
