import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { setMessage } from '../components/Snackbar';

const LoginForm = ({ onLogin, isAuthenticated }) => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [isUsernameFocused, setIsUsernameFocused] = useState(false);
   const [isPasswordFocused, setIsPasswordFocused] = useState(false);
   const { t } = useTranslation();

   const handleSubmit = (e) => {
      e.preventDefault();
      // Проверка и установка логина и пароля
      if (username === '' && password === '') {
         onLogin();
      } else {
         const message = t('wrong_login');
         const color = 'error';
         setMessage({ message, color });
      }
   };

   // Clear input
   const handleClearUsername = () => {
      setUsername('');
   };

   const handleClearPassword = () => {
      setPassword('');
   };

   return (
      <div className="login-wrapper">
         <div className="login">
            <form onSubmit={handleSubmit}>
               <h2>
                  {t('hello')}
                  <br />
                  <span>{t('welcome_back')}</span>
               </h2>
               <div className="input-box">
                  <TextField
                     className="input-form"
                     type="text"
                     label={t('user_name')}
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     variant="standard"
                     autoComplete="off"
                     onMouseEnter={() => setIsUsernameFocused(true)}
                  />
                  {isUsernameFocused && username !== '' && (
                     <IconButton className="clear-btn" onClick={handleClearUsername}>
                        <ClearIcon />
                     </IconButton>
                  )}
                  <PersonIcon className="icons" />
               </div>
               <div className="input-box">
                  <TextField
                     className="input-form"
                     type="password"
                     label={t('password')}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     variant="standard"
                     onMouseEnter={() => setIsPasswordFocused(true)}
                  />
                  {isPasswordFocused && password !== '' && (
                     <IconButton className="clear-btn" onClick={handleClearPassword}>
                        <ClearIcon />
                     </IconButton>
                  )}
                  <LockIcon className="icons" />
               </div>
               {/* <label>
                  <input type="checkbox" />
                  {t('keep_me_logged_in')}
               </label> */}
               <div className="input-box">
                  <Button className="btn-login" type="submit" variant="outlined">
                     {t('login')}
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default LoginForm;
