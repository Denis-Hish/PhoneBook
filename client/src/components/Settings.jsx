import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   // border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};

const Settings = ({ countdown, setCountdown }) => {
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const [inputCountdown, setInputCountdown] = useState(countdown);

   const handleChangeCountdown = (event) => {
      setInputCountdown(event.target.value);
   };

   // Обработка сохранения измененного значения countdown
   const handleSaveCountdown = () => {
      // Здесь можно выполнить дополнительные проверки и обработку перед сохранением значения
      setCountdown(inputCountdown);
      handleClose();
   };

   console.log('countdown - ', countdown);

   return (
      <>
         <IconButton className="button btn-settings" onClick={handleOpen}>
            <SettingsIcon />
         </IconButton>

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
               <Box sx={style}>
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                     Settings
                  </Typography>

                  <TextField
                     id="outlined-basic"
                     type="number"
                     label="Countdown (min)"
                     variant="standard"
                     autoComplete="off"
                     onChange={handleChangeCountdown}
                  />

                  <Button onClick={handleSaveCountdown}>Save</Button>
               </Box>
            </Fade>
         </Modal>
      </>
   );
};

export default Settings;
