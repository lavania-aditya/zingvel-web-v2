"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
  Stack,
  Alert,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import AdaptiveDialog from "./AdaptiveDialog";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
// import login_dialog from "@/assets/login_dialog.svg";

// OTP Input styled component
const OtpInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    textAlign: "center",
    fontSize: "1.5rem",
    padding: "8px",
    width: "40px",
    height: "40px",
  },
}));

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  // Use theme directly in the useMediaQuery hook to avoid unused variable warning
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
  const { login, verifyOTP, isAuthenticated, isLoading } = useAuth();

  // State for phone number and OTP
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  // Close dialog if user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  // Validate phone number with regex
  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
    return phoneRegex.test(phone);
  };

  // Handle phone number change
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError(null);
    }
  };

  // Handle send OTP
  const handleSendOTP = () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    login(phoneNumber);
    setOtpSent(true);
    setError(null);
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setOtpError(null);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      setOtpError("Please enter a valid 4-digit OTP");
      return;
    }

    const success = await verifyOTP(otpValue);
    if (!success) {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  // Handle edit phone number
  const handleEditPhoneNumber = () => {
    setOtpSent(false);
    setOtp(["", "", "", ""]);
    setOtpError(null);
  };

  // Handle key press for OTP inputs
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to previous input when backspace is pressed on empty input
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  return (
    <AdaptiveDialog open={open} onClose={onClose} title="Login / Sign Up" fullWidth maxWidth="md">
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        {/* Left side with login icon (hidden on mobile) */}
        {!isMobile && (
          <Box
            sx={{
              flex: "0 0 40%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              borderRadius: 1,
              p: 4,
            }}
          >
            <Image
              // component="img"
              src="/login_dialog.svg"
              alt="Login Dialog"
              width={400}
              height={400}
              // sx={{
              //   height: 40,
              //   maxWidth: '100%',
              //   objectFit: 'contain'
              // }}
            />
            {/* <IconButton onClick={toggleDrawer(false)}> */}
            {/* <CloseIcon /> */}
            {/* </IconButton> */}
            {/* </Box> */}
            {/* <Image src={login_dialog} alt="Login Dialog" width={200} height={200} /> */}
            {/* <Typography variant="h5" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" align="center">
              Log in to access your account and explore amazing travel experiences
            </Typography> */}
          </Box>
        )}

        {/* Right side with form */}
        <Box sx={{ flex: "1 1 60%", p: { xs: 0, md: 2 } }}>
          {!otpSent ? (
            // Phone number input
            <Box>
              <Typography variant="h5" gutterBottom>
                Welcome Back
              </Typography>
              <Typography variant="body2" align="center">
                Log in to access your account and explore amazing travel experiences
              </Typography>
              <Typography variant="h6" gutterBottom>
                Enter your phone number
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                We&apos;ll send you a one-time password to verify your number
              </Typography>

              <TextField
                fullWidth
                // label="Phone Number"
                variant="outlined"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                error={!!error}
                helperText={error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image
                        // component="img"
                        src="/indian_flag_input_icon.svg"
                        alt="Indian Flag"
                        width={25}
                        height={25}
                        // sx={{
                        //   height: 40,
                        //   maxWidth: '100%',
                        //   objectFit: 'contain'
                        // }}
                      />
                      {/* <IndianFlag /> */}
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter 10-digit number"
                sx={{ mb: 3 }}
              />

              <Button fullWidth variant="contained" size="large" onClick={handleSendOTP} disabled={phoneNumber.length !== 10 || isLoading}>
                {isLoading ? <CircularProgress size={24} /> : "Send OTP"}
              </Button>
            </Box>
          ) : (
            // OTP verification
            <Box>
              <Typography variant="h6" gutterBottom>
                Enter verification code
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Sent to: +91 {phoneNumber}
                </Typography>
                <IconButton size="small" onClick={handleEditPhoneNumber} sx={{ ml: 1 }}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>

              {otpError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {otpError}
                </Alert>
              )}

              <Stack direction="row" spacing={1} justifyContent="center" sx={{ my: 3 }}>
                {otp.map((digit, index) => (
                  <OtpInput
                    key={index}
                    id={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    inputProps={{ maxLength: 1, inputMode: "numeric" }}
                    autoFocus={index === 0}
                  />
                ))}
              </Stack>

              <Button fullWidth variant="contained" size="large" onClick={handleVerifyOTP} disabled={otp.some((digit) => !digit) || isLoading}>
                {isLoading ? <CircularProgress size={24} /> : "Verify & Login"}
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Didn&apos;t receive the code?{" "}
                <Button variant="text" size="small" onClick={handleSendOTP} disabled={isLoading}>
                  Resend
                </Button>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </AdaptiveDialog>
  );
};

export default LoginDialog;
