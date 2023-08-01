import React, { useState, useRef, useEffect } from 'react';
import { addContact, getAllContacts } from '../services/paramsAPI';
import { TextField, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import GroupsIcon from '@mui/icons-material/Groups';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';

const filter = createFilterOptions();

const AddContact = ({ onClose, updateListContacts }) => {
   const [contact, setContact] = useState({
      userName: '',
      phoneNumber1: '',
      phoneNumber2: '',
      phoneNumber3: '',
      group: '',
   });

   const [fieldUserNameError, setFieldUserNameError] = useState(false);
   const [fieldGroupError, setFieldGroupError] = useState(false);
   const [groups, setGroups] = useState([]);
   const { t } = useTranslation();

   const onChangeHandler = (event) => {
      const { name, value } = event.target;
      setContact((prevContact) => {
         return { ...prevContact, [name]: value };
      });

      // Reset the error state whenever the user types something
      if (name === 'userName') {
         setFieldUserNameError(false);
      }
      if (name === 'group') {
         setFieldGroupError(false);
      }
   };

   // Сброс стилей при потере фокуса у инпута
   const handleBlur = (event) => {
      const { name, value } = event.target;
      if (name === 'userName' && value.trim() === '') {
         setFieldUserNameError(false);
      }
      if (name === 'group' && value.trim() === '') {
         setFieldGroupError(false);
      }
   };

   useEffect(() => {
      const extractGroups = async () => {
         const contacts = await getAllContacts();
         const allGroups = Array.isArray(contacts) ? contacts.map((contact) => contact.group) : [];
         const uniqueGroups = [...new Set(allGroups)];
         const sortedGroups = uniqueGroups.sort(); // Сортировка по алфавиту
         setGroups(sortedGroups);
      };

      extractGroups();
   }, []);

   // Focus on input
   const inputRef = useRef(null);
   useEffect(() => {
      inputRef.current.focus();
   }, []);

   //Clear input
   const clearInput = (name) => {
      setContact((prevContact) => ({
         ...prevContact,
         [name]: '',
      }));
   };

   // reset the contact form
   const resetContactForm = () => {
      setContact({
         userName: '',
         phoneNumber1: '',
         phoneNumber2: '',
         phoneNumber3: '',
         group: '',
      });
   };

   const handleAddContact = async (e) => {
      e.preventDefault();
      // Check if the userName and group field is empty and set the error state accordingly
      if (contact.userName.trim() === '' && contact.group.trim() === '') {
         setFieldUserNameError(true);
         setFieldGroupError(true);
      } else if (contact.userName.trim() !== '' && contact.group.trim() === '') {
         setFieldUserNameError(false);
         setFieldGroupError(true);
      } else if (contact.userName.trim() === '' && contact.group.trim() !== '') {
         setFieldUserNameError(true);
         setFieldGroupError(false);
      } else {
         await addContact(contact, t);
         onClose(); // Закрытие модального окна после отправки формы
         updateListContacts();
         resetContactForm(); // Reset the contact form after successful submission
      }
   };

   return (
      <div className="add-contacts">
         <h2 className="mb-2">{t('add_contact')}:</h2>
         <form onSubmit={handleAddContact} className="form-wrap">
            <div className="form">
               <TextField
                  name="userName"
                  label={`${t('name')} *`}
                  variant="standard"
                  value={contact.userName}
                  onChange={onChangeHandler}
                  className="input name-input"
                  autoComplete="off"
                  inputRef={inputRef}
                  error={fieldUserNameError}
                  onBlur={handleBlur}
               />
               <div className="icons">
                  <PersonIcon />
               </div>
               {contact.userName && (
                  <IconButton className="clear-btn" onClick={() => clearInput('userName')} tabIndex={-1}>
                     <ClearIcon />
                  </IconButton>
               )}
            </div>

            <div className="form">
               <TextField
                  name="phoneNumber1"
                  label={`${t('phone')} 1`}
                  variant="standard"
                  value={contact.phoneNumber1}
                  onChange={onChangeHandler}
                  className="input phone-input"
                  autoComplete="off"
               />
               <div className="icons">
                  <PhoneEnabledIcon />
               </div>
               {contact.phoneNumber1 && (
                  <IconButton className="clear-btn" onClick={() => clearInput('phoneNumber1')} tabIndex={-1}>
                     <ClearIcon />
                  </IconButton>
               )}
            </div>
            <div className="form">
               <TextField
                  name="phoneNumber2"
                  label={`${t('phone')} 2`}
                  variant="standard"
                  value={contact.phoneNumber2}
                  onChange={onChangeHandler}
                  className="input phone-input"
                  autoComplete="off"
               />
               <div className="icons">
                  <PhoneEnabledIcon />
               </div>
               {contact.phoneNumber2 && (
                  <IconButton className="clear-btn" onClick={() => clearInput('phoneNumber2')} tabIndex={-1}>
                     <ClearIcon />
                  </IconButton>
               )}
            </div>
            <div className="form">
               <TextField
                  name="phoneNumber3"
                  label={`${t('phone')} 3`}
                  variant="standard"
                  value={contact.phoneNumber3}
                  onChange={onChangeHandler}
                  className="input phone-input"
                  autoComplete="off"
               />
               <div className="icons">
                  <PhoneEnabledIcon />
               </div>
               {contact.phoneNumber3 && (
                  <IconButton className="clear-btn" onClick={() => clearInput('phoneNumber3')} tabIndex={-1}>
                     <ClearIcon />
                  </IconButton>
               )}
            </div>
            <div className="form">
               <Autocomplete
                  className={`input combo-box${fieldGroupError ? ' error' : ''}`}
                  value={contact.group}
                  onChange={(event, newValue) =>
                     onChangeHandler({
                        target: {
                           name: 'group',
                           value: newValue ? newValue : '',
                        },
                     })
                  }
                  onBlur={handleBlur}
                  filterOptions={(options, params) => {
                     const filtered = filter(options, params);
                     const { inputValue } = params;
                     // Создание нового значения
                     const isExisting = options.some((option) => inputValue === option);
                     if (inputValue !== '' && !isExisting) {
                        filtered.push(inputValue);
                     }
                     // Исключение пустых значений
                     const nonEmptyFiltered = filtered.filter((option) => option !== '');
                     return nonEmptyFiltered;
                  }}
                  selectOnFocus
                  handleHomeEndKeys
                  options={groups}
                  sx={{ width: 300 }}
                  freeSolo
                  renderInput={(params) => <TextField {...params} label={`${t('group')} *`} />}
               />
               <div className="icons">
                  <GroupsIcon />
               </div>
            </div>
            <p className="fst-italic">{t('required')}</p>
            <Button className="btn-add-contact" type="submit" variant="outlined">
               {t('add_contact')}
            </Button>
         </form>
      </div>
   );
};

export default AddContact;
