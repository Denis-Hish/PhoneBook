import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Filter() {
   return (
      <Box
         component="form"
         sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
         }}
         noValidate
         autoComplete="off"
      >
         <TextField id="outlined-basic" label="There will be a filter?" variant="outlined" color="primary" />
      </Box>
   );
}
