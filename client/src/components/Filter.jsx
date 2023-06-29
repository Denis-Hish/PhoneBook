import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

export default function Filter({ value, onChange }) {
   const handleClear = () => {
      onChange({ target: { value: '' } });
   };

   return (
      <Box className="filter" component="form" noValidate autoComplete="off">
         <TextField
            id="outlined-basic"
            label="Filter contacts"
            variant="outlined"
            color="primary"
            value={value}
            onChange={onChange}
         />

         {value && (
            <IconButton className="clear-filter-btn" onClick={handleClear}>
               <ClearIcon />
            </IconButton>
         )}
      </Box>
   );
}
