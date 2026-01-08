import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Cart from "../../app/(tabs)/shop/materials/cart";

jest.mock(
    "@react-native-async-storage/async-storage",
    () => require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

const mockReplace = jest.fn();
jest.mock("expo-router", () => ({
    Stack: { Screen: () => null },
    useRouter: () => ({ replace: mockReplace }),
    router: { replace: mockReplace },
    useLocalSearchParams: () => ({}),
    Link: ({ children }: any) => children,
    useFocusEffect: (effect: any) => {
        const cleanup = effect?.();
        if (typeof cleanup === "function") cleanup();
    },
    __mocks: { replace: mockReplace },
}));

jest.mock("@components/ThemeContext", () => () => ({
    colors: { background: "#fff", surface: "#eee", text: "#000", border: "#ccc", textSecondary: "#666" },
    border: {},
    shadow: {},
    card: {},
    divider: {},
    spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 },
    radius: { sm: 6, md: 10, lg: 12 },
    text: { H1: {}, H2: {}, H3: {}, H4: {}, subHeading: {}, paragraph: {}, description: {} },
}));

jest.mock("@/store/CartStore", () => {
    const mockSetDuration = jest.fn();
    const mockSetDurationType = jest.fn();
    const mockClearCart = jest.fn();

    return {
        useCartStore: () => ({
            materials: [{ id: "mat-1", name: "Boots", total: 20 }],
            duration: 2,
            durationType: "days",
            setDuration: mockSetDuration,
            setDurationType: mockSetDurationType,
            getTotalPrice: () => 20,
            clearCart: mockClearCart,
        }),
        __mock: { mockSetDuration, mockSetDurationType, mockClearCart },
    };
});

jest.mock("@/store/UserStore", () => ({
    useUserStore: () => ({ user: { id: "u1" } }),
}));

jest.mock("@/services/LoanService", () => ({
    postLoan: jest.fn().mockResolvedValue({}),
}));

describe("Materials Cart screen", () => {
    beforeEach(() => {
        mockReplace.mockClear();
        const { __mock } = require("@/store/CartStore");
        __mock.mockClearCart.mockClear();
        __mock.mockSetDuration.mockClear();
        __mock.mockSetDurationType.mockClear();
    });

    it("renders items and total", () => {
        const { getByText, getAllByText } = render(<Cart />);

        expect(getByText("Checkout")).toBeTruthy();
        expect(getByText("Boots")).toBeTruthy();

        // er kunnen meerdere "$20.00" zijn (bv. item + total)
        expect(getAllByText("$20.00").length).toBeGreaterThan(0);
    });

    it("updates duration and duration type via buttons", () => {
        const { __mock } = require("@/store/CartStore");
        const { getByText } = render(<Cart />);

        fireEvent.press(getByText("+"));
        expect(__mock.mockSetDuration).toHaveBeenCalled();

        fireEvent.press(getByText("d"));
        expect(__mock.mockSetDurationType).toHaveBeenCalledWith("hours");
    });

    it("pays and navigates to payment complete", async () => {
        const { __mock } = require("@/store/CartStore");
        const { getByText } = render(<Cart />);

        fireEvent.press(getByText("Pay"));

        await Promise.resolve();
        await Promise.resolve();

        expect(__mock.mockClearCart).toHaveBeenCalled();
        expect(mockReplace).toHaveBeenCalledWith("/(tabs)/shop/payment-complete");
    });
});
