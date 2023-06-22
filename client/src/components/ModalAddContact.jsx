import React, { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddContact from './AddContact';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
};

export default function TransitionsModal() {
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   useEffect(() => {
      const handleKeyDown = (event) => {
         if (event.keyCode === 45) {
            // Код клавиши Insert
            handleOpen(); // Вызов функции для открытия модального окна
         }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, []);

   return (
      <>
         <Tooltip title="Add contact, (Insert)" placement="left" TransitionComponent={Zoom} arrow>
            <IconButton className="btn btn__add-contact" onClick={handleOpen}>
               <AddCircleOutlineIcon />
            </IconButton>
         </Tooltip>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
               backdrop: {
                  timeout: 500,
               },
            }}
         >
            <Fade in={open}>
               <Box sx={style} className="modal modal-add-contact">
                  <button className="btn-close" onClick={handleClose}></button>
                  <AddContact onClose={handleClose} />
               </Box>
            </Fade>
         </Modal>
      </>
   );
}
