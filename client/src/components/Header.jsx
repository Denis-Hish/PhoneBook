import React, { useContext, useState, useEffect } from 'react';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import { ThemeContext } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DownloadIcon from '@mui/icons-material/Download';
import Settings from './Settings';
import Converter from './Converter';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

const Header = ({ onLogout, isAuthenticated }) => {
   const { theme } = useContext(ThemeContext);
   const { t } = useTranslation();

   const handleLogout = () => {
      onLogout();
   };

   const logoutButton = isAuthenticated ? (
      <IconButton className="btn-logout" onClick={handleLogout}>
         <PowerSettingsNewIcon />
      </IconButton>
   ) : null;

   return (
      <header className={`header ${theme}`}>
         <div className="container">
            {/* <Settings /> */}
            <h1>
               Phone Book{' '}
               <span>
                  <PhoneEnabledRoundedIcon />
               </span>
            </h1>
            <ThemeToggle />
            <Converter />
            <LanguageSwitcher logoutButton={logoutButton} />
            {isAuthenticated && (
               <Tooltip title={t('logout')} placement="bottom" arrow>
                  <IconButton className="btn-logout" onClick={handleLogout}>
                     <PowerSettingsNewIcon />
                  </IconButton>
               </Tooltip>
            )}
         </div>
      </header>
   );
};

export default Header;
