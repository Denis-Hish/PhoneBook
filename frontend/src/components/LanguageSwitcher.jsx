import { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';

const LanguageSwitcher = ({ logoutButton }) => {
  const { i18n, t } = useTranslation();

  // Initialize language from localStorage or detect it; avoid setState in effects
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      return storedLanguage;
    }

    // Detect language from browser if not stored
    const userLanguage = navigator.language.toLowerCase();
    let detectedLanguage;
    if (userLanguage.startsWith('pl')) {
      detectedLanguage = 'pl';
    } else if (userLanguage.startsWith('ru') || userLanguage.startsWith('uk')) {
      detectedLanguage = 'ua';
    } else {
      detectedLanguage = 'en';
    }

    // Save detected language to localStorage
    localStorage.setItem('selectedLanguage', detectedLanguage);
    // Set i18n language
    i18n.changeLanguage(detectedLanguage);

    return detectedLanguage;
  });

  const [showTooltip, setShowTooltip] = useState(false);

  // Handle language change
  const handleLanguageChange = event => {
    const language = event.target.value;
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language);
    i18n.changeLanguage(language); // Set i18n language when the user selects a language
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClose = () => {
    setShowTooltip(false); // Hide the tooltip when the select menu is closed
  };

  return (
    <>
      <Tooltip
        title={t('language')}
        placement='bottom'
        arrow
        open={showTooltip}
      >
        <Select
          className='header-btn swith-language'
          value={selectedLanguage}
          onChange={handleLanguageChange}
          style={logoutButton ? null : { marginRight: '128px' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onOpen={() => setShowTooltip(false)}
          onClose={handleClose} // Close the tooltip when the select menu is closed
          tabIndex={-1}
        >
          <MenuItem value='en'>
            <div className='lng'>EN</div>
          </MenuItem>
          <MenuItem value='pl'>
            <div className='lng'>PL</div>
          </MenuItem>
          <MenuItem value='ua'>
            <div className='lng'>UA</div>
          </MenuItem>
        </Select>
      </Tooltip>
    </>
  );
};

export default LanguageSwitcher;
