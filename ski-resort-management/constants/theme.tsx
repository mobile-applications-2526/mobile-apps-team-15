import { TextStyle, ViewStyle } from "react-native";

const lightColors = {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#F2F2F7',
    surface: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
    shadow: '#000000',
    error: '#FF3B30',
    success: '#34C759',
}

const darkColors = {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    shadow: '#000000',
    error: '#FF453A',
    success: '#32D74B',
}

const spacing = {
    xs: 5,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 30,
}

const radius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
}

const fontsize = {
    h1: 32,
    h2: 24,
    h3: 20,
    h4: 18,
    h5: 16,
    h6: 14,
    p: 14,
}

const H1: TextStyle = {
    fontSize: fontsize.h1,
    fontWeight: 'bold',
}

const H2: TextStyle = {
    fontSize: fontsize.h2,
    fontWeight: 'bold',
}

const subheading: TextStyle = {
    fontSize: fontsize.h4,
}

const paragraph: TextStyle = {
    fontSize: fontsize.p,
}

const card: ViewStyle = {
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: radius.sm,
    elevation: 3,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
}

const listItem: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 0,
}

const divider: ViewStyle = {
    width: '100%',
    height: 1,
    flex: 1,
    borderBottomWidth: 1,
}

export const lightTheme = {
    colors: lightColors,
    spacing,
    radius,
    card: {
        backgroundColor: lightColors.surface,
        shadowColor: lightColors.shadow,
        shadowOpacity: 0.1,
        ...card,
    },
    list: {
        listItem,
    },
    divider: {
        borderColor: lightColors.border,
        ...divider,
    },
    text: {
        H1: {
            color: lightColors.text,
            ...H1,
        },
        subheading: {
            color: lightColors.textSecondary,
            ...subheading,
        },
        paragraph: {
            color: lightColors.text,
            ...paragraph,
        },
    },
};

export const darkTheme = {
    colors: darkColors,
    spacing,
    radius,
    card: {
        backgroundColor: darkColors.surface,
        shadowColor: darkColors.shadow,
        shadowOpacity: 0.3,
        ...card,
    },
    list: {
        listItem,
    },
    divider: {
        borderColor: darkColors.border,
        ...divider,
    },
    text: {
        H1: {
            color: darkColors.text,
            ...H1,
        },
        subheading: {
            color: darkColors.textSecondary,
            ...subheading,
        },
        paragraph: {
            color: darkColors.text,
            ...paragraph,
        },
    }
};

export type Theme = typeof lightTheme;
