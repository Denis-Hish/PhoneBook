import React from 'react';
import Button from '@mui/material/Button';
import { getAllContacts } from '../services/paramsAPI';

const Converter = () => {
   const allContacts = async () => {
      const contacts = await getAllContacts();
      // console.log('Converter.jxs - All contacts:', contacts);

      contacts.forEach((contact) => {
         // console.log(contact.userName);
      });
   };

   allContacts();

   return (
      <Button variant="outlined" color="error">
         Convert to xml
      </Button>
   );
};

export default Converter;
