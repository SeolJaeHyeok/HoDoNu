import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// eslint-disable-next-line no-unused-vars
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  children?: React.ReactNode;
  value?: string;
  btnStyle?: any;
  btnContent: any;
}

export default function CustomModal({ children, btnStyle, btnContent }: ModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  // eslint-disable-next-line no-unused-vars
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button sx={{ btnStyle }} onClick={handleOpen}>
        {btnContent}
      </Button>
      <Modal hideBackdrop open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 433 }}>
          <IconButton style={{ position: 'absolute', top: '0', right: '0' }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          {children}
        </Box>
      </Modal>
    </>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 433,
  height: 404,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '12px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': { display: 'none' },
};
