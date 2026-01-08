import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MaterialOverview from "../../components/shop/MaterialOverview";

jest.mock("react-native", () => {
  const actualRN = jest.requireActual("react-native");
  const React = require("react");

  const MockImage = (props: any) => {
    return React.createElement("Image", props);
  };

  return Object.defineProperty(actualRN, "Image", {
    get: () => MockImage,
  });
});

// Mock text components
jest.mock("@components/text/H3", () => ({
  __esModule: true,
  default: ({ children, style }: any) => {
    const { Text } = require("react-native");
    return <Text style={style}>{children}</Text>;
  },
}));

jest.mock("@components/text/H4", () => ({
  __esModule: true,
  default: ({ children, style }: any) => {
    const { Text } = require("react-native");
    return <Text style={style}>{children}</Text>;
  },
}));

// Mock StyledButton
jest.mock("@components/StyledButton", () => ({
  __esModule: true,
  default: ({ children, onPress, disabled, style }: any) => {
    const { TouchableOpacity, Text } = require("react-native");
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} style={style}>
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  },
}));

// Mock CartStore
jest.mock("@/store/CartStore", () => ({
  useCartStore: () => ({ materials: [] }),
}));

describe("MaterialOverview", () => {
  beforeEach(() => {
    const expoRouter = require("expo-router");
    expoRouter.__mocks.push.mockClear();
  });

  it("renders name and price", () => {
    const { getByText } = render(
      <MaterialOverview
        material={{
          id: "mat-1",
          name: "Boots",
          pricePerHour: 5,
          pricePerDay: 25,
          imageUrl: "https://example.com/boots.png",
          description: "Test boots",
          available: true,
        }}
      />
    );

    expect(getByText("Boots")).toBeTruthy();
    expect(getByText(/\$5\/hr\s*or\s*\$25\/day/i)).toBeTruthy();
    expect(getByText("View")).toBeTruthy();
  });

  it("navigates to materials/add-to-cart with id when pressing View", () => {
    const expoRouter = require("expo-router");

    const { getByText } = render(
      <MaterialOverview
        material={{
          id: "mat-1",
          name: "Boots",
          pricePerHour: 5,
          pricePerDay: 25,
          imageUrl: "https://example.com/boots.png",
          description: "Test boots",
          available: true,
        }}
      />
    );

    fireEvent.press(getByText("View"));

    expect(expoRouter.__mocks.push).toHaveBeenCalledWith({
      pathname: "/(tabs)/shop/materials/add-to-cart",
      params: { id: "mat-1" },
    });
  });
});
