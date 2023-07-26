import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
   const { i18n, t } = useTranslation(); // Initialize useTranslation
   const [selectedLanguage, setSelectedLanguage] = useState('');

   // Check if a language is saved in localStorage, otherwise detect the language
   useEffect(() => {
      const storedLanguage = localStorage.getItem('selectedLanguage');
      if (storedLanguage) {
         setSelectedLanguage(storedLanguage);
      } else {
         const userLanguage = navigator.language.toLowerCase();
         let detectedLanguage;
         if (userLanguage.startsWith('pl')) {
            detectedLanguage = 'pl';
         } else if (userLanguage.startsWith('ru') || userLanguage.startsWith('uk')) {
            detectedLanguage = 'ua';
         } else {
            detectedLanguage = 'en';
         }
         setSelectedLanguage(detectedLanguage);
         localStorage.setItem('selectedLanguage', detectedLanguage);
         i18n.changeLanguage(detectedLanguage); // Set i18n language
      }
   }, [i18n]);

   // Handle language change
   const handleLanguageChange = (event) => {
      const language = event.target.value;
      setSelectedLanguage(language);
      localStorage.setItem('selectedLanguage', language);
      i18n.changeLanguage(language); // Set i18n language when the user selects a language
   };

   return (
      <Select className="swith-language" value={selectedLanguage} onChange={handleLanguageChange}>
         <MenuItem value="en">
            <div className="lng">EN</div>
         </MenuItem>
         <MenuItem value="pl">
            <div className="lng">PL</div>
         </MenuItem>
         <MenuItem value="ua">
            <div className="lng">UA</div>
         </MenuItem>
      </Select>
   );
};

export default LanguageSwitcher;
