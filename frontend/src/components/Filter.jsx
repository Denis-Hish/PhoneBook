import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';

export default function Filter({ value, onChange }) {
   const { t } = useTranslation();

   const clearInput = () => {
      onChange({ target: { value: '' } });
   };

   return (
      <Box className="filter" component="form" noValidate autoComplete="off">
         <TextField
            id="outlined-basic"
            name="filter"
            label={t('filter_contacts')}
            variant="standard"
            color="primary"
            value={value}
            onChange={onChange}
         />

         {value && (
            <IconButton className="clear-filter-btn" onClick={() => clearInput()}>
               <ClearIcon />
            </IconButton>
         )}
      </Box>
   );
}
