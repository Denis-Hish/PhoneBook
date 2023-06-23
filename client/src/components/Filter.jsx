import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Filter({ value, onChange }) {
   return (
      <Box
         className="filter"
         component="form"
         // sx={{
         //    '& > :not(style)': { m: 1, width: '25ch' },
         // }}
         noValidate
         autoComplete="off"
      >
         <TextField
            id="outlined-basic"
            label="Filter contacts"
            variant="outlined"
            color="primary"
            value={value}
            onChange={onChange}
         />
      </Box>
   );
}
