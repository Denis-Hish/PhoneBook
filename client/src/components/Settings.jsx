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
import { useTranslation } from 'react-i18next';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 500,
   bgcolor: 'background.paper',
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
   const { t } = useTranslation();

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
         setMessage({
            message: `${t('snb_user2')} "${newUsername}" ${t('snb_added_user')}`,
            color: 'success',
         });
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
            setMessage({ message: `${t('snb_user2')} "${username}" ${t('snb_deleted_user')}`, color: 'error' });
            setDeleteUsername('');
         }
      } catch (error) {
         if (error.response && error.response.status === 404) {
            setMessage({
               message: `${t('snb_user2')} ${t('with_name')} "${username}" ${t('not_found')}`,
               color: 'error',
            });
         } else {
            console.error('Error deleting user:', error);
         }
      }
   };

   const getAllUserLogins = async () => {
      try {
         const response = await axios.get('/api/user/getAllUserLogins');
         const logins = response.data.logins;
         setMessage({ message: `${t('list_of_users')}: ${logins.join(', ')}`, color: 'info' });
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
                  <button className="btn-close" onClick={handleClose}></button>
                  <div className="settings-input">
                     <Typography id="transition-modal-title" variant="h6" component="h2">
                        {t('settings')}:
                     </Typography>

                     {/* <div className="settings-wrapper"> */}
                     <p>{t('p_add_new_user')}</p>
                     <TextField
                        className="input"
                        type="text"
                        label={`${t('user_name')}`}
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
                        label={`${t('password')}`}
                        variant="standard"
                        autoComplete="off"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputProps={{
                           endAdornment: <ClearButton value={newPassword} onClick={() => setNewPassword('')} />,
                        }}
                     />

                     <Button className="btn-settings" variant="outlined" onClick={createOrUpdateUser}>
                        {t('btn_create_or_update')}
                     </Button>

                     <p>{t('p_delete_user')}</p>
                     <TextField
                        className="input"
                        type="text"
                        label={`${t('user_name')}`}
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

                     <Button
                        className="btn-settings"
                        variant="outlined"
                        onClick={() => deleteUser(deleteUsername)}
                        color="error"
                     >
                        {t('delete-btn')}
                     </Button>

                     <p>{t('show_logins')}</p>
                     <Button className="btn-settings" variant="outlined" onClick={() => getAllUserLogins()}>
                        {t('btn_show_logins')}
                     </Button>

                     <TextField
                        className="input"
                        type="number"
                        label="Countdown active session (min)"
                        variant="standard"
                        autoComplete="off"
                     />

                     <TextField
                        className="input"
                        label="Selecting a folder to save the File-1.xml"
                        variant="standard"
                        autoComplete="off"
                     />

                     <TextField
                        className="input"
                        label="Selecting a folder to save the File-2.xml"
                        variant="standard"
                        autoComplete="off"
                     />
                     {/* </div> */}
                  </div>
               </Box>
            </Fade>
         </Modal>
      </>
   );
};

export default Settings;
