import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddToCart from "../../app/(tabs)/shop/materials/add-to-cart";

// ✅ Fix: mock Image without loading full react-native (prevents DevMenu crash)
jest.mock("react-native/Libraries/Image/Image", () => "Image");

// ✅ Mock ErrorPopup / Card / Text components
jest.mock("@components/ErrorPopup", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return function ErrorPopup({ message }: any) {
        return <Text>{String(message)}</Text>;
    };
});

jest.mock("@components/Card", () => {
    const React = require("react");
    const { View } = require("react-native");
    return function Card({ children }: any) {
        return <View>{children}</View>;
    };
});

jest.mock("@components/text/H2", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return function H2({ children }: any) {
        return <Text>{children}</Text>;
    };
});

jest.mock("@components/text/Paragraph", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return function Paragraph({ children }: any) {
        return <Text>{children}</Text>;
    };
});

jest.mock("@components/text/SubHeading", () => {
    const React = require("react");
    const { Text } = require("react-native");
    return function SubHeading({ children }: any) {
        return <Text>{children}</Text>;
    };
});

// ✅ Mock StyledButton to TouchableOpacity
jest.mock("@components/StyledButton", () => {
    const React = require("react");
    const { Text, TouchableOpacity } = require("react-native");
    return function StyledButton({ children, onPress, disabled }: any) {
        return (
            <TouchableOpacity onPress={onPress} disabled={disabled}>
                <Text>{children}</Text>
            </TouchableOpacity>
        );
    };
});

// Theme
jest.mock("@components/ThemeContext", () => () => ({
    colors: { background: "#fff", surface: "#eee", text: "#000" },
    border: {},
    shadow: {},
    card: {},
    divider: {},
    list: { listItem: {} },
    spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 },
    radius: { sm: 6, md: 10, lg: 12 },
    text: { H1: {}, H2: {}, H3: {}, H4: {}, subHeading: {}, paragraph: {}, description: {} },
}));

// expo-router hooks in this screen
jest.mock("expo-router", () => {
    const mockBack = jest.fn();
    return {
        Stack: { Screen: () => null },
        useRouter: () => ({ back: mockBack }),
        useLocalSearchParams: () => ({ id: "mat-1" }),
        __mockBack: mockBack,
    };
});

// CartStore
jest.mock("@/store/CartStore", () => {
    const mockAddMaterial = jest.fn();
    return {
        useCartStore: () => ({
            addMaterial: mockAddMaterial,
            duration: 2,
            durationType: "days",
        }),
        __mock: { mockAddMaterial },
    };
});

// ✅ MaterialService default export
jest.mock("@/services/MaterialService", () => ({
    __esModule: true,
    default: {
        getMaterialById: jest.fn().mockResolvedValue({
            id: "mat-1",
            name: "Boots",
            pricePerHour: 5,
            pricePerDay: 25,
            imageUrl: "https://example.com/boots.png",
        }),
    },
}));

describe("Materials AddToCart screen", () => {
    beforeEach(() => {
        const { __mockBack } = require("expo-router");
        __mockBack.mockClear();

        const cart = require("@/store/CartStore");
        cart.__mock.mockAddMaterial.mockClear();
    });

    it("renders material info from back-end", async () => {
        const { findByText } = render(<AddToCart />);

        expect(await findByText("Boots")).toBeTruthy();
        expect(await findByText("$5")).toBeTruthy();
        expect(await findByText("$25")).toBeTruthy();
        expect(await findByText("Add to cart")).toBeTruthy();
    });

    it("adds the material to the cart and goes back", async () => {
        const { __mockBack } = require("expo-router");
        const cart = require("@/store/CartStore");

        const { findByText, getByText } = render(<AddToCart />);

        await findByText("Add to cart");

        fireEvent.press(getByText("Add to cart"));

        // duration=2 days => total = 25 * 2 = 50
        expect(cart.__mock.mockAddMaterial).toHaveBeenCalledWith(
            expect.objectContaining({ id: "mat-1", name: "Boots", total: 50 })
        );
        expect(__mockBack).toHaveBeenCalled();
    });
});
