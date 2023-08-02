import React, { useContext, useState, useEffect } from 'react';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import { ThemeContext } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DownloadIcon from '@mui/icons-material/Download';
import Settings from './Settings';

const Header = ({ onLogout, isAuthenticated }) => {
   const { theme } = useContext(ThemeContext);

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
            <LanguageSwitcher logoutButton={logoutButton} />
            {isAuthenticated && (
               <IconButton className="btn-logout" onClick={handleLogout}>
                  <PowerSettingsNewIcon />
               </IconButton>
            )}
         </div>
      </header>
   );
};

export default Header;
