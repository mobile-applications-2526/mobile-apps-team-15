import "@testing-library/jest-native/extend-expect";

// AsyncStorage mock (fix Zustand persist)
jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-router", () => {
    const navigate = jest.fn();
    const push = jest.fn();
    const replace = jest.fn();
    const back = jest.fn();

    let focusEffectHasRun = false;

    return {
        Stack: { Screen: () => null },

        useRouter: () => ({ navigate, push, replace, back }),
        router: { navigate, push, replace, back },

        useLocalSearchParams: jest.fn(() => ({})),
        Link: ({ children }: any) => children,

        useFocusEffect: (effect: any) => {
            if (focusEffectHasRun) return;
            focusEffectHasRun = true;
            effect?.();
        },

        __mocks: { navigate, push, replace, back },
        __reset: () => {
            focusEffectHasRun = false;
            navigate.mockClear();
            push.mockClear();
            replace.mockClear();
            back.mockClear();
        },
    };
});




// Firebase mocks to avoid ESM parse
jest.mock("@/services/FirebaseConfig", () => ({ auth: {} }));

jest.mock("firebase/auth", () => ({
    onAuthStateChanged: jest.fn(() => jest.fn()),
}));

jest.mock("firebase/app", () => ({
    initializeApp: jest.fn(),
    getApps: jest.fn(() => []),
    getApp: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => {
    const actual = jest.requireActual("react-native-safe-area-context");
    return {
        ...actual,
        useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
        SafeAreaProvider: ({ children }: any) => children,
    };
});

jest.mock("@components/ThemeContext", () => () => ({
    colors: {
        background: "#fff",
        surface: "#fff",
        text: "#000",
        textSecondary: "#666",
        error: "#f00",
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

jest.mock("react-native/Libraries/Image/Image", () => "Image");

