import { useState, useRef, useEffect } from 'react';
import { addContact } from '../services/paramsAPI';
import { TextField, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import GroupsIcon from '@mui/icons-material/Groups';
import ComboBox from './ComboBox';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const AddContact = () => {
   const [contact, setContact] = useState({
      userName: '',
      phoneNumber1: '',
      phoneNumber2: '',
      phoneNumber3: '',
      group: '',
   });

   const onChangeHandler = (event) => {
      const { name, value } = event.target;
      setContact((prevContact) => {
         return { ...prevContact, [name]: value };
      });
   };

   const clearInput = (name) => {
      setContact((prevContact) => ({
         ...prevContact,
         [name]: '',
      }));
   };

   const sumbitForm = (event) => {
      // TODO: Add validation
      event.preventDefault();
      console.log('--contact--', contact);
      addContact(contact);
   };

   // Focus on input
   const inputRef = useRef(null);
   useEffect(() => {
      inputRef.current.focus();
   }, []);

   return (
      <div className="add-contacts">
         <h2>Add contakt:</h2>
         <form onSubmit={sumbitForm} className="form-wrap">
            <div className="form">
               <TextField
                  name="userName"
                  label="Name"
                  variant="standard"
                  value={contact.userName}
                  onChange={onChangeHandler}
                  className="input name-input"
                  autoComplete="off"
                  inputRef={inputRef}
               />
               <div className="icons">
                  <PersonIcon />
               </div>
               {contact.userName && (
                  <IconButton className="clear-btn" onClick={() => clearInput('userName')} tabIndex="-1">
                     <ClearIcon />
                  </IconButton>
               )}
            </div>

            <div className="form">
               <TextField
                  name="phoneNumber1"
                  label="Phone 1"
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
                  <IconButton className="clear-btn" onClick={() => clearInput('phoneNumber1')} tabIndex="-1">
                     <ClearIcon />
                  </IconButton>
               )}
            </div>
            <div className="form">
               <TextField
                  name="phoneNumber2"
                  label="Phone 2"
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
                  <IconButton className="clear-btn" onClick={() => clearInput('phoneNumber2')} tabIndex="-1">
                     <ClearIcon />
                  </IconButton>
               )}
            </div>
            <div className="form">
               <TextField
                  name="phoneNumber3"
                  label="Phone 3"
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
                  <IconButton className="clear-btn" onClick={() => clearInput('phoneNumber3')} tabIndex="-1">
                     <ClearIcon />
                  </IconButton>
               )}
            </div>
            <div className="form">
               <ComboBox
                  value={contact.group}
                  onChange={(event) =>
                     setContact((prevContact) => ({
                        ...prevContact,
                        group: event.target.value,
                     }))
                  }
               />
               <div className="icons">
                  <GroupsIcon />
                  {contact.group && (
                     <IconButton className="clear-btn" onClick={() => clearInput('group')}>
                        <ClearIcon />
                     </IconButton>
                  )}
               </div>
            </div>
            <Button className="btn-add-contact" type="submit" variant="outlined">
               Add contact
            </Button>
         </form>
      </div>
   );
};

export default AddContact;
