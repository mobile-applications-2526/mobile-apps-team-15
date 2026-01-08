import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Home from "../../app/(tabs)";

jest.mock("@/services/SkiPassService", () => ({
    __esModule: true,
    default: {
        getCurrentSkiPassByUserId: jest.fn().mockResolvedValue([]),
    },
}));

jest.mock("@components/AuthContext", () => {
    const React = require("react");
    return {
        AuthContext: React.createContext({
            user: { uid: "u1" },
            loading: false,
        }),
    };
});

jest.mock("@components/Header", () => {
    const React = require("react");
    const { View } = require("react-native");
    return function Header() {
        return <View testID="mock-header" />;
    };
});

jest.mock("@components/slopes/SlopeOverview", () => {
    const React = require("react");
    const { View, Text } = require("react-native");
    return function SlopeOverview() {
        return (
            <View testID="mock-slope-overview">
                <Text>Mock SlopeOverview</Text>
            </View>
        );
    };
});

jest.mock("@components/StyledLink", () => {
    const React = require("react");
    const { TouchableOpacity, Text } = require("react-native");
    const { router } = require("expo-router");

    return function StyledLink({ href, children }: any) {
        return (
            <TouchableOpacity onPress={() => router.push(href)}>
                {/* children kan tekst zijn of componenten */}
                {typeof children === "string" ? <Text>{children}</Text> : children}
            </TouchableOpacity>
        );
    };
});

jest.mock("@components/SkiPassCard", () => {
    const React = require("react");
    const { View, Text } = require("react-native");
    return function SkiPassCard() {
        return (
            <View testID="mock-skipass-card">
                <Text>Mock SkiPassCard</Text>
            </View>
        );
    };
});

describe("Home screen", () => {
    beforeEach(() => {
        const expoRouter = require("expo-router");
        expoRouter.__mocks.push.mockClear();

        const { useUserStore } = require("@/store/UserStore");
        const { useFavoriteSlopeStore } = require("@/store/FavoriteSlopeStore");
        useUserStore.setState({ user: { firstName: "Mark" } });
        useFavoriteSlopeStore.setState({ favoriteSlope: null });
    });

    it("renders home screen content", async () => {
        const { getByTestId, getByText } = render(<Home />);

        await waitFor(() => {
            expect(getByTestId("screen-home")).toBeTruthy();
            expect(getByText("Ski-Free")).toBeTruthy();
            expect(getByText("Welcome back, Mark!")).toBeTruthy();
        });
    });

    it('navigates to slopes when clicking "See slopes"', async () => {
        const expoRouter = require("expo-router");
        const { getByText } = render(<Home />);

        fireEvent.press(getByText(/See\s*slopes/i));

        await waitFor(() => {
            expect(expoRouter.__mocks.push).toHaveBeenCalledWith("(tabs)/slopes");
        });
    });
});
