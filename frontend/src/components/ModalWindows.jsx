import  { useEffect, useRef } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const TransitionsModal = ({ content, isOpen, setIsOpenModal, Buttons }) => {
  const handleClose = () => setIsOpenModal(false);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      // Focus the close button when modal opens to ensure focus moves into modal
      // This prevents aria-hidden from hiding a focused element in the background
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={isOpen}
        onClose={() => {
          handleClose();
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style} className='modal modal-add-contact'>
            <div className='modal-wrapper modal-section'>
              <Typography className='modal-header'>
                <button
                  ref={closeBtnRef}
                  autoFocus
                  className='btn-close'
                  onClick={handleClose}
                ></button>
              </Typography>

              <Typography className='modal-content'>{content}</Typography>

              <Typography className='modal-buttons'>{Buttons}</Typography>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default TransitionsModal;
