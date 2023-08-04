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
// import { createOrUpdateAdminUser, deleteUserByUsername, getAllUserLogins } from '../../../userUtils';

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

   // Состояния для имени пользователя и пароля
   // const [username, setUsername] = useState('');
   // const [password, setPassword] = useState('');

   const handleChangeCountdown = (event) => {
      setInputCountdown(event.target.value);
   };

   // Обработка сохранения измененного значения countdown
   const handleSaveCountdown = () => {
      // Здесь можно выполнить дополнительные проверки и обработку перед сохранением значения
      setCountdown(inputCountdown);
      handleClose();
   };

   // // Обработчик сохранения изменений пользователя
   // const handleSaveUserChanges = async () => {
   //    try {
   //       await createOrUpdateAdminUser(username, password);
   //       console.log('User created or updated successfully');
   //    } catch (error) {
   //       console.error('Error creating or updating user:', error);
   //    }
   // };

   // // Обработчик удаления пользователя
   // const handleDeleteUser = async () => {
   //    try {
   //       await deleteUserByUsername(username);
   //       console.log('User deleted successfully');
   //    } catch (error) {
   //       console.error('Error deleting user:', error);
   //    }
   // };

   // // Обработчик получения списка логинов
   // const handleGetAllUserLogins = async () => {
   //    try {
   //       const logins = await getAllUserLogins();
   //       console.log('User Logins:', logins);
   //    } catch (error) {
   //       console.error('Error getting user logins:', error);
   //    }
   // };

   // console.log('countdown - ', countdown);

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
               <Box className="settings-modal-windows" sx={style}>
                  <div className="settings-input">
                     <Typography id="transition-modal-title" variant="h6" component="h2">
                        Settings
                     </Typography>
                     <TextField type="text" label="current username" variant="standard" autoComplete="off" />
                     <TextField type="password" label="current password" variant="standard" autoComplete="off" />
                     <TextField
                        type="number"
                        label="Countdown active session (min)"
                        variant="standard"
                        autoComplete="off"
                     />
                     <TextField
                        label="Selecting a folder to save the File-1.xml"
                        variant="standard"
                        autoComplete="off"
                     />
                     <TextField
                        label="Selecting a folder to save the File-2.xml"
                        variant="standard"
                        autoComplete="off"
                     />

                     <Button className="btn-save" variant="outlined">
                        Save
                     </Button>
                  </div>
               </Box>
            </Fade>
         </Modal>
      </>
   );
};

export default Settings;
