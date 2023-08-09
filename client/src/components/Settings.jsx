import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import { setMessage } from '../components/Snackbar';
import ClearIcon from '@mui/icons-material/Clear';
import { InputAdornment } from '@mui/material';
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
   const [isErrorUsername, setErrorUsername] = useState(false);
   const [isErrorDeleteUser, setErrorDeleteUser] = useState(false);
   const usernameInputRef = useRef(null);
   const deleteInputRef = useRef(null);

   const createOrUpdateUser = async () => {
      if (!newUsername.trim()) {
         setErrorUsername(true);
         usernameInputRef.current.focus();
         return;
      }
      try {
         await axios.post('/api/user/createOrUpdateUser', {
            username: newUsername,
            password: newPassword,
         });
         setMessage({ message: `Пользователь "${newUsername}" добавлен или обновлён`, color: 'success' });
         setNewUsername('');
         setNewPassword('');
      } catch (error) {
         console.error('Error creating or updating user:', error);
      }
   };

   const deleteUser = async (username) => {
      if (!username.trim()) {
         setErrorDeleteUser(true);
         deleteInputRef.current.focus();
         return;
      }
      try {
         const response = await axios.delete(`/api/user/deleteUser/${username}`);
         if (response.status === 200) {
            setMessage({ message: `Пользователь "${username}" удалён успешно`, color: 'warning' });
            setDeleteUsername('');
         }
      } catch (error) {
         if (error.response && error.response.status === 404) {
            setMessage({ message: `Пользователь с именем "${username}" не найден`, color: 'error' });
         } else {
            console.error('Error deleting user:', error);
         }
      }
   };

   const getAllUserLogins = async () => {
      try {
         const response = await axios.get('/api/user/getAllUserLogins');
         const logins = response.data.logins;
         setMessage({ message: `Список пользователей: ${logins.join(', ')}`, color: 'info' });
      } catch (error) {
         console.error('Error getting user logins:', error);
      }
   };

   const ClearButton = ({ value, onClick }) => (
      <InputAdornment position="end">
         {value && (
            <IconButton className="clear-btn" onClick={onClick} tabIndex={-1}>
               <ClearIcon />
            </IconButton>
         )}
      </InputAdornment>
   );

   return (
      <>
         <IconButton className="button btn-settings" onClick={handleOpen} tabIndex={-1}>
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
                        Settings:
                     </Typography>

                     <TextField
                        className="input"
                        type="text"
                        label="username"
                        variant="standard"
                        autoComplete="off"
                        value={newUsername}
                        onChange={(e) => {
                           setNewUsername(e.target.value);
                           setErrorUsername(false);
                        }}
                        onBlur={() => setErrorUsername(false)}
                        error={isErrorUsername}
                        inputRef={usernameInputRef}
                        InputProps={{
                           endAdornment: <ClearButton value={newUsername} onClick={() => setNewUsername('')} />,
                        }}
                     />

                     <TextField
                        className="input"
                        type="password"
                        label="password"
                        variant="standard"
                        autoComplete="off"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputProps={{
                           endAdornment: <ClearButton value={newPassword} onClick={() => setNewPassword('')} />,
                        }}
                     />

                     <Button className="btn-settings" variant="outlined" onClick={createOrUpdateUser}>
                        Create or update user
                     </Button>

                     <TextField
                        className="input"
                        type="text"
                        label="delete user"
                        variant="standard"
                        autoComplete="off"
                        value={deleteUsername}
                        onChange={(e) => {
                           setDeleteUsername(e.target.value);
                           setErrorDeleteUser(false);
                        }}
                        onBlur={() => setErrorDeleteUser(false)}
                        error={isErrorDeleteUser}
                        inputRef={deleteInputRef}
                        InputProps={{
                           endAdornment: <ClearButton value={deleteUsername} onClick={() => setDeleteUsername('')} />,
                        }}
                     />

                     <Button className="btn-settings" variant="outlined" onClick={() => deleteUser(deleteUsername)}>
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

                     <Button className="btn-settings" variant="outlined" onClick={() => getAllUserLogins()}>
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
