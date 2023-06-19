import React, { useState, useEffect } from 'react';
import { getAllContacts } from '../services/paramsAPI';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalWindows from './ModalWindows';
import Button from '@mui/material/Button';

const Buttons = () => (
   <>
      <Button className="btn-modal btn-modal__cancel" variant="outlined" color="primary">
         CANCEL
      </Button>
      <Button className="btn-modal btn-modal__save" variant="outlined" color="error">
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

   const getIdEditBtn = (id) => {
      console.log('Edit ID:', id);
   };
   const getIdDeleteBtn = (id) => {
      console.log('Delete ID:', id);
   };

   console.log('---All contacts---', contacts);

   return (
      <div className="contacts">
         <ModalWindows content={'CONTENT TEST'} isOpen={open} setIsOpenModal={setOpen} Buttons={<Buttons />} />
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
                     <td className="btn-icon-table" />
                     <td className="btn-icon-table" />
                  </tr>
               </thead>
               <tbody>
                  {contacts?.map(({ id, userName, phoneNumber1, phoneNumber2, phoneNumber3, group }, index) => (
                     <tr key={id}>
                        <td>{index + 1}</td>
                        <td>{userName}</td>
                        <td>{phoneNumber1}</td>
                        <td>{phoneNumber2}</td>
                        <td>{phoneNumber3}</td>
                        <td>{group}</td>
                        <td className="btn-icon-table">
                           <IconButton
                              className="btn-table edit"
                              onClick={() => {
                                 setOpen(true);
                                 getIdEditBtn(id);
                              }}
                           >
                              <EditIcon />
                           </IconButton>
                        </td>
                        <td className="btn-icon-table">
                           <IconButton
                              onClick={() => {
                                 setOpen(true);
                                 getIdDeleteBtn(id);
                              }}
                              className="btn-table delete"
                           >
                              <DeleteIcon />
                           </IconButton>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Contacts;
