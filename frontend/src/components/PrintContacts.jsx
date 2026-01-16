import { useTranslation } from 'react-i18next';
import PrintIcon from '@mui/icons-material/Print';
import { IconButton, Tooltip } from '@mui/material';

function PrintContacts() {
  const { t } = useTranslation();

  const handlePrint = () => {
    // Reset GSAP animations
    const contactRows = document.querySelectorAll('tr.contact');
    contactRows.forEach(row => {
      row.style.cssText = '';
      const tds = row.querySelectorAll('td');
      tds.forEach(td => {
        td.style.cssText = '';
      });
    });

    document.body.classList.add('print-mode');
    window.print();
    document.body.classList.remove('print-mode');
  };

  return (
    <Tooltip title={t('print')} placement='bottom' arrow>
      <IconButton
        className='header-btn btn-print'
        onClick={handlePrint}
        tabIndex={-1}
      >
        <PrintIcon />
      </IconButton>
    </Tooltip>
  );
}

export default PrintContacts;
