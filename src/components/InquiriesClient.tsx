"use client";

import { useEffect, useState, useCallback, memo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { getAllUserInquires } from "@/services/SInquires";
import { ILead, ILeadStages, LEAD_STATUS_COLORS } from "@/interfaces/ILead";
import { useAuth } from "@/context/AuthContext";
import LoginDialog from "./LoginDialog";
import { formatDate } from "@/utils/dateUtils";

const InquiriesClientBase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isAuthenticated, user } = useAuth();
  const [inquiries, setInquiries] = useState<ILead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<ILead | null>(null);
  const [openInquiryDialog, setOpenInquiryDialog] = useState(false);

  // Fetch inquiries from API
  const fetchInquiries = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      const response = await getAllUserInquires(userId);
      setInquiries(Array.isArray(response) ? response : response.content || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
      setError("Failed to load your inquiries. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch inquiries when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchInquiries(user.id);
    } else {
      setLoading(false);
    }
  }, [fetchInquiries, isAuthenticated, user]);

  // Handle inquiry card click
  const handleInquiryClick = useCallback((inquiry: ILead) => {
    setSelectedInquiry(inquiry);
    setOpenInquiryDialog(true);
  }, []);

  // Handle login button click
  const handleLoginClick = useCallback(() => {
    setOpenLoginDialog(true);
  }, []);

  // Handle successful login
  const handleLoginSuccess = useCallback(() => {
    if (user?.id) {
      fetchInquiries(user.id);
    }
  }, [fetchInquiries, user?.id]);

  // Get color styling for lead status
  const getStatusColor = useCallback(
    (stage: ILeadStages) => {
      const colors = LEAD_STATUS_COLORS[stage] || LEAD_STATUS_COLORS.dropped;
      return {
        backgroundColor: theme.palette.mode === "dark" ? colors.darkBg : colors.bg,
        color: theme.palette.mode === "dark" ? colors.darkText : colors.text,
      };
    },
    [theme.palette.mode]
  );

  if (!isAuthenticated) {
    return (
      <Container
        sx={{ py: 8, minHeight: "calc(100vh - 200px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.error.light,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            maxWidth: 600,
            width: "100%",
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Authentication Required
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            You need to log in to view your inquiries.
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={handleLoginClick}>
            Log In
          </Button>
        </Box>

        <LoginDialog
          open={openLoginDialog}
          onClose={() => {
            setOpenLoginDialog(false);
            if (user?.id) {
              handleLoginSuccess();
            }
          }}
        />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        My Inquiries
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <Typography>Loading your inquiries...</Typography>
        </Box>
      ) : error ? (
        <Box sx={{ backgroundColor: theme.palette.error.light, p: 3, borderRadius: 2 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : inquiries.length === 0 ? (
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h6">You don&apos;t have any inquiries yet.</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Browse our packages and submit an inquiry to get started.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {inquiries.map((inquiry) => (
            <Card
              key={inquiry.id}
              sx={{
                p: 3,
                cursor: "pointer",
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 3,
                },
              }}
              onClick={() => handleInquiryClick(inquiry)}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
                <Box>
                  <Typography variant="h6">{inquiry.packageName}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Package ID: {inquiry.packageId}
                  </Typography>

                  <Chip
                    label={inquiry.stage.charAt(0).toUpperCase() + inquiry.stage.slice(1)}
                    size="small"
                    sx={{
                      ...getStatusColor(inquiry.stage),
                      fontWeight: 500,
                    }}
                  />
                </Box>

                <Box sx={{ textAlign: { xs: "left", sm: "right" }, mt: { xs: 1, sm: 0 } }}>
                  <Typography variant="body2" color="text.secondary">
                    Submitted on {formatDate(inquiry.createdAt)}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://wa.me/919457234349?text=Regarding my inquiry for ${inquiry.packageName} (ID: ${inquiry.id})`, "_blank");
                    }}
                  >
                    Contact via WhatsApp
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      )}

      <Dialog
        open={openInquiryDialog}
        onClose={() => setOpenInquiryDialog(false)}
        fullScreen={isMobile}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: isMobile ? 0 : 2,
            margin: isMobile ? 0 : 2,
          },
        }}
      >
        {selectedInquiry && (
          <>
            <DialogTitle>
              <Typography variant="h6">Inquiry Details</Typography>
              <Chip
                label={selectedInquiry.stage.charAt(0).toUpperCase() + selectedInquiry.stage.slice(1)}
                size="small"
                sx={{
                  ...getStatusColor(selectedInquiry.stage),
                  fontWeight: 500,
                  ml: 1,
                }}
              />
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Package Information
                </Typography>
                <Typography variant="body1">Package ID: {selectedInquiry.packageId}</Typography>
                <Typography variant="body1">Package Name: {selectedInquiry.packageName}</Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  User Information
                </Typography>
                <Typography variant="body1">
                  Name: {selectedInquiry.user.firstName} {selectedInquiry.user.lastName}
                </Typography>
                <Typography variant="body1">
                  Phone: +{selectedInquiry.user.countryCode} {selectedInquiry.user.phNumber}
                </Typography>
                {selectedInquiry.user.email && <Typography variant="body1">Email: {selectedInquiry.user.email}</Typography>}
              </Box>

              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Inquiry Status
                </Typography>
                <Typography variant="body1">Status: {selectedInquiry.stage.charAt(0).toUpperCase() + selectedInquiry.stage.slice(1)}</Typography>
                <Typography variant="body1">Submitted: {formatDate(selectedInquiry.createdAt)}</Typography>
                <Typography variant="body1">Last Updated: {formatDate(selectedInquiry.updatedAt)}</Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenInquiryDialog(false)} color="inherit">
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  window.open(
                    `https://wa.me/919457234349?text=Regarding my inquiry for ${selectedInquiry.packageName} (ID: ${selectedInquiry.id})`,
                    "_blank"
                  );
                }}
              >
                Contact via WhatsApp
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export const InquiriesClient = memo(() => {
  return <InquiriesClientBase />;
});

InquiriesClient.displayName = "InquiriesClient";
