import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TextField, Button } from '@mui/material';
import { setMessage } from '../utils/snackbarUtils';
import axios from '../utils/axiosInstance';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginForm = ({ onLogin }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rememberedUsername = localStorage.getItem('rememberedUsername');
  const initialUsername = rememberedUsername ? rememberedUsername : '';
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState('');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    return !!rememberedUsername;
  });

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

  // Authentication with JWT
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/login', {
        username,
        password,
      });

      if (response.data.success) {
        // Успешная аутентификация с JWT
        const { token, user } = response.data;

        // Сохраняем токен и данные пользователя в контексте
        login(token, user);

        // Вызываем onLogin для обновления состояния App
        onLogin();

        // Редирект на главную страницу
        navigate('/', { replace: true });

        setMessage({
          message: `${t('welcome')}, ${user.username}!`,
          color: 'success',
        });

        if (rememberMe) {
          localStorage.setItem('rememberedUsername', username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }
      } else {
        // Ошибка аутентификации
        const errorCode = response.data.errorCode;
        const message =
          errorCode === 'invalid_credentials'
            ? t('wrong_login')
            : t('other_error_message');
        const color = 'error';
        setMessage({ message, color });
      }
    } catch (error) {
      // Обработка ошибки
      if (error.response && error.response.status === 401) {
        const message = t('wrong_login');
        const color = 'error';
        setMessage({ message, color });
      } else if (error.response && error.response.status >= 500) {
        // Ошибки сервера (500, 503 и т.д.)
        const message = t('database_connection_error');
        const color = 'error';
        setMessage({ message, color });
      } else if (error.message === 'Network Error') {
        // Проблема с сетевым соединением
        const message = t('network_error');
        const color = 'error';
        setMessage({ message, color });
      } else {
        // Остальные ошибки
        const message = t('other_error_message');
        const color = 'error';
        setMessage({ message, color });
        console.error('Error during login:', error);
      }
    }
  };

  // Запомнить имя пользователя
  const handleRememberMeChange = e => {
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

  // Clear input
  const handleClearUsername = () => {
    setUsername('');
  };

  const handleClearPassword = () => {
    setPassword('');
  };

  const handleVisibilityPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-wrapper'>
      <div className='login'>
        <form onSubmit={handleSubmit}>
          <h2>
            {t('hello')}
            <br />
            <span>{t('welcome_back')}</span>
          </h2>
          <div className='input-box'>
            <TextField
              className='input-form'
              type='text'
              name='username'
              label={t('user_name')}
              value={username}
              onChange={e => setUsername(e.target.value)}
              variant='standard'
              autoComplete='off'
              onMouseEnter={() => setIsUsernameFocused(true)}
            />
            {isUsernameFocused && username !== '' && (
              <IconButton
                className='clear-btn'
                onClick={handleClearUsername}
                tabIndex={-1}
              >
                <ClearIcon />
              </IconButton>
            )}
            <PersonIcon className='icons' />
          </div>
          <div className='input-box'>
            <TextField
              className='input-form'
              type={showPassword ? 'text' : 'password'}
              name='password'
              label={t('password')}
              value={password}
              onChange={e => setPassword(e.target.value)}
              variant='standard'
              onMouseEnter={() => setIsPasswordFocused(true)}
            />
            {isPasswordFocused && password !== '' && (
              <>
                <IconButton
                  className='visibility-password-btn'
                  onClick={handleVisibilityPassword}
                  tabIndex={-1}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
                <IconButton
                  className='clear-btn'
                  onClick={handleClearPassword}
                  tabIndex={-1}
                >
                  <ClearIcon />
                </IconButton>
              </>
            )}
            <LockIcon className='icons' />
          </div>
          <label className='remember-me-form'>
            <input
              type='checkbox'
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            {t('remember_me')}
          </label>
          <div className='input-box'>
            <Button
              className='btn-login btn-blue'
              type='submit'
              variant='outlined'
            >
              {t('login')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
