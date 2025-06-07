"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Stack,
  IconButton,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import AdaptiveDialog from "./AdaptiveDialog";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

// Styled OTP input field
const OtpInput = styled(TextField)(({ theme }) => ({
  width: "40px",
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    height: "48px",
    width: "48px",
    padding: 0,
    textAlign: "center",
    "& input": {
      textAlign: "center",
      padding: 0,
    },
  },
}));

const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { login, verifyOTP, isLoading } = useAuth();

  // State for phone
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  // State for OTP
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      // Reset after dialog closes with a delay
      const timer = setTimeout(() => {
        setPhoneNumber("");
        setError("");
        setOtpSent(false);
        setOtp(["", "", "", "", "", ""]);
        setOtpError("");
      }, 300); // Match with dialog close animation

      return () => clearTimeout(timer);
    }
  }, [open]);

  // Handle phone number input
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError("");
    }
  };

  // Handle send OTP
  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      // Call login API
      await login(phoneNumber);
      setOtpSent(true);
      setError("");
    } catch {
      setError("Failed to send OTP. Please try again.");
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setOtpError("");

      // Auto-focus next input
      if (value && index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace and arrow keys in OTP input
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle verify OTP
  const handleVerifyOTP = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      await verifyOTP(phoneNumber, otpValue);
      onClose(); // Close dialog on successful verification
    } catch {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  // Handle edit phone number
  const handleEditPhoneNumber = () => {
    setOtpSent(false);
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
  };

  return (
    <AdaptiveDialog 
      open={open} 
      onClose={onClose} 
      title="Login / Signup to" 
      fullWidth 
      maxWidth="md"
      fullScreenMobile={isMobile}
      backButton={isMobile}
      hideCloseButton={isMobile}
    >
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        {/* Left side with login icon (hidden on mobile) */}
        {!isMobile && (
          <Box
            sx={{
              flex: "1 1 40%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              bgcolor: "primary.light",
              borderRadius: 1,
            }}
          >
            <Image
              src="/login_illustration.svg"
              alt="Login"
              width={250}
              height={250}
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <Typography variant="h5" sx={{ mt: 3, textAlign: "center" }}>
              Welcome to ZingVel
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
              Your one-stop destination for amazing travel experiences
            </Typography>
          </Box>
        )}

        {/* Right side with login form */}
        <Box sx={{ flex: "1 1 60%", p: { xs: 0, md: 2 } }}>
          {!otpSent ? (
            // Phone number input
            <Box sx={{ display: "flex", flexDirection: "column", height: isMobile ? "100%" : "auto" }}>
              {!isMobile && (
                <>
                  <Typography variant="h5" gutterBottom>
                    Welcome Back
                  </Typography>
                  <Typography variant="body2" align="center">
                    Log in to access your account and explore amazing travel experiences
                  </Typography>
                </>
              )}
              
              <Typography variant="body1" sx={{ textAlign: "center", mt: isMobile ? 2 : 0, mb: 3 }}>
                Use Mobile Number or Email to Login/Signup
              </Typography>

              <TextField
                fullWidth
                variant="outlined"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                error={!!error}
                helperText={error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Image
                          src="/indian_flag_input_icon.svg"
                          alt="Indian Flag"
                          width={24}
                          height={24}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>+91</Typography>
                      </Box>
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter Mobile No./Email"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '4px',
                  }
                }}
              />

              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                onClick={handleSendOTP} 
                disabled={phoneNumber.length !== 10 || isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: '4px',
                  backgroundColor: theme.palette.primary.main,
                  '&:disabled': {
                    backgroundColor: theme.palette.action.disabledBackground,
                    color: theme.palette.action.disabled
                  }
                }}
              >
                {isLoading ? <CircularProgress size={24} /> : "CONTINUE"}
              </Button>
              
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                position: "relative",
                my: 3
              }}>
                <Box sx={{ 
                  position: "absolute", 
                  left: 0, 
                  right: 0, 
                  height: "1px", 
                  backgroundColor: theme.palette.divider 
                }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    px: 2, 
                    backgroundColor: theme.palette.background.paper, 
                    position: "relative", 
                    color: theme.palette.text.secondary 
                  }}
                >
                  Or Login / Signup With
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton 
                  sx={{ 
                    border: "1px solid", 
                    borderColor: theme.palette.divider,
                    p: 1.5,
                    borderRadius: "50%"
                  }}
                >
                  <Image 
                    src="/google-icon.svg" 
                    alt="Google" 
                    width={24} 
                    height={24}
                  />
                </IconButton>
              </Box>
              
              {isMobile && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    textAlign: "center", 
                    mt: "auto", 
                    mb: 2, 
                    pt: 4,
                    color: theme.palette.text.secondary 
                  }}
                >
                  By proceeding, you agree to MakeMyTrip&apos;s <Typography component="span" variant="caption" color="primary">Privacy Policy</Typography>, <Typography component="span" variant="caption" color="primary">User Agreement</Typography> and <Typography component="span" variant="caption" color="primary">T&Cs</Typography>.
                </Typography>
              )}
            </Box>
          ) : (
            // OTP verification
            <Box sx={{ display: "flex", flexDirection: "column", height: isMobile ? "100%" : "auto" }}>
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

              <Button 
                fullWidth 
                variant="contained" 
                size="large" 
                onClick={handleVerifyOTP} 
                disabled={otp.some((digit) => !digit) || isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: '4px',
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                {isLoading ? <CircularProgress size={24} /> : "Verify & Login"}
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Didn&apos;t receive the code?{" "}
                <Button variant="text" size="small" onClick={handleSendOTP} disabled={isLoading}>
                  Resend
                </Button>
              </Typography>
              
              {isMobile && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    textAlign: "center", 
                    mt: "auto", 
                    mb: 2, 
                    pt: 4,
                    color: theme.palette.text.secondary 
                  }}
                >
                  By proceeding, you agree to MakeMyTrip&apos;s <Typography component="span" variant="caption" color="primary">Privacy Policy</Typography>, <Typography component="span" variant="caption" color="primary">User Agreement</Typography> and <Typography component="span" variant="caption" color="primary">T&Cs</Typography>.
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </AdaptiveDialog>
  );
};

export default LoginDialog;
