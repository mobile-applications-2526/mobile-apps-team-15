import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SkiPassCheckout from "../../app/(tabs)/shop/skipasscheckout";

jest.mock("@components/AuthContext", () => {
    const React = require("react");
    return {
        AuthContext: React.createContext({ user: { uid: "u1" }, loading: false }),
    };
});

jest.mock("@/services/SkiPassService", () => ({
    postSkiPass: jest.fn().mockResolvedValue({}),
}));

describe("SkiPassCheckout screen", () => {
    beforeEach(() => {
        const expoRouter = require("expo-router");

        // reset navigation mocks from jest.setup.ts
        expoRouter.__mocks.replace.mockClear();

        // set predictable params for this test file
        expoRouter.useLocalSearchParams.mockImplementation(() => ({
            title: "Gold",
            price: 50,
            passType: "day",
        }));
    });

    it("renders the checkout summary", () => {
        const { getByTestId, getByText } = render(<SkiPassCheckout />);

        expect(getByTestId("screen-shop-skipasscheckout")).toBeTruthy();
        expect(getByText("Summary")).toBeTruthy();
        expect(getByText("$50")).toBeTruthy();
        expect(getByText("Pay")).toBeTruthy();
    });

    it("navigates to payment-complete when pressing Pay", async () => {
        const expoRouter = require("expo-router");
        const { getByText } = render(<SkiPassCheckout />);

        fireEvent.press(getByText("Pay"));

        await waitFor(() => {
            expect(expoRouter.__mocks.replace).toHaveBeenCalledWith(
                "/(tabs)/shop/payment-complete"
            );
        });
    });
});
