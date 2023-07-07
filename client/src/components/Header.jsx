import React, { useContext } from 'react';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import { ThemeContext } from './ThemeContext';
import ThemeToggle from './ThemeToggle';

const Header = () => {
   const { theme } = useContext(ThemeContext);

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
         </div>
      </header>
   );
};

export default Header;
