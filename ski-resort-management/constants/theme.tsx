import { TextStyle } from "react-native";

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

const H1: TextStyle = {
    fontSize: 32,
    fontWeight: 'bold',
}

const H2: TextStyle = {

}

const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
}

const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
}

const card = {
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
}

export const lightTheme = {
    colors: lightColors,
    spacing,
    borderRadius,
    card: {
        backgroundColor: lightColors.surface,
        shadowColor: lightColors.shadow,
        shadowOpacity: 0.1,
        ...card,
    },
    text: {
        H1: {
            color: lightColors.text,
            ...H1,
        }
    },
};

export const darkTheme = {
    colors: darkColors,
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
    },
    card: {
        backgroundColor: darkColors.surface,
        shadowColor: darkColors.shadow,
        shadowOpacity: 0.3,
        ...card,
    },
    text: {
        H1: {
            color: darkColors.text,
            ...H1,
        }
    }
};

export type Theme = typeof lightTheme;