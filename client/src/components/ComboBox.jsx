import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Groups from './Groups';

export default function ComboBox() {
   return (
      <Autocomplete
         className="input combo-box"
         disablePortal
         id="combo-box"
         options={Groups}
         sx={{ width: 300 }}
         renderInput={params => <TextField {...params} label="Group" />}
      />
   );
}
<Groups />;
