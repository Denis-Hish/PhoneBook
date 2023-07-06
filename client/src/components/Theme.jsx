import React, { useState } from 'react';

const ToogleTheme = () => {
   const [isChecked, setIsChecked] = useState(false);

   const handleToggle = (event) => {
      const { checked } = event.target;
      setIsChecked(checked);
      console.log(checked ? 'dark' : 'light');
   };

   return (
      <div className="swith swith-toggle-theme">
         <label className="label">
            <div className="toggle">
               <input
                  className="toggle-state"
                  type="checkbox"
                  name="check"
                  value="check"
                  checked={isChecked}
                  onChange={handleToggle}
               />
               <div className="indicator"></div>
            </div>
         </label>
      </div>
   );
};

export default ToogleTheme;
