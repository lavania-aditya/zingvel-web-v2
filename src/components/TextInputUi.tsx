import { FONTS } from "@/utils/theme";
import { TextField, InputAdornment, Box, useTheme, Typography } from "@mui/material";

interface IProps {
  label?: string;
  value: string;
  placeholder?: string;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  autoFocus?: boolean;
}

export const TextInputUi = (props: IProps): React.ReactNode => {
  const theme = useTheme();

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
        onChange={props.handleValueChange}
        error={!!props.errorMessage}
        helperText={props.errorMessage}
        slotProps={{
          input: {
            autoFocus: props.autoFocus,
            sx: {
              fontFamily: FONTS.text,
              fontSize: "1rem",
              "& fieldSet": { borderColor: props.errorMessage ? theme.palette.error.main : theme.palette.grey[200] },
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
        }}
      />
    </Box>
  );
};
