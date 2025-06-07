"use client";

import { ReactNode, useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  IconButton, 
  Box, 
  Slide, 
  useTheme, 
  useMediaQuery,
  Typography,
  Drawer,
  styled
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Close as CloseIcon } from '@mui/icons-material';
import React from 'react';

// Slide up transition for mobile bottom sheet
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Styled handle for the bottom sheet
const BottomSheetHandle = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '4px',
  backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
  borderRadius: '4px',
  margin: '8px auto',
}));

interface AdaptiveDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disableBackdropClick?: boolean;
}

/**
 * AdaptiveDialog component that renders as a bottom sheet on mobile
 * and as a popup dialog on desktop
 */
const AdaptiveDialog = ({
  open,
  onClose,
  title,
  children,
  actions,
  fullWidth = true,
  maxWidth = 'sm',
  disableBackdropClick = false
}: AdaptiveDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = (event: React.SyntheticEvent | Event, reason: string) => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return;
    }
    setIsOpen(false);
    onClose();
  };

  // Mobile bottom sheet
  if (isMobile) {
    return (
      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: '90vh',
          }
        }}
      >
        <BottomSheetHandle />
        <Box sx={{ px: 2, pt: 1, pb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">{title}</Typography>
            <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ mb: 2 }}>
            {children}
          </Box>
          {actions && (
            <Box sx={{ mt: 3 }}>
              {actions}
            </Box>
          )}
        </Box>
      </Drawer>
    );
  }

  // Desktop dialog
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      TransitionComponent={Transition}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default AdaptiveDialog;
