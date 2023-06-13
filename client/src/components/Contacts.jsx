import React, { useState, useEffect } from 'react';
import { getAllContacts } from '../services/paramsAPI';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Contacts = () => {
   const [contacts, setContacts] = useState(null);

   const getContacts = async () => {
      let res = await getAllContacts();

      if (res instanceof Array && !res.length) {
         console.log('---No Contacts in DB -', res.length);
      }

      setContacts(res);
   };

   useEffect(() => {
      if (!contacts) {
         getContacts();
      }
   });

   console.log('---All contacts---', contacts);

   return (
      <div className="contacts">
         <h2>Kontakty:</h2>
         <table>
            {contacts?.map(({ id, userName, phoneNumber1, phoneNumber2, phoneNumber3, group }) => (
               <tr key={id}>
                  <td></td> {/* порядковый номер */}
                  <td>{userName}</td>
                  <td>{phoneNumber1}</td>
                  <td>{phoneNumber2}</td>
                  <td>{phoneNumber3}</td>
                  <td>{group}</td>
                  <IconButton className="btn-table edit">
                     <EditIcon />
                  </IconButton>
                  <IconButton className="btn-table delete">
                     <DeleteIcon />
                  </IconButton>
               </tr>
            ))}
         </table>
      </div>
   );
};

export default Contacts;
