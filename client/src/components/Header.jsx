import React from 'react';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import ToogleTheme from './Theme';

const Heder = () => {
   return (
      <header className="header">
         <div className="container">
            <h1>
               Phone Book{' '}
               <span>
                  <PhoneEnabledRoundedIcon />
               </span>
            </h1>
            <ToogleTheme />
         </div>
      </header>
   );
};

export default Heder;
