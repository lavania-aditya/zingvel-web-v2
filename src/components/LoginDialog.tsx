"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import { Edit as EditIcon, PhoneIphone as PhoneIcon, Looks6 as OtpIcon } from "@mui/icons-material";
import AdaptiveDialog from "./AdaptiveDialog";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { TextInputUi } from "./TextInputUi";
import { FONTS } from "@/utils/theme";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { login, verifyOTP, isLoading } = useAuth();

  // State for phone
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  // State for OTP timer
  const [otpTimer, setOtpTimer] = useState(120); // 2 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  // State for OTP
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      // Reset after dialog closes with a delay
      const timer = setTimeout(() => {
        setPhoneNumber("");
        setError("");
        setOtpSent(false);
        setOtp("");
        setOtpError("");
        setOtpTimer(120);
        setTimerActive(false);
      }, 300); // Match with dialog close animation

      return () => clearTimeout(timer);
    }
  }, [open]);

  // OTP timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerActive && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setTimerActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, otpTimer]);

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
      const success = await login(phoneNumber);
      if (success) {
        setOtpSent(true);
        setError("");
        // Start the timer
        setOtpTimer(120);
        setTimerActive(true);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch {
      setError("Failed to send OTP. Please try again.");
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      setOtp(value);
      setOtpError("");

      // Auto-focus next input
    }
  };

  // Handle verify OTP
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      // Verify OTP
      const success = await verifyOTP(phoneNumber, otpValue);
      if (success) {
        onClose(); // Close dialog on successful verification
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    } catch {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  // Handle edit phone number
  const handleEditPhoneNumber = () => {
    setOtpSent(false);
    setOtp("");
    setOtpError("");
    setTimerActive(false);
    setOtpTimer(120);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <AdaptiveDialog
      open={open}
      onClose={onClose}
      title="Welcome to ZingVel"
      fullWidth
      maxWidth="sm"
      // fullScreenMobile={isMobile}
      backButton={true}
      hideCloseButton={true}
      // hideTitleBar={true}
    >
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        {/* Right side with login form */}

        <Box sx={{ flex: "1 1 60%", p: { xs: 0, md: 2 } }}>
          <Typography variant="h4" sx={{ mt: 3, textAlign: "center" }}>
            Welcome to ZingVel
          </Typography>
          <Typography variant="h6" sx={{ mt: 1, textAlign: "center" }}>
            Your one-stop destination for amazing travel experiences
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", height: isMobile ? "100%" : "auto" }}>
            <Typography variant="subtitle1" sx={{ textAlign: "center", mt: isMobile ? 2 : 0, mb: 3 }}>
              Use Mobile Number or Email to continue
            </Typography>

            <TextInputUi
              label="Phone Number"
              value={phoneNumber}
              handleValueChange={handlePhoneNumberChange}
              errorMessage={error}
              startAdornment={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <PhoneIcon />{" "}
                  <Typography variant="subtitle2" sx={{ fontFamily: FONTS.text, fontSize: "1rem" }}>
                    +91
                  </Typography>
                </Box>
              }
              placeholder="8650XXXXXX"
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSendOTP}
              disabled={phoneNumber.length !== 10 || isLoading}
              sx={{
                py: 1.5,
                borderRadius: "4px",
                backgroundColor: theme.palette.primary.main,
                "&:disabled": {
                  backgroundColor: theme.palette.action.disabledBackground,
                  color: theme.palette.action.disabled,
                },
              }}
            >
              {isLoading ? <CircularProgress size={24} /> : "CONTINUE"}
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                my: 3,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "1px",
                  backgroundColor: theme.palette.divider,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  px: 2,
                  backgroundColor: theme.palette.background.paper,
                  position: "relative",
                  color: theme.palette.text.secondary,
                }}
              >
                Or
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: `1px solid ${theme.palette.divider}`,
                p: 1,
                borderRadius: 2,
                cursor: "pointer",
              }}
              onClick={handleGoogleLogin}
            >
              {/* <IconButton
                  sx={{
                    // border: `1px solid ${theme.palette.primary.main}`,
                    p: 1.5,
                    borderRadius: "50%",
                  }}
                > */}
              <Image src="/google-icon.svg" alt="Google" width={24} height={24} />
              {/* </IconButton> */}
              <Typography variant="subtitle2" color={theme.palette.text.disabled} sx={{ ml: 2 }}>
                Sign In with Google
              </Typography>
            </Box>

            {isMobile && (
              <Typography
                variant="caption"
                sx={{
                  textAlign: "center",
                  mt: "auto",
                  mb: 2,
                  pt: 4,
                  color: theme.palette.text.secondary,
                }}
              >
                By proceeding, you agree to MakeMyTrip&apos;s{" "}
                <Typography component="span" variant="caption" color="primary">
                  Privacy Policy
                </Typography>
                ,{" "}
                <Typography component="span" variant="caption" color="primary">
                  User Agreement
                </Typography>{" "}
                and{" "}
                <Typography component="span" variant="caption" color="primary">
                  T&Cs
                </Typography>
                .
              </Typography>
            )}
          </Box>

          {!otpSent ? (
            // Ph<one number input
            <></>
          ) : (
            // OTP verification
            <Box sx={{ display: "flex", flexDirection: "column", height: isMobile ? "100%" : "auto" }}>
              <Typography variant="h6" gutterBottom>
                Enter verification code
              </Typography>

              {/* Phone number display (disabled) */}
              <TextField
                fullWidth
                label="Phone Number"
                value={phoneNumber}
                disabled
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                }}
                sx={{ mb: 2 }}
              />

              {/* Edit phone number link */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                <Button variant="text" size="small" onClick={handleEditPhoneNumber} startIcon={<EditIcon fontSize="small" />}>
                  Edit number
                </Button>
              </Box>

              {otpError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {otpError}
                </Alert>
              )}

              <TextInputUi
                label="Enter OTP"
                value={otp}
                handleValueChange={handleOtpChange}
                errorMessage={otpError}
                startAdornment={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <OtpIcon />
                  </Box>
                }
                placeholder="8650XXXXXX"
              />

              {/* OTP input */}
              {/* <Stack direction="row" spacing={1} justifyContent="center" sx={{ my: 3 }}>
                {otp.map((digit, index) => (
                  <OtpInput
                    key={index}
                    id={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    inputProps={{ maxLength: 1, inputMode: "numeric" }}
                    autoFocus={index === 0}
                    inputRef={(el) => {
                      if (el) otpInputRefs.current[index] = el;
                    }}
                  />
                ))}
              </Stack> */}

              {/* Timer display */}
              {timerActive && (
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 1 }}>
                  Resend OTP in {formatTime(otpTimer)}
                </Typography>
              )}

              {/* Verify button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleVerifyOTP}
                disabled={otp.some((digit) => !digit) || isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: "4px",
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                {isLoading ? <CircularProgress size={24} /> : "Verify & Login"}
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Didn&apos;t receive the code?{" "}
                <Button variant="text" size="small" onClick={handleSendOTP} disabled={isLoading || timerActive}>
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
                    color: theme.palette.text.secondary,
                  }}
                >
                  By proceeding, you agree to MakeMyTrip&apos;s{" "}
                  <Typography component="span" variant="caption" color="primary">
                    Privacy Policy
                  </Typography>
                  ,{" "}
                  <Typography component="span" variant="caption" color="primary">
                    User Agreement
                  </Typography>{" "}
                  and{" "}
                  <Typography component="span" variant="caption" color="primary">
                    T&Cs
                  </Typography>
                  .
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
