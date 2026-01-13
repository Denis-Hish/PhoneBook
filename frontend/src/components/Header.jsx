import { useContext, useState, useEffect } from 'react';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import { ThemeContext } from './ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Settings from './Settings';
import Converter from './Converter';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

const Header = ({ onLogout, isAuthenticated }) => {
  const { theme } = useContext(ThemeContext);
  const { user, isAdmin } = useAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    onLogout();
  };

  const logoutButton = isAuthenticated ? (
    <IconButton className='btn-logout' onClick={handleLogout}>
      <PowerSettingsNewIcon />
    </IconButton>
  ) : null;

  const [isAnimated1, setIsAnimated1] = useState(false);
  const [isAnimated2, setIsAnimated2] = useState(false);

  const handlePhoneClick = () => {
    setIsAnimated1(true);
  };

  useEffect(() => {
    if (isAnimated1) {
      setTimeout(() => {
        setIsAnimated2(true);
      }, 3000);
    }
  }, [isAnimated1]);

  useEffect(() => {
    if (isAnimated2) {
      setTimeout(() => {
        setIsAnimated1(false);
        setIsAnimated2(false);
      }, 3000);
    }
  }, [isAnimated2]);

  const getLetterClasses = () => {
    const classes = ['letter-title'];
    if (isAnimated1) {
      classes.push('animated-header-title-1');
    }
    if (isAnimated2) {
      classes.push('animated-header-title-2');
    }
    return classes.join(' ');
  };

  const getPhoneCircleClasses = () => {
    const classes = ['phone-circle'];
    if (isAnimated1) {
      classes.push('animated-header-title-1');
    }
    if (isAnimated2) {
      classes.push('animated-header-title-2');
    }
    return classes.join(' ');
  };

  return (
    <header className={`header ${theme}`}>
      <div className='container'>
        <div className='header-content'>
          <div className='header-content__left'>
            {/* Settings - только для admin */}
            {isAuthenticated && isAdmin() && <Settings />}

            <div className='user-name'>
              {isAuthenticated && (
                <>
                  {t('welcome_username')}: {user?.username || 'Loading...'}
                </>
              )}
            </div>
          </div>

          <div className='header-content__center'>
            <h1>
              <span className={getLetterClasses(1)}>P</span>
              <span className={getLetterClasses(2)}>h</span>
              <span className={getLetterClasses(3)}>o</span>
              <span className={getLetterClasses(4)}>n</span>
              <span className={getLetterClasses(5)}>e</span>
              <span className='gap'> </span>
              <span className={getLetterClasses(7)}>B</span>
              <span className={getLetterClasses(8)}>o</span>
              <span className={getLetterClasses(9)}>o</span>
              <span className={getLetterClasses(10)}>k</span>
              <span className='gap'> </span>
              <span
                className={getPhoneCircleClasses(12)}
                onClick={handlePhoneClick}
              >
                <PhoneEnabledRoundedIcon />
              </span>
            </h1>
          </div>
          <div className='header-content__right'>
            <ThemeToggle />
            <LanguageSwitcher logoutButton={logoutButton} />
            {/* Converter - только для admin */}
            {isAuthenticated && isAdmin() && <Converter />}
            {isAuthenticated && (
              <Tooltip title={t('logout')} placement='bottom' arrow>
                <IconButton
                  className='btn-logout'
                  onClick={handleLogout}
                  tabIndex={-1}
                >
                  <PowerSettingsNewIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
