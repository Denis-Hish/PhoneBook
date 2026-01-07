import React from 'react';
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

const TransitionsModal = ({ id, content, isOpen, setIsOpenModal, Buttons }) => {
   const handleClose = () => setIsOpenModal(false);

   return (
      <>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
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
               <Box sx={style} className="modal modal-add-contact">
                  <div className="modal-wrapper modal-section">
                     <Typography className="modal-header">
                        <button className="btn-close" onClick={handleClose}></button>
                     </Typography>

                     <Typography className="modal-content">{content}</Typography>

                     <Typography className="modal-buttons">{Buttons}</Typography>
                  </div>
               </Box>
            </Fade>
         </Modal>
      </>
   );
};

export default TransitionsModal;
