import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

const ThemeToggle = () => {
   const { t } = useTranslation();
   const { theme, toggleTheme } = useContext(ThemeContext);
   const tooltipTitle = theme === 'dark' ? t('dark_theme') : t('light_theme');

   return (
      <Tooltip title={tooltipTitle} placement="left" arrow>
         <div className="swith swith-toggle-theme">
            <label className="label">
               <div className="toggle">
                  <input
                     className="toggle-state"
                     type="checkbox"
                     name="check"
                     value="check"
                     checked={theme === 'dark'}
                     onChange={toggleTheme}
                  />
                  <div className="indicator"></div>
               </div>
            </label>
         </div>
      </Tooltip>
   );
};

export default ThemeToggle;
