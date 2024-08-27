import React from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';


interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  handleModal: () => Promise<void>;
  title: string;
  message: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  handleClose,
  handleModal,
  title,
  message
}) => {
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
          width: { xs: '90%', sm: '70%', md: '50%' }, // Responsive width
          maxWidth: '500px', // Maximum width for larger screens
          textAlign: 'center'
        }}>
          <Typography id="child-modal-title" variant="h6" component="h2" fontWeight="bold">
            {title}
          </Typography>
          <Typography id="child-modal-description" sx={{ mt: 2, mb: 3 }}>
          {message}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              onClick={handleClose}
              sx={{
                bgcolor: 'green',
                color: 'white',
                '&:hover': { bgcolor: '#388e3c' }, 
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleModal}
              sx={{
                bgcolor: '#f44336', 
                color: 'white',
                '&:hover': { bgcolor: '#d32f2f' }, 
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
  );
};

export default CustomModal;
