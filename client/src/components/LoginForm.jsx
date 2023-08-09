import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { setMessage } from '../components/Snackbar';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
   const rememberedUsername = localStorage.getItem('rememberedUsername');
   const initialUsername = rememberedUsername ? rememberedUsername : '';
   const [username, setUsername] = useState(initialUsername);

   const [password, setPassword] = useState('');
   const [isUsernameFocused, setIsUsernameFocused] = useState(false);
   const [isPasswordFocused, setIsPasswordFocused] = useState(false);
   const [rememberMe, setRememberMe] = useState(false);
   const { t } = useTranslation();

   // Local authentication
   // const handleSubmit = (e) => {
   //    e.preventDefault();
   //    // Проверка и установка логина и пароля
   //    if (username === 'admin' && password === '') {
   //       onLogin();
   //       setMessage({ message: t('welcome'), color: 'success' });
   //       if (rememberMe) {
   //          // Сохраняем имя пользователя в localStorage
   //          localStorage.setItem('rememberedUsername', username);
   //       } else {
   //          // Если галочка "Remember Me" снята, удаляем сохраненное имя пользователя из localStorage
   //          localStorage.removeItem('rememberedUsername');
   //       }
   //    } else {
   //       const message = t('wrong_login');
   //       const color = 'error';
   //       setMessage({ message, color });
   //    }
   // };

   // MongoDB authentication
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.post('/api/auth/login', { username, password });

         if (response.data.success) {
            // Успешная аутентификация
            onLogin();
            setMessage({ message: t('welcome'), color: 'success' });
            if (rememberMe) {
               localStorage.setItem('rememberedUsername', username);
            } else {
               localStorage.removeItem('rememberedUsername');
            }
         } else {
            // Ошибка аутентификации
            const errorCode = response.data.errorCode; // Здесь подставьте правильное поле с идентификатором ошибки
            const message = errorCode === 'invalid_credentials' ? t('wrong_login') : t('other_error_message');
            const color = 'error';
            setMessage({ message, color });
         }
      } catch (error) {
         // Обработка ошибки
         if (error.response && error.response.status === 401) {
            const message = t('wrong_login');
            const color = 'error';
            setMessage({ message, color });
         } else {
            // Ошибка при запросе
            console.error('Error during login:', error);
         }
      }
   };

   // Запомнить имя пользователя
   const handleRememberMeChange = (e) => {
      setRememberMe(e.target.checked);
      if (e.target.checked) {
         // Если галочка "Remember Me" установлена, получаем имя пользователя из localStorage (если есть)
         const rememberedUsername = localStorage.getItem('rememberedUsername');
         if (rememberedUsername) {
            setUsername(rememberedUsername);
         }
      } else {
         // Если галочка "Remember Me" снята, удаляем сохраненное имя пользователя из localStorage
         localStorage.removeItem('rememberedUsername');
      }
   };

   // Проверка наличия данных в localStorage и установка состояния галочки "Remember Me"
   useEffect(() => {
      const rememberedUsername = localStorage.getItem('rememberedUsername');
      setRememberMe(!!rememberedUsername);
   }, []);

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
                     <IconButton className="clear-btn" onClick={handleClearUsername} tabIndex={-1}>
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
                     <IconButton className="clear-btn" onClick={handleClearPassword} tabIndex={-1}>
                        <ClearIcon />
                     </IconButton>
                  )}
                  <LockIcon className="icons" />
               </div>
               <label className="remember-me-form">
                  <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                  {t('remember_me')}
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
