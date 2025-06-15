"use client";

import { useEffect, useState, useCallback, memo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Pagination,
  Skeleton,
  IconButton,
  SwipeableDrawer,
  Divider,
} from "@mui/material";
import {
  WhatsApp as WhatsAppIcon,
  AccessTime as AccessTimeIcon,
  Close as CloseIcon,
  CalendarMonth as CalendarIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { getAllUserInquires } from "@/services/SInquires";
import { ILead, ILeadStages, LEAD_STATUS_COLORS } from "@/interfaces/ILead";
import { useAuth } from "@/context/AuthContext";
import MediaFallback from "./MediaFallback";
import LoginDialog from "./LoginDialog";
import { formatDate } from "@/utils/dateUtils";
import { useRouter } from "next/navigation";

const leadStatusText: Record<ILeadStages, string> = {
  converted: "Your package has been confirmed!",
  invalid: "Your inquiry has been rejected.",
  dropped: "Your inquiry has been dropped.",
  new: "Your inquiry is being reviewed.",
  valid: "Your inquiry has been validated and is being processed.",
};

const InquiriesClientBase = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isAuthenticated, user } = useAuth();
  const [inquiries, setInquiries] = useState<ILead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<ILead | null>(null);
  const [openInquiryDialog, setOpenInquiryDialog] = useState(false);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  // Fetch inquiries from API with pagination
  const fetchInquiries = useCallback(
    async (userId: string, page: number = 1) => {
      try {
        setLoading(true);
        const response = await getAllUserInquires(userId, page, itemsPerPage);
        setInquiries(response.items || []);
        setTotalPages(Math.ceil(response.total / itemsPerPage) || 1);
        setCurrentPage(page);
        setError(null);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
        setError("Failed to load your inquiries. Please try again later.");
        setInquiries([]);
      } finally {
        setLoading(false);
      }
    },
    [itemsPerPage]
  );

  // Fetch inquiries when user is authenticated or page changes
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchInquiries(user.id, currentPage);
    } else if (!isAuthenticated) {
      setLoading(false);
    }
  }, [fetchInquiries, isAuthenticated, user, currentPage]);

  // Handle page change
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Handle inquiry card click
  const handleInquiryClick = useCallback(
    (inquiry: ILead) => {
      setSelectedInquiry(inquiry);
      if (isMobile) {
        setOpenBottomSheet(true);
      } else {
        setOpenInquiryDialog(true);
      }
    },
    [isMobile]
  );

  // Handle login dialog close
  const handleLoginDialogClose = useCallback(() => {
    setOpenLoginDialog(false);

    // If user is not authenticated after closing the dialog, redirect to home
    if (!isAuthenticated) {
      router.push("/");
    } else if (user?.id) {
      fetchInquiries(user.id, currentPage);
    }
  }, [isAuthenticated, router, user, fetchInquiries, currentPage]);

  // Using leadStatusText directly in the component

  // Authentication check and redirect
  useEffect(() => {
    if (!isAuthenticated && !openLoginDialog) {
      setOpenLoginDialog(true);
    }
  }, [isAuthenticated, openLoginDialog]);

  // Shimmer loading for inquiry cards
  const InquiryCardSkeleton = () => (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 2, overflow: "hidden" }}>
      <Skeleton variant="rectangular" height={140} />
      <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Skeleton variant="rectangular" width="80%" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width="60%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width="40%" height={20} sx={{ mb: "auto" }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Skeleton variant="rectangular" width="40%" height={36} />
          <Skeleton variant="rectangular" width="15%" height={36} sx={{ borderRadius: "50%" }} />
        </Box>
      </Box>
    </Card>
  );

  // If not authenticated, show login dialog and redirect to home on close
  if (!isAuthenticated) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          My Inquiries
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <Typography variant="body1" color="text.secondary">
            Loading...
          </Typography>
        </Box>

        <LoginDialog open={openLoginDialog} onClose={handleLoginDialogClose} />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        My Inquiries
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", mb: 4 }}>
          {[...Array(12)].map((_, index) => (
            <Box
              key={`shimmer-${index}`}
              sx={{
                padding: 1.5,
                width: { xs: "100%", sm: "50%", md: "33.333%" },
                flexGrow: 0,
              }}
            >
              <InquiryCardSkeleton />
            </Box>
          ))}
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography color="error" variant="body1" gutterBottom>
            {error}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => user?.id && fetchInquiries(user.id, currentPage)}>
            Try Again
          </Button>
        </Box>
      ) : inquiries.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No inquiries found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You haven&apos;t made any travel inquiries yet.
          </Typography>
          <Button variant="contained" color="primary" href="/packages">
            Explore Packages
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            {inquiries.map((inquiry) => (
              <Box
                key={inquiry.id}
                sx={{
                  padding: 1.5,
                  width: { xs: "100%", sm: "50%", md: "33.333%" },
                  flexGrow: 0,
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => handleInquiryClick(inquiry)}
                >
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography variant="h6" component="h2" noWrap gutterBottom>
                      {inquiry.packageName || "Package Inquiry"}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        my: 2,
                        py: 1,
                        px: 2,
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? LEAD_STATUS_COLORS[inquiry.stage]?.darkBg || theme.palette.grey[700]
                            : LEAD_STATUS_COLORS[inquiry.stage]?.bg || theme.palette.grey[200],
                        color:
                          theme.palette.mode === "dark"
                            ? LEAD_STATUS_COLORS[inquiry.stage]?.darkText || theme.palette.common.white
                            : LEAD_STATUS_COLORS[inquiry.stage]?.text || theme.palette.common.black,
                        // borderWidth: "1rem",
                        // borderColor: "red",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          pb: 0.5,
                          letterSpacing: 1.2,
                          color: LEAD_STATUS_COLORS[inquiry.stage]?.text || theme.palette.common.black,
                          fontWeight: 500,
                        }}
                      >
                        {inquiry.stage.charAt(0).toUpperCase() + inquiry.stage.slice(1)}
                      </Typography>
                      <Typography variant="caption" sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "100%" }}>
                        {leadStatusText[inquiry.stage]}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography variant="caption">{formatDate(inquiry.createdAt)}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ mt: "auto", pt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Button
                        fullWidth
                        startIcon={
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
                              <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4c-4.38 0-7.93 3.56-7.93 7.93a7.9 7.9 0 0 0 1.07 3.98L4 20l4.17-1.09a7.9 7.9 0 0 0 3.79.96h.01c4.38 0 7.93-3.56 7.93-7.94 0-2.12-.82-4.11-2.3-5.61zm-5.55 12.17h-.01a6.57 6.57 0 0 1-3.35-.92l-.24-.14-2.48.65.66-2.42-.16-.25a6.57 6.57 0 0 1-1-3.48c0-3.64 2.96-6.6 6.6-6.6a6.56 6.56 0 0 1 4.66 1.93 6.56 6.56 0 0 1 1.93 4.67c0 3.64-2.97 6.6-6.6 6.6zm3.61-4.94c-.2-.1-1.18-.58-1.36-.65-.18-.07-.32-.1-.45.1-.13.2-.5.65-.62.78-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.99-.59-.53-.99-1.18-1.1-1.38-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.07-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.33-.45-.34-.11-.01-.25-.01-.38-.01-.13 0-.34.05-.52.25-.18.2-.68.67-.68 1.63 0 .96.7 1.9.8 2.03.1.13 1.4 2.13 3.38 2.99.47.2.84.32 1.13.41.48.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.17-.46.17-.86.12-.94-.05-.08-.19-.13-.4-.23z" />
                            </svg>
                          </>
                        }
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `https://wa.me/919457234349?text=Regarding my inquiry for ${inquiry.packageName} (ID: ${inquiry.id})`,
                            "_blank"
                          );
                        }}
                      >
                        Contact via whatsapp
                      </Button>
                      {/* <IconButton size="small" color="primary">
                        <ArrowForwardIcon />
                      </IconButton> */}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" showFirstButton showLastButton />
            </Box>
          )}
        </>
      )}

      {/* Desktop Dialog for Inquiry Details */}
      <Dialog
        open={openInquiryDialog && selectedInquiry !== null}
        onClose={() => setOpenInquiryDialog(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDialog-paper": {
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      >
        {selectedInquiry && (
          <>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
              <Typography variant="h6">Inquiry Details</Typography>
              <IconButton onClick={() => setOpenInquiryDialog(false)} size="small">
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <Box sx={{ position: "relative", height: 200 }}>
              {selectedInquiry.packageId ? (
                <CardMedia
                  component="div"
                  sx={{
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  image={`https://source.unsplash.com/featured/?travel,${selectedInquiry.packageName.split(" ")[0]}`}
                />
              ) : (
                <MediaFallback height={200} />
              )}
              <Chip
                label={selectedInquiry.stage.charAt(0).toUpperCase() + selectedInquiry.stage.slice(1)}
                size="small"
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? LEAD_STATUS_COLORS[selectedInquiry.stage]?.darkBg || theme.palette.grey[700]
                      : LEAD_STATUS_COLORS[selectedInquiry.stage]?.bg || theme.palette.grey[200],
                  color:
                    theme.palette.mode === "dark"
                      ? LEAD_STATUS_COLORS[selectedInquiry.stage]?.darkText || theme.palette.common.white
                      : LEAD_STATUS_COLORS[selectedInquiry.stage]?.text || theme.palette.common.black,
                  fontWeight: 500,
                }}
              />
            </Box>

            <DialogContent dividers>
              {/* Package Information */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {selectedInquiry.packageName || "Package Inquiry"}
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AccessTimeIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(selectedInquiry.createdAt)}
                  </Typography>
                </Box>

                <Typography variant="body1" gutterBottom>
                  <strong>Package ID:</strong> {selectedInquiry.packageId || "N/A"}
                </Typography>
              </Box>

              {/* Inquiry Status */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Inquiry Status
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2" sx={{ mb: 1 }}>
                  {selectedInquiry.stage === "converted" || selectedInquiry.stage === "valid"
                    ? "Your package has been confirmed!"
                    : selectedInquiry.stage === "new"
                    ? "Your inquiry is being reviewed."
                    : "Your inquiry has been validated and is being processed."}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>Submitted:</strong> {formatDate(selectedInquiry.createdAt)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>Last Updated:</strong> {formatDate(selectedInquiry.updatedAt)}
                  </Typography>
                </Box>
              </Box>
              
              {/* User Information */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Contact Information
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PhoneIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    +{selectedInquiry.user.countryCode} {selectedInquiry.user.phNumber}
                  </Typography>
                </Box>

                {selectedInquiry.user.email && (
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <EmailIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">{selectedInquiry.user.email}</Typography>
                  </Box>
                )}

                <Typography variant="body2" color="text.secondary">
                  <strong>Name:</strong> {selectedInquiry.user.firstName} {selectedInquiry.user.lastName}
                </Typography>
              </Box>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenInquiryDialog(false)} color="inherit">
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<WhatsAppIcon />}
                onClick={() => {
                  window.open(
                    `https://wa.me/919457234349?text=Regarding my inquiry for ${selectedInquiry?.packageName} (ID: ${selectedInquiry?.id})`,
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

      {/* Mobile Bottom Sheet for Inquiry Details */}
      <SwipeableDrawer
        anchor="bottom"
        open={openBottomSheet && selectedInquiry !== null}
        onClose={() => setOpenBottomSheet(false)}
        onOpen={() => {}}
        disableSwipeToOpen
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: "90vh",
          },
        }}
      >
        {selectedInquiry && (
          <>
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
              <Typography variant="h6">Inquiry Details</Typography>
              <IconButton edge="end" onClick={() => setOpenBottomSheet(false)}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            
            <Box sx={{ position: "relative", height: 180 }}>
              {selectedInquiry.packageId ? (
                <CardMedia
                  component="div"
                  sx={{
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  image={`https://source.unsplash.com/featured/?travel,${selectedInquiry.packageName.split(" ")[0]}`}
                />
              ) : (
                <MediaFallback height={180} />
              )}
              <Chip
                label={selectedInquiry.stage.charAt(0).toUpperCase() + selectedInquiry.stage.slice(1)}
                size="small"
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? LEAD_STATUS_COLORS[selectedInquiry.stage]?.darkBg || theme.palette.grey[700]
                      : LEAD_STATUS_COLORS[selectedInquiry.stage]?.bg || theme.palette.grey[200],
                  color:
                    theme.palette.mode === "dark"
                      ? LEAD_STATUS_COLORS[selectedInquiry.stage]?.darkText || theme.palette.common.white
                      : LEAD_STATUS_COLORS[selectedInquiry.stage]?.text || theme.palette.common.black,
                  fontWeight: 500,
                }}
              />
            </Box>
            
            <Typography variant="h6" sx={{ px: 3, pt: 2, pb: 1 }}>
              {selectedInquiry.packageName}
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", px: 3, pb: 2 }}>
              <AccessTimeIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {formatDate(selectedInquiry.createdAt)}
              </Typography>
            </Box>
            
            <DialogContent dividers>
              {/* Inquiry Status */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Inquiry Status
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2" sx={{ mb: 1 }}>
                  {selectedInquiry.stage === "converted" || selectedInquiry.stage === "valid"
                    ? "Your package has been confirmed!"
                    : selectedInquiry.stage === "new"
                    ? "Your inquiry is being reviewed."
                    : "Your inquiry has been validated and is being processed."}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>Submitted:</strong> {formatDate(selectedInquiry.createdAt)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>Last Updated:</strong> {formatDate(selectedInquiry.updatedAt)}
                  </Typography>
                </Box>
              </Box>
              
              {/* Package Information */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Package Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Package ID:</strong> {selectedInquiry.packageId || "N/A"}
                </Typography>
              </Box>

              {/* Contact Information */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Contact Information
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PhoneIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    +{selectedInquiry.user.countryCode} {selectedInquiry.user.phNumber}
                  </Typography>
                </Box>

                {selectedInquiry.user.email && (
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <EmailIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">{selectedInquiry.user.email}</Typography>
                  </Box>
                )}

                <Typography variant="body2" color="text.secondary">
                  <strong>Name:</strong> {selectedInquiry.user.firstName} {selectedInquiry.user.lastName}
                </Typography>
              </Box>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setOpenBottomSheet(false)} color="inherit">
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<WhatsAppIcon />}
                onClick={() => {
                  window.open(
                    `https://wa.me/919457234349?text=Regarding my inquiry for ${selectedInquiry?.packageName} (ID: ${selectedInquiry?.id})`,
                    "_blank"
                  );
                }}
              >
                Contact via WhatsApp
              </Button>
            </DialogActions>
          </>
        )}
      </SwipeableDrawer>
    </Container>
  );
};

export const InquiriesClient = memo(() => {
  return <InquiriesClientBase />;
});

InquiriesClient.displayName = "InquiriesClient";
