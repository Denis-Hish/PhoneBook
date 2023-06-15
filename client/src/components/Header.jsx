import React from 'react';

import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';

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

            <div className="swith swith-toggle-theme">
               <label className="label">
                  <div className="toggle">
                     <input className="toggle-state" type="checkbox" name="check" value="check" />
                     <div className="indicator"></div>
                  </div>
               </label>
            </div>

            <div className="table-header"></div>
         </div>
      </header>
   );
};

export default Heder;
