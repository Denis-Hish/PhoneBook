import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function Combobox({ onChangeHandler }) {
   const [value, setValue] = React.useState(null);

   return (
      <Autocomplete
         className="input combo-box"
         value={value}
         onChange={(event, newValue) => {
            let selectedGroup = '';
            if (newValue && typeof newValue === 'object') {
               selectedGroup = newValue.title;
            } else if (typeof newValue === 'string') {
               selectedGroup = newValue;
            }
            onChangeHandler({
               target: {
                  name: 'group',
                  value: selectedGroup,
               },
            });
         }}
         filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Создание нового значения
            const isExisting = options.some((option) => inputValue === option.title);
            if (inputValue !== '' && !isExisting) {
               filtered.push({
                  inputValue,
                  title: `Add new group "${inputValue}"`,
               });
               // console.log('Ввод текста в input - ', inputValue);
            }

            return filtered;
         }}
         selectOnFocus
         // clearOnBlur={false} // true - очистка поля input при потере фокуса
         handleHomeEndKeys
         options={groups}
         getOptionLabel={(option) => {
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
         renderInput={(params) => <TextField {...params} label="Group" />}
      />
   );
}

const groups = [
   { title: 'SNR - Biuro' },
   { title: 'SNR - Karcz.' },
   { title: 'Placówki' },
   { title: 'WS' },
   { title: 'ZAZ' },
];
