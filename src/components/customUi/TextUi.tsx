"use client";

import { SxProps, Theme, Typography } from "@mui/material";

interface TextUiProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline";
  color?: string;
  align?: "left" | "center" | "right" | "justify";
  fontWeight?: "light" | "regular" | "medium" | "bold";
  lineHeight?: number;
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  sx?: SxProps<Theme>;
}

export const TextUi = ({
  children,
  variant = "body1",
  color = "text.primary",
  align = "left",
  fontWeight = "regular",
  lineHeight = 1.5,
  textTransform = "none",
  sx,
}: TextUiProps) => {
  return (
    <Typography variant={variant} color={color} align={align} fontWeight={fontWeight} lineHeight={lineHeight} textTransform={textTransform} sx={sx}>
      {children}
    </Typography>
  );
};
