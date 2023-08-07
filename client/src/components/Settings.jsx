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
import axios from 'axios';

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

const Settings = () => {
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [newUsername, setNewUsername] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [deleteUsername, setDeleteUsername] = useState('');

   const createOrUpdateUser = async () => {
      try {
         const response = await axios.post('/api/user/createOrUpdateUser', {
            username: newUsername,
            password: newPassword,
         });
         console.log(response.data.message);
         console.log('User created');
      } catch (error) {
         console.error('Error creating or updating user:', error);
      }
   };

   const deleteUser = async (username) => {
      try {
         const response = await axios.delete(`/api/user/deleteUser/${username}`);
         console.log(response.data.message);
         console.log('User deleted');
      } catch (error) {
         console.error('Error deleting user:', error);
      }
   };

   const getAllUserLogins = async () => {
      try {
         const response = await axios.get('/api/user/getAllUserLogins');
         const logins = response.data.logins;
         console.log('User Logins:', logins);

         // Выводим сообщение в консоли браузера
         // alert('User Logins: ' + logins.join(', '));
      } catch (error) {
         console.error('Error getting user logins:', error);
      }
   };

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

                     <TextField
                        type="text"
                        label="new username"
                        variant="standard"
                        autoComplete="off"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                     />

                     <TextField
                        type="password"
                        label="new password"
                        variant="standard"
                        autoComplete="off"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                     />

                     <Button className="btn-save" variant="outlined" onClick={createOrUpdateUser}>
                        Create or update user
                     </Button>

                     <TextField
                        type="text"
                        label="delete user"
                        variant="standard"
                        autoComplete="off"
                        value={deleteUsername}
                        onChange={(e) => setDeleteUsername(e.target.value)}
                     />

                     <Button className="btn-save" variant="outlined" onClick={() => deleteUser(deleteUsername)}>
                        Delete User
                     </Button>

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

                     {/* <Button className="btn-save" variant="outlined">
                        Save
                     </Button> */}

                     <Button className="btn-save" variant="outlined" onClick={() => getAllUserLogins()}>
                        Get All User Logins
                     </Button>
                  </div>
               </Box>
            </Fade>
         </Modal>
      </>
   );
};

export default Settings;
