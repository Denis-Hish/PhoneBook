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
               // Создание нового значение из пользовательского ввода
               setValue({
                  title: newValue.inputValue,
               });
            } else {
               setValue(newValue);
            }
            // console.log('Добавление новой группы - ', newValue.inputValue);
            // console.log('Выбрана группа - ', newValue.title);
            console.log('newValue - ', newValue);
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
         clearOnBlur
         handleHomeEndKeys
         options={Groups}
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

const Groups = [
   { title: 'SNR - Biuro' },
   { title: 'SNR - Karcz.' },
   { title: 'Placówki' },
   { title: 'WS' },
   { title: 'ZAZ' },
];
