"use client";
import { createTheme, responsiveFontSizes, Theme, PaletteMode, PaletteOptions } from "@mui/material/styles";

export const FONTS = {
  Ubuntu: "var(--font-ubuntu)",
  Raleway: "var(--font-raleway)",
};

// Define custom breakpoints for better mobile and tablet support
const breakpoints = {
  values: {
    xs: 0, // Mobile phones (portrait)
    sm: 600, // Mobile phones (landscape) / Small tablets
    md: 900, // Tablets
    lg: 1200, // Desktops / Laptops
    xl: 1536, // Large screens
  },
};

// Define custom colors based on user specifications
const colors = {
  // Main colors
  primary: "#FCA21A",
  grey: "#DDE2E5",
  green: "#2E7D32",
  red: "#D32F2F",

  // Background colors
  defaultBackground: "#ffffff",
  errorBackground: "#FCF3F2",
  greenBackground: "#F0F9F6",
  focusBackground: "#E9ECF8",
  inputDisabled: "#F2F4F5",

  // Black shades (increasing darkness)
  black: {
    100: "#CFD3D4", // Lightest
    200: "#ABAFB1",
    300: "#83898C",
    400: "#5E6366",
    500: "#2B2F32", // Darkest
  },
};

// Define palette options for light and dark modes
const getPalette = (mode: PaletteMode): PaletteOptions => ({
  mode,
  primary: {
    main: colors.primary,
    light: "#FDD06D", // Lighter shade of primary
    dark: "#E69200", // Darker shade of primary
    contrastText: "#000000",
  },
  secondary: {
    main: colors.grey,
    light: "#E8EBED", // Lighter shade of grey
    dark: "#B6BDC2", // Darker shade of grey
    contrastText: "#000000",
  },
  background: {
    default: mode === "light" ? colors.defaultBackground : "#121212",
    paper: mode === "light" ? "#ffffff" : "#1e1e1e",
  },
  text: {
    primary: mode === "light" ? colors.black[500] : "#ffffff",
    secondary: mode === "light" ? colors.black[400] : "#b0b0b0",
  },
  error: {
    main: colors.red,
    light: "#EF5350",
    dark: "#C62828",
    contrastText: "#ffffff",
  },
  warning: {
    main: colors.primary, // Using primary color as warning
    contrastText: "#000000",
  },
  info: {
    main: "#2196F3", // Standard blue for info
    contrastText: "#ffffff",
  },
  success: {
    main: colors.green,
    light: "#4CAF50",
    dark: "#1B5E20",
    contrastText: "#ffffff",
  },
  grey: {
    50: "#F8F9FA",
    100: colors.black[100],
    200: colors.black[200],
    300: colors.black[300],
    400: colors.black[400],
    500: colors.black[500],
    600: "#212529",
    700: "#1A1E21",
    800: "#151819",
    900: "#0D0F10",
    A100: colors.inputDisabled,
    A200: colors.grey,
    A400: colors.focusBackground,
    A700: "#616161",
  },
  divider: mode === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)",
});

// Create theme creator function to handle both light and dark modes
const createAppTheme = (mode: PaletteMode): Theme => {
  let theme = createTheme({
    palette: getPalette(mode),
    breakpoints,
    typography: {
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        lineHeight: 1.2,
        fontFamily: FONTS.Ubuntu,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
        lineHeight: 1.3,
        fontFamily: FONTS.Ubuntu,
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 600,
        lineHeight: 1.3,
        fontFamily: FONTS.Ubuntu,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
        fontFamily: FONTS.Ubuntu,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: 1.4,
        fontFamily: FONTS.Raleway,
      },
      h6: {
        fontSize: "1.125rem",
        fontWeight: 500,
        lineHeight: 1.5,
        fontFamily: FONTS.Raleway,
      },
      subtitle1: {
        fontSize: "1rem",
        lineHeight: 1.5,
        fontFamily: FONTS.Raleway,
      },
      subtitle2: {
        fontSize: "0.875rem",
        lineHeight: 1.6,
        fontFamily: FONTS.Raleway,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
        fontFamily: FONTS.Raleway,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.6,
        fontFamily: FONTS.Raleway,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
        fontFamily: FONTS.Raleway,
      },
      caption: {
        fontSize: "0.75rem",
        lineHeight: 1.5,
        fontFamily: FONTS.Raleway,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: "h1",
            h2: "h2",
            h3: "h3",
            h4: "h4",
            h5: "h5",
            h6: "h6",
            subtitle1: "h6",
            subtitle2: "h6",
            body1: "p",
            body2: "p",
            inherit: "p",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "0.625rem",
            padding: "8px 16px",
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            },
          },
          containedPrimary: {
            backgroundColor: colors.primary,
            color: "#000000",
          },
          containedSuccess: {
            backgroundColor: colors.green,
          },
          containedError: {
            backgroundColor: colors.red,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .Mui-disabled": {
              backgroundColor: colors.inputDisabled,
            },
            "& .Mui-focused": {
              // backgroundColor: colors.focusBackground,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.625rem",
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          standardError: {
            backgroundColor: colors.errorBackground,
          },
          standardSuccess: {
            backgroundColor: colors.greenBackground,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "0.625rem",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: mode === "light" ? "0px 1px 3px rgba(0, 0, 0, 0.1)" : "0px 1px 3px rgba(0, 0, 0, 0.3)",
          },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#ffffff" : "#1e1e1e",
            borderTop: `1px solid ${mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}`,
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            color: mode === "light" ? "#666666" : "#b0b0b0",
            "&.Mui-selected": {
              color: colors.primary,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === "light" ? "0px 2px 8px rgba(0, 0, 0, 0.1)" : "0px 2px 8px rgba(0, 0, 0, 0.3)",
            borderRadius: "0.625rem",
          },
        },
      },
    },
  });

  // Apply responsive typography
  theme = responsiveFontSizes(theme);

  return theme;
};

// Create the default theme (light mode)
const themeConfig = createAppTheme("light");

// Export both the default theme and the theme creator function
export { createAppTheme };
export default themeConfig;
