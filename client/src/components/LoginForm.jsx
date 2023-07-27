import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const LoginForm = ({ onLogin }) => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const { t } = useTranslation();

   const handleSubmit = (e) => {
      e.preventDefault();
      // Проверка логина и пароля
      if (username === '' && password === '') {
         onLogin();
      } else {
         alert('Неверный логин или пароль');
      }
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
                  />
                  <IconButton className="clear-btn">
                     <ClearIcon />
                  </IconButton>

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
                  />
                  <IconButton className="clear-btn">
                     <ClearIcon />
                  </IconButton>

                  <LockIcon className="icons" />
               </div>
               <label>
                  <input type="checkbox" />
                  {t('keep_me_logged_in')}
               </label>
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
