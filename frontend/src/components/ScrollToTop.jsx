import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ScrollToTop() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Tooltip
      title={t('scroll_to_top')}
      placement='left'
      slots={{ transition: Zoom }}
      arrow
    >
      <IconButton
        className={`btn btn__scroll-to-top ${isVisible ? 'visible' : ''}`}
        tabIndex={-1}
        onClick={scrollToTop}
      >
        <KeyboardArrowUpIcon fontSize='large' />
      </IconButton>
    </Tooltip>
  );
}

export default ScrollToTop;
