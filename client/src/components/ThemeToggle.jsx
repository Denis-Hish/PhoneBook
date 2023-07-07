import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeToggle = () => {
   const { theme, toggleTheme } = useContext(ThemeContext);

   return (
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
   );
};

export default ThemeToggle;
