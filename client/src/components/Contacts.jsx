import React, { useState, useEffect } from 'react';
import { getAllContacts } from '../services/paramsAPI';

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
      <div>
         <h2>Contacts:</h2>
         <table>
            {contacts?.map(({ id, userName, phoneNumber1, phoneNumber2, phoneNumber3, group }) => (
               <tr key={id}>
                  <td>{userName}:</td>
                  <td>{phoneNumber1}</td>
                  <td>{phoneNumber2}</td>
                  <td>{phoneNumber3}</td>
                  <td>{group}</td>
               </tr>
            ))}
         </table>
      </div>
   );
};

export default Contacts;
