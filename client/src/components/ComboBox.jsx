import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function FreeSoloCreateOption() {
   const [value, setValue] = React.useState(null);

   return (
      <Autocomplete
         className="input combo-box"
         value={value}
         onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
               setValue({
                  title: newValue,
               });
            } else if (newValue && newValue.inputValue) {
               // Create a new value from the user input
               setValue({
                  title: newValue.inputValue,
               });
            } else {
               setValue(newValue);
            }
         }}
         filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some(
               option => inputValue === option.title
            );
            if (inputValue !== '' && !isExisting) {
               filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
               });
            }

            return filtered;
         }}
         selectOnFocus
         clearOnBlur
         handleHomeEndKeys
         options={Groups}
         getOptionLabel={option => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
               return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
               return option.inputValue;
            }
            // Regular option
            return option.title;
         }}
         renderOption={(props, option) => <li {...props}>{option.title}</li>}
         sx={{ width: 300 }}
         freeSolo
         renderInput={params => <TextField {...params} label="Group" />}
      />
   );
}

// const Groups = ['SNR - Biuro', 'SNR - Karcz.', 'Placówki', 'WS', 'ZAZ'];
const Groups = [
   'The Shawshank Redemption',
   { title: 'Secretariat' },
   { title: 'The Godfather', year: 1972 },
   { title: 'The Godfather: Part II', year: 1974 },
];
