import { FONTS } from "@/utils/theme";
import { TextField, InputAdornment, Box, useTheme, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export type TextInputSize = "small" | "medium";
export type TextInputType = "text" | "password" | "number" | "email" | "tel" | "url" | "search" | "date";

interface IProps {
  label?: string;
  value: string;
  placeholder?: string;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errorMessage?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  autoFocus?: boolean;
  disabled?: boolean;
  type?: TextInputType;
  size?: TextInputSize;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  required?: boolean;
  validate?: (value: string) => string | undefined;
  name?: string;
}

export const TextInputUi = (props: IProps): React.ReactNode => {
  const theme = useTheme();
  const [internalError, setInternalError] = useState<string | undefined>(undefined);

  // Destructure props for use in useEffect
  const { validate, value, errorMessage: externalError } = props;

  // Determine which error message to display (external or internal validation)
  const errorMessage = externalError || internalError;

  // Run custom validation when value changes
  useEffect(() => {
    if (validate) {
      const validationError = validate(value);
      setInternalError(validationError);
    } else {
      setInternalError(undefined);
    }
  }, [validate, value]);

  return (
    <Box
      sx={{
        position: "relative", // border: "1px solid red"
      }}
    >
      {props.label && (
        <Typography
          variant="subtitle2"
          sx={{
            position: "absolute",
            top: -10,
            left: 15,
            padding: "0 8px",
            pointerEvents: "none",
            color: theme.palette.grey[600],
            backgroundColor: theme.palette.background.paper,
            zIndex: 1,
            fontWeight: "light",
            letterSpacing: "0.02em",
          }}
        >
          {props.label}
        </Typography>
      )}
      <TextField
        fullWidth
        variant="outlined"
        value={props.value}
        disabled={props.disabled}
        onChange={props.handleValueChange}
        error={!!errorMessage}
        helperText={errorMessage}
        type={props.type || "text"}
        size={props?.size || "medium"}
        multiline={props.multiline}
        rows={props.rows}
        maxRows={props.maxRows}
        required={props.required}
        name={props.name}
        slotProps={{
          input: {
            autoFocus: props.autoFocus,
            sx: {
              fontFamily: FONTS.text,
              fontSize: "1rem",
              "& fieldSet": { borderColor: errorMessage ? theme.palette.error.main : theme.palette.grey[200] },
              // backgroundColor: "red",
              paddingTop: "0.5rem",
            },
            startAdornment: props.startAdornment && (
              <InputAdornment position="start">
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                  <Box component="span">{props.startAdornment}</Box>
                  <Box component="span" sx={{ width: "0.1rem", height: "1.2rem", backgroundColor: theme.palette.grey[400] }} />
                </Box>
              </InputAdornment>
            ),
            endAdornment: props.endAdornment && (
              <InputAdornment position="end">
                {/* <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontFamily: FONTS.text, fontSize: "1.2rem" }}>
                    |
                  </Typography> */}
                {/* <Box component="span"> */}
                {props.endAdornment}
                {/* </Box> */}
                {/* </Box> */}
              </InputAdornment>
            ),
          },
        }}
        placeholder={props.placeholder}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
          "& .Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
            opacity: 0.7,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.action.disabled,
            },
          },
          "& .MuiInputBase-input": {
            px: props.size === "small" ? 1 : 2,
            py: props.size === "small" ? 1.2 : 1.5,
          },
        }}
      />
    </Box>
  );
};
