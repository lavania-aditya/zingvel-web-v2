import { SxProps, Theme, Button } from "@mui/material";

interface ButtonUiProps {
  children: React.ReactNode;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  href?: string;
  type?: "button" | "submit" | "reset";
}

export const ButtonUi = ({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  disabled = false,
  startIcon,
  endIcon,
  sx,
  onClick,
  href,
  type = "button"
}: ButtonUiProps) => {
  return (
    <Button 
      variant={variant} 
      color={color} 
      size={size} 
      disabled={disabled} 
      startIcon={startIcon} 
      endIcon={endIcon} 
      sx={{
        borderRadius: '0.625rem',
        ...sx
      }}
      onClick={onClick}
      href={href}
      type={type}
    >
      {children}
    </Button>
  );
};
