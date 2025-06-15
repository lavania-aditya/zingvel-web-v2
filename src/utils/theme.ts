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
  common: {
    white: "#ffffff",
    black: "#000000",
    defaultBackground: "#ffffff",
    inputDisabled: "#F2F4F5",
  },
  grey: {
    50: "#F8F9FA",
    100: "#E8EBED",
    200: "#B6BDC2",
    300: "#83898C",
    400: "#5E6366",
    500: "#2B2F32",
    600: "#212529",
    700: "#1A1E21",
    800: "#151819",
    900: "#0D0F10",
    A100: "#F2F4F5",
    A200: "#E8EBED",
    A400: "#B6BDC2",
    A700: "#616161",
  },
  primary: {
    main: "#FCA21A",
    light: "#fca21a99",
    dark: "#E69200",
  },
  secondary: {
    main: "#333333",
    light: "#595959",
    dark: "#1A1A1A",
  },
  success: {
    main: "#2E7D32",
    light: "#2E7D3299",
    dark: "#2E7D32",
  },
  error: {
    main: "#D32F2F",
    light: "#D32F2F99",
    dark: "#D32F2F",
  },
  warning: {
    main: "#FCA21A",
    light: "#FCA21A99",
    dark: "#FCA21A",
  },
  info: {
    main: "#2196F3",
    light: "#2196F399",
    dark: "#2196F3",
  },
};

// Define palette options for light and dark modes
const getPalette = (mode: PaletteMode): PaletteOptions => ({
  mode,
  common: colors.common,
  primary: {
    main: colors.primary.main,
    light: colors.primary.light, // Lighter shade of primary
    dark: colors.primary.dark, // Darker shade of primary
    contrastText: colors.common.white,
  },
  secondary: {
    main: colors.secondary.main,
    light: colors.secondary.light,
    dark: colors.secondary.dark,
    contrastText: colors.common.white,
  },
  background: {
    default: mode === "light" ? colors.common.defaultBackground : "#121212",
    paper: mode === "light" ? colors.common.defaultBackground : colors.common.defaultBackground,
  },
  text: {
    primary: mode === "light" ? colors.common.black : colors.common.white,
    secondary: mode === "light" ? colors.common.black : colors.common.white,
  },
  success: {
    main: colors.success.main,
    light: colors.success.light,
    dark: colors.success.dark,
    contrastText: colors.common.white,
  },
  error: {
    main: colors.error.main,
    light: colors.error.light,
    dark: colors.error.dark,
    contrastText: colors.common.white,
  },
  warning: {
    main: colors.warning.main,
    light: colors.warning.light,
    dark: colors.warning.dark,
    contrastText: colors.common.white,
  },
  info: {
    main: colors.info.main,
    light: colors.info.light,
    dark: colors.info.dark,
    contrastText: colors.common.white,
  },
  grey: {
    50: colors.grey[50],
    100: colors.grey[100],
    200: colors.grey[200],
    300: colors.grey[300],
    400: colors.grey[400],
    500: colors.grey[500],
    600: colors.grey[600],
    700: colors.grey[700],
    800: colors.grey[800],
    900: colors.grey[900],
    A100: colors.grey["A100"],
    A200: colors.grey["A200"],
    A400: colors.grey["A400"],
    A700: colors.grey["A700"],
  },
  divider: mode === "light" ? colors.grey["A100"] : colors.grey["A700"],
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
            color: `${colors.common.white} !important`,
            borderRadius: "0.625rem",
            padding: "8px 16px",
            "&:disabled": {
              backgroundColor: colors.common.inputDisabled,
              pointerEvents: "none !important",
            },
            "&.MuiButton-outlined": {
              color: `${colors.common.black} !important`,
            },
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: `1px solid ${colors.grey["A100"]}`,
            },
          },
          containedPrimary: {
            backgroundColor: colors.primary.main,
            color: colors.common.black,
          },
          containedSuccess: {
            backgroundColor: colors.success.main,
          },
          containedError: {
            backgroundColor: colors.error.main,
          },

          outlinedPrimary: {
            // root: {
            color: `${colors.secondary.main} !important`,
            // backgroundColor: "red",
            // },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .Mui-disabled": {
              backgroundColor: colors.common.inputDisabled,
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
            backgroundColor: colors.error.main,
          },
          standardSuccess: {
            backgroundColor: colors.success.main,
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
            boxShadow: mode === "light" ? `1px solid ${colors.grey["A100"]}` : `1px solid ${colors.grey["A700"]}`,
          },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? colors.common.defaultBackground : colors.common.defaultBackground,
            borderTop: `1px solid ${mode === "light" ? colors.grey["A100"] : colors.grey["A700"]}`,
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            color: mode === "light" ? "#666666" : "#b0b0b0",
            "&.Mui-selected": {
              color: colors.primary.main,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === "light" ? `1px solid ${colors.grey["A100"]}` : `1px solid ${colors.grey["A700"]}`,
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
