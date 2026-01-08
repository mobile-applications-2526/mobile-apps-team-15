import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PaymentComplete from "../../app/(tabs)/shop/payment-complete";

describe("PaymentComplete screen", () => {
    beforeEach(() => {
        const { __mocks } = require("expo-router");
        __mocks.replace.mockClear();
    });

    it("renders payment complete screen UI", () => {
        const { getByText } = render(<PaymentComplete />);

        expect(getByText("Payment complete!")).toBeTruthy();
        expect(getByText("Back to shop")).toBeTruthy();
    });

    it('navigates back to "/(tabs)/shop" when pressing Back to shop', () => {
        const { __mocks } = require("expo-router");
        const { getByText } = render(<PaymentComplete />);

        fireEvent.press(getByText("Back to shop"));

        expect(__mocks.replace).toHaveBeenCalledWith("/(tabs)/shop");
    });
});
