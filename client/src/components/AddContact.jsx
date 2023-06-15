import { useState, useRef, useEffect } from 'react';
import { addContact } from '../services/paramsAPI';
import { TextField, Button } from '@mui/material';
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

   // Focus on input
   const inputRef = useRef(null);
   useEffect(() => {
      inputRef.current.focus();
   }, []);

   return (
      <div className="add-contacts">
         <h2>Dodaj kontakt:</h2>
         <form onSubmit={sumbitForm} className="form-wrap">
            <div className="form">
               <TextField
                  name="userName"
                  label="Nazwa"
                  variant="standard"
                  onChange={(e) => onChangeHandler(e.target)}
                  className="input name-input"
                  autoComplete="off"
                  inputRef={inputRef}
               />
               <div className="icons">
                  <PersonIcon />
               </div>
            </div>

            <div className="form">
               <TextField
                  name="phoneNumber1"
                  label="Telefon 1"
                  variant="standard"
                  onChange={(e) => onChangeHandler(e.target)}
                  className="input phone-input"
                  autoComplete="off"
               />
               <div className="icons">
                  <PhoneEnabledIcon />
               </div>
            </div>
            <div className="form">
               <TextField
                  name="phoneNumber2"
                  label="Telefon 2"
                  variant="standard"
                  onChange={(e) => onChangeHandler(e.target)}
                  className="input phone-input"
                  autoComplete="off"
               />
               <div className="icons">
                  <PhoneEnabledIcon />
               </div>
            </div>
            <div className="form">
               <TextField
                  name="phoneNumber3"
                  label="Telefon 3"
                  variant="standard"
                  onChange={(e) => onChangeHandler(e.target)}
                  className="input phone-input"
                  autoComplete="off"
               />
               <div className="icons">
                  <PhoneEnabledIcon />
               </div>
            </div>
            <div className="form">
               <TextField
                  name="group"
                  label="Grupa"
                  variant="standard"
                  onChange={(e) => onChangeHandler(e.target)}
                  className="input group-input"
                  autoComplete="off"
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
