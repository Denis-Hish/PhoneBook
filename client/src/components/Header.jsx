import React, { useContext, useState, useEffect } from 'react';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import { ThemeContext } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Header = ({ onLogout, isAuthenticated }) => {
   const { theme } = useContext(ThemeContext);

   const handleLogout = () => {
      // Выполните здесь необходимую логику выхода из системы, например, установите isAuthenticated в false
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
