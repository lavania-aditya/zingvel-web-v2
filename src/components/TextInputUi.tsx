import { FONTS } from "@/utils/theme";
import { TextField, InputAdornment, Box, useTheme, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export type TextInputSize = 'small' | 'medium' | 'large';
export type TextInputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'search';

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
  
  // Get size-specific styles
  const getSizeStyles = () => {
    switch(props.size) {
      case 'small':
        return { 
          '& .MuiInputBase-input': { padding: '8px 14px' },
          '& .MuiInputLabel-root': { fontSize: '0.875rem' }
        };
      case 'large':
        return { 
          '& .MuiInputBase-input': { padding: '16px 14px' },
          '& .MuiInputLabel-root': { fontSize: '1.1rem' }
        };
      default: // medium
        return {};
    }
  };

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
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.background.paper,
            zIndex: 1,
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
        type={props.type || 'text'}
        size={props.size === 'small' ? 'small' : 'medium'}
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
              fontSize: props.size === 'small' ? "0.875rem" : props.size === 'large' ? "1.125rem" : "1rem",
              "& fieldSet": { borderColor: errorMessage ? theme.palette.error.main : theme.palette.grey[200] },
            },
            startAdornment: props.startAdornment && (
              <InputAdornment position="start">
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                  <Box component="span">{props.startAdornment}</Box>
                  <Typography variant="subtitle2" sx={{ fontFamily: FONTS.text, fontSize: "1.2rem" }}>
                    |
                  </Typography>
                </Box>
              </InputAdornment>
            ),
            endAdornment: props.endAdornment && (
              <InputAdornment position="end">
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontFamily: FONTS.text, fontSize: "1.2rem" }}>
                    |
                  </Typography>
                  <Box component="span">{props.endAdornment}</Box>
                </Box>
              </InputAdornment>
            ),
          },
        }}
        placeholder={props.placeholder}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: "4px",
          },
          "& .Mui-disabled": {
            backgroundColor: theme.palette.action.disabledBackground,
            opacity: 0.7,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.action.disabled,
            },
          },
          ...getSizeStyles(),
        }}
      />
    </Box>
  );
};
