"use client";
import { createTheme, responsiveFontSizes, Theme, PaletteMode, PaletteOptions } from "@mui/material/styles";

export const FONTS = {
  heading: "var(--font-ubuntu)",
  subheading: "var(--font-raleway)",
  text: "var(--font-raleway)",
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
  primary500: "#fca21a99",
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
  white: "#ffffff",
};

// Define palette options for light and dark modes
const getPalette = (mode: PaletteMode): PaletteOptions => ({
  mode,
  primary: {
    main: "#FCA21A",
    light: "#fca21a99", // Lighter shade of primary
    dark: "#E69200", // Darker shade of primary
    contrastText: "#000000",
  },
  secondary: {
    // main: "#DDE2E5", // new color code,
    // light: "#E8EBED", // Lighter shade of grey
    // dark: "#B6BDC2", // Darker shade of grey
    // contrastText: "#000000",
    main: "#333333",
    light: "#595959",
    dark: "#1A1A1A",
    contrastText: "#FFFFFF",
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
    main: "#2E7F49",
    light: "#4caf50cc",
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
        fontFamily: FONTS.heading,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
        lineHeight: 1.3,
        fontFamily: FONTS.heading,
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 600,
        lineHeight: 1.3,
        fontFamily: FONTS.heading,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
        fontFamily: FONTS.heading,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: 1.4,
        fontFamily: FONTS.subheading,
      },
      h6: {
        fontSize: "1.125rem",
        fontWeight: 500,
        lineHeight: 1.5,
        fontFamily: FONTS.subheading,
      },
      subtitle1: {
        fontSize: "1rem",
        lineHeight: 1.5,
        fontFamily: FONTS.text,
      },
      subtitle2: {
        fontSize: "0.875rem",
        lineHeight: 1.6,
        fontFamily: FONTS.text,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
        fontFamily: FONTS.text,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.6,
        fontFamily: FONTS.text,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
        fontFamily: FONTS.text,
      },
      caption: {
        fontSize: "0.75rem",
        lineHeight: 1.5,
        fontFamily: FONTS.subheading,
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
            color: `${colors.white} !important`,
            borderRadius: "0.625rem",
            padding: "8px 16px",
            "&:disabled": {
              backgroundColor: `${colors.primary500} !important`,
            },
            "&.MuiButton-outlined": {
              color: `${colors.black[500]} !important`,
            },
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

          outlinedPrimary: {
            // root: {
            color: `${colors.black} !important`,
            // },
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
