import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';

import flagUA from '../img/ukraine.png';

const LanguageSwitcher = () => {
   const [selectedLanguage, setSelectedLanguage] = useState('en'); // Значение по умолчанию

   const handleLanguageChange = (event) => {
      setSelectedLanguage(event.target.value);
      // Здесь вы можете добавить код для изменения языка на вашем сайте в соответствии с выбранным языком.
   };

   return (
      <Select className="swith-language" value={selectedLanguage} onChange={handleLanguageChange}>
         <MenuItem value="en">English</MenuItem>
         <MenuItem value="pl">Polski</MenuItem>
         <MenuItem value="ua">Українська</MenuItem>
         {/* <MenuItem value="ua1">
            <img src={flagUA} alt="Ukrainian flag" />
         </MenuItem> */}
      </Select>
   );
};

export default LanguageSwitcher;
