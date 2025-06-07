import { SxProps, Theme, TextField } from "@mui/material";

interface TextInputUiProps {
  children?: React.ReactNode;
  variant?: "standard" | "outlined" | "filled";
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  size?: "small" | "medium";
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  fullWidth?: boolean;
  type?: string;
}

export const TextInputUi = ({
  children,
  variant = "outlined",
  color = "primary",
  size = "medium",
  disabled = false,
  label,
  placeholder,
  value,
  onChange,
  sx,
  startAdornment,
  endAdornment,
  fullWidth = false,
  type = "text",
}: TextInputUiProps) => {
  return (
    <TextField
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '0.625rem'
        },
        ...sx
      }}
      fullWidth={fullWidth}
      type={type}
      InputProps={{
        startAdornment: startAdornment,
        endAdornment: endAdornment,
      }}
    >
      {children}
    </TextField>
  );
};
