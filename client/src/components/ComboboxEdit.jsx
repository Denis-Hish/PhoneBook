import * as React from 'react';
import TextField from '@mui/material/TextField';
import { getAllContacts } from '../services/paramsAPI';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function ComboboxEdit({ onChangeHandler, valueGroup }) {
   // const [value, setValue] = React.useState('');
   const [groups, setGroups] = React.useState([]);

   React.useEffect(() => {
      const extractGroups = async () => {
         const contacts = await getAllContacts();
         const allGroups = contacts.map((contact) => contact.group);
         const uniqueGroups = [...new Set(allGroups)];
         const sortedGroups = uniqueGroups.sort(); // Сортировка по алфавиту
         const groups = sortedGroups.map((group) => ({ title: group }));
         // console.log('Все группы - ', groups);
         setGroups(groups);
      };

      extractGroups();
   }, []);

   const validGroups = groups.map((group) => group.title);
   const selectedGroup = validGroups.includes(valueGroup) ? valueGroup : null;

   return (
      <Autocomplete
         className="input combo-box"
         value={selectedGroup}
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
            }
            // Исключение пустых значений
            const nonEmptyFiltered = filtered.filter((option) => option.title !== '');
            return nonEmptyFiltered;
         }}
         selectOnFocus
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
