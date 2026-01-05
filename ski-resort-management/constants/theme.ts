import { TextStyle, ViewStyle } from "react-native";


const lightColors = {
    primary: '#007AFF',
    pressedPrimary: '#0057bc',
    secondary: '#5856D6',
    background: '#F2F2F7',
    tabBackground: '#FFFFFF',
    tabIndicator: '#DDDDDD',
    surface: '#f4f4f4',
    button: '#FFFFFF',
    buttonBackground: '#333333',
    buttonPressedBackground: '#292929',
    buttonDisabledBackground: '#bababa',
    text: '#000000',
    textSecondary: '#535355',
    textInputBackground: '#f6f6f6',
    textPlaceholder: '#c7c7c7',
    border: '#C6C6C8',
    shadow: '#000000',
    error: '#FF3B30',
    errorBackground: '#EA8080',
    success: '#34C759',
}

const darkColors = {
    primary: '#0A84FF',
    pressedPrimary: '#0a66c5',
    secondary: '#5E5CE6',
    background: '#000000',
    tabBackground: '#232323',
    tabIndicator: '#101010',
    surface: '#1C1C1E',
    button: '#FFFFFF',
    buttonBackground: '#333333',
    buttonPressedBackground: '#171717',
    buttonDisabledBackground: '#292929',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    textInputBackground: '#141414',
    textPlaceholder: '#535353',
    border: '#38383A',
    shadow: '#000000',
    error: '#FF453A',
    errorBackground: '#EA3737',
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
    p: 16,
}

const H1: TextStyle = {
    fontSize: fontsize.h1,
    fontWeight: 'bold',
}

const H2: TextStyle = {
    fontSize: fontsize.h2,
    fontWeight: 'bold',
}

const H3: TextStyle = {
    fontSize: fontsize.h3,
    fontWeight: 'bold',
}

const H4: TextStyle = {
    fontSize: fontsize.h4,
    fontWeight: 'bold',
}

const subheading: TextStyle = {
    fontSize: fontsize.h4,
}

const paragraph: TextStyle = {
    fontSize: fontsize.p,
}

const card: ViewStyle = {
    elevation: 3,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
}

const shadow: ViewStyle = {
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: radius.sm,
}

const border: ViewStyle = {
    borderWidth: 1,
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
        ...card,
    },
    shadow: {
        shadowColor: lightColors.shadow,
        shadowOpacity: 0.1,
        ...shadow,
    },
    border: {
        borderColor: lightColors.border,
        ...border,
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
        H2: {
            color: lightColors.text,
            ...H2,
        },
        H3: {
            color: lightColors.text,
            ...H3,
        },
        H4: {
            color: lightColors.text,
            ...H4,
        },
        subheading: {
            color: lightColors.textSecondary,
            ...subheading,
        },
        paragraph: {
            color: lightColors.text,
            ...paragraph,
        },
        description: {
            color: lightColors.textSecondary,
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
        ...card,
    },
    shadow: {
        shadowColor: darkColors.shadow,
        shadowOpacity: 0.3,
        ...shadow,
    },
    border: {
        borderColor: darkColors.border,
        ...border,
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
        H2: {
            color: darkColors.text,
            ...H2,
        },
        H3: {
            color: darkColors.text,
            ...H3,
        },
        H4: {
            color: darkColors.text,
            ...H4,
        },
        subheading: {
            color: darkColors.textSecondary,
            ...subheading,
        },
        paragraph: {
            color: darkColors.text,
            ...paragraph,
        },
        description: {
            color: darkColors.textSecondary,
            ...paragraph,
        },
    }
};

export type Theme = typeof lightTheme;
