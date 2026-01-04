import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ListNavigationCard } from "../../components/shop/ListNavigationCard";

// Mock expo-router + expose push so we can assert navigation
jest.mock("expo-router", () => {
    const mockPush = jest.fn();
    return { router: { push: mockPush }, __mockPush: mockPush };
});

// Mock theme because the component reads spacing/listItem styles
jest.mock("@components/ThemeContext", () => () => ({
    colors: { background: "#fff", surface: "#eee", text: "#000" },
    border: {},
    shadow: {},
    card: {},
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

describe("ListNavigationCard", () => {
    beforeEach(() => {
        const { __mockPush } = require("expo-router");
        __mockPush.mockClear();
    });

    // Tests that all navigation items are rendered on screen
    it("renders items", () => {
        const { getByText } = render(
            <ListNavigationCard
                items={[
                    { title: "Ski Passes", route: "shop/skipass" },
                    { title: "Materials", route: "shop/materials" },
                ]}
            />
        );

        expect(getByText("Ski Passes")).toBeTruthy();
        expect(getByText("Materials")).toBeTruthy();
    });

    // Tests that pressing an item calls router.push with the correct route
    it("navigates when an item is pressed", () => {
        const { __mockPush } = require("expo-router");
        const { getByText } = render(
            <ListNavigationCard
                items={[
                    { title: "Ski Passes", route: "shop/skipass" },
                    { title: "Materials", route: "shop/materials" },
                ]}
            />
        );

        fireEvent.press(getByText("Materials"));
        expect(__mockPush).toHaveBeenCalledWith("shop/materials");
    });
});
