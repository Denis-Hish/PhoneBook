import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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

   return (
      <>
         <Button onClick={handleOpen}>Contact saved</Button>
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
                  <div className="modal-wrapper">
                     <Typography className="modal-header">
                        <button className="btn-close" onClick={handleClose}></button>
                     </Typography>

                     <Typography className="modal-content">
                        Contact <b>{'Name'}</b> saved
                     </Typography>

                     <Typography className="modal-buttons">
                        <Button
                           className="btn-modal btn-modal__save"
                           onClick={handleClose}
                           variant="outlined"
                           color="primary"
                           endIcon={<CheckCircleOutlineIcon />}
                        >
                           OK
                        </Button>
                     </Typography>
                  </div>
               </Box>
            </Fade>
         </Modal>
      </>
   );
}
