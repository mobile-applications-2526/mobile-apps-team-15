import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SkiPassOverview from "../../components/shop/SkiPassOverview";

// Mock theme (include spacing because StyledButton uses theme.spacing.md)
jest.mock("@components/ThemeContext", () => () => ({
    colors: {
        text: "#000",
        textSecondary: "#666",
        buttonBackground: "#333",
        button: "#fff",
    },
    text: {
        H1: {},
        H2: {},
        H3: {},
        H4: {},
        subHeading: {},
        paragraph: {},
        description: {},
    },
    spacing: { xs: 4, sm: 8, md: 12, lg: 16 },
    radius: { sm: 6, md: 10, lg: 12 },
    card: {},
    shadow: {},
    border: {},
}));

describe("SkiPassOverview", () => {
    beforeEach(() => {
        const expoRouter = require("expo-router");
        expoRouter.__mocks.push.mockClear();
    });

    it("renders title, price and included items", () => {
        const { getByText } = render(
            <SkiPassOverview
                title="Gold"
                price={50}
                passType="day"
                includedList={[
                    "Allowed in domain 1 to 3",
                    "Free drinks at the ski resort bars",
                ]}
            />
        );

        expect(getByText("Gold")).toBeTruthy();
        expect(getByText("$50")).toBeTruthy();
        expect(getByText("• Allowed in domain 1 to 3")).toBeTruthy();
        expect(getByText("• Free drinks at the ski resort bars")).toBeTruthy();
        expect(getByText("Get ski pass")).toBeTruthy();
    });

    it("navigates to skipasscheckout when pressing Get ski pass", () => {
        const expoRouter = require("expo-router");

        const { getByText } = render(
            <SkiPassOverview
                title="Gold"
                price={50}
                passType="day"
                includedList={["Allowed in domain 1 to 3"]}
            />
        );

        fireEvent.press(getByText("Get ski pass"));

        expect(expoRouter.__mocks.push).toHaveBeenCalledWith({
            pathname: "shop/skipasscheckout",
            params: { title: "Gold", price: 50, passType: "day" },
        });
    });
});
