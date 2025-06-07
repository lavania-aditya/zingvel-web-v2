"use client";
import React, { useMemo } from "react";
import "../styles/app.scss";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeOptions, ThemeProvider as MuiThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import { createAppTheme } from "./theme";
import { useThemeContext } from "@/context/ThemeContext";

interface IProps {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<IProps> = (props: IProps) => {
  const { mode } = useThemeContext();
  
  const muiTheme = useMemo((): ThemeOptions => {
    let theme = createTheme(createAppTheme(mode));
    theme = responsiveFontSizes(theme);
    return theme;
  }, [mode]);

  return (
    <AppRouterCacheProvider options={{ key: "css" }}>
      <MuiThemeProvider theme={muiTheme}>
        <React.Fragment>{props.children}</React.Fragment>
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
};
