import { useState } from 'react';
import { addContact } from '../services/paramsAPI';
import { TextField, Button } from '@mui/material';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import PersonIcon from '@mui/icons-material/Person';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import GroupsIcon from '@mui/icons-material/Groups';

const AddContacts = () => {
   const [contact, setContact] = useState();

   const onChangeHandler = (event) => {
      const { name, value } = event;
      setContact((prev) => {
         return { ...prev, [name]: value };
      });
   };

   const sumbitForm = (event) => {
      // TODO: Add validation
      event.preventDefault();
      console.log('--contact--', contact);
      addContact(contact);
   };

   return (
      <div className="add-contacts">
         <h1>
            Phone Book{' '}
            <span>
               <PhoneEnabledRoundedIcon />
            </span>
         </h1>
         <h2>Dodaj kontakt:</h2>
         <form onSubmit={sumbitForm} className="form-wrap">
            <div className="form">
               <TextField
                  name="userName"
                  id="standard-basic"
                  label="Nazwa"
                  variant="standard"
                  onChange={(e) => onChangeHandler(e.target)}
                  className="input name-input"
               />
               <div className="icons">
                  <PersonIcon />
               </div>
            </div>

            <div className="form">
               <TextField
                  name="phoneNumber1"
                  id="standard-basic"
                  label="Telefon 1"
                  variant="standard"
                  onChange={(e) => onChangeHandler(e.target)}
                  className="input phone-input"
               />
               <div className="icons">
                  <PhoneEnabledIcon />
               </div>
            </div>
            <div className="form">
               <TextField
                  name="phoneNumber2"
                  id="standard-basic"
                  label="Telefon 2"
                  variant="standard"
                  onChange={(e) => onChangeHandler(e.target)}
                  className="input phone-input"
               />
               <div className="icons">
                  <PhoneEnabledIcon />
               </div>
            </div>
            <div className="form">
               <TextField
                  name="phoneNumber3"
                  id="standard-basic"
                  label="Telefon 3"
                  variant="standard"
                  onChange={(e) => onChangeHandler(e.target)}
                  className="input phone-input"
               />
               <div className="icons">
                  <PhoneEnabledIcon />
               </div>
            </div>
            <div className="form">
               <TextField
                  name="group"
                  id="standard-basic"
                  label="Grupa"
                  variant="standard"
                  onChange={(e) => onChangeHandler(e.target)}
                  className="input group-input"
               />
               <div className="icons">
                  <GroupsIcon />
               </div>
            </div>
            <Button type="submit" variant="outlined">
               Add +
            </Button>
         </form>
      </div>
   );
};

export default AddContacts;
