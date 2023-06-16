import React, { useState, useEffect } from 'react';
import { getAllContacts } from '../services/paramsAPI';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalWindows from './ModalWindows';
import Button from '@mui/material/Button';

const Buttons = () => (
   <>
      <Button
         className="btn-modal btn-modal__cancel"
         // onClick={handleClose}
         variant="outlined"
         color="success"
      >
         CANCEL
      </Button>
      <Button
         className="btn-modal btn-modal__save"
         variant="outlined"
         color="error"
      >
         DELETE
      </Button>
   </>
);

const Contacts = () => {
   const [contacts, setContacts] = useState(null);
   const [open, setOpen] = useState(false);

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
         <ModalWindows
            content={'CONTENT TEST'}
            isOpen={open}
            setIsOpenModal={setOpen}
            Buttons={<Buttons />}
         />
         <div className="container">
            <h2>Kontakty:</h2>
            <table>
               <thead>
                  <tr>
                     <td>№</td>
                     <td>Name</td>
                     <td>Phone 1</td>
                     <td>Phone 2</td>
                     <td>Phone 3</td>
                     <td>Group</td>
                     <div></div>
                     <div></div>
                  </tr>
               </thead>
               {contacts?.map(
                  ({
                     id,
                     userName,
                     phoneNumber1,
                     phoneNumber2,
                     phoneNumber3,
                     group,
                  }) => (
                     <tbody>
                        <tr key={id}>
                           <td></td> {/* counter css */}
                           <td>{userName}</td>
                           <td>{phoneNumber1}</td>
                           <td>{phoneNumber2}</td>
                           <td>{phoneNumber3}</td>
                           <td>{group}</td>
                           <IconButton className="btn-table edit">
                              <EditIcon />
                           </IconButton>
                           <IconButton
                              onClick={() => setOpen(true)}
                              className="btn-table delete"
                           >
                              <DeleteIcon />
                           </IconButton>
                        </tr>
                     </tbody>
                  )
               )}
            </table>
         </div>
      </div>
   );
};

export default Contacts;
