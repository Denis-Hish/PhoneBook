import React, { useState, useEffect } from 'react';
import { getAllContacts } from '../services/paramsAPI';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalWindows from './ModalWindows';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

            <TableContainer component={Paper}>
               <Table aria-label="simple table">
                  <TableHead className="sticky-header">
                     <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Phone 1</TableCell>
                        <TableCell>Phone 2</TableCell>
                        <TableCell>Phone 3</TableCell>
                        <TableCell>Group</TableCell>
                        <TableCell />
                        <TableCell />
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {contacts?.map(({ id, userName, phoneNumber1, phoneNumber2, phoneNumber3, group }, index) => (
                        <TableRow key={id}>
                           <TableCell>{index + 1}</TableCell>
                           <TableCell>{userName}</TableCell>
                           <TableCell>{phoneNumber1}</TableCell>
                           <TableCell>{phoneNumber2}</TableCell>
                           <TableCell>{phoneNumber3}</TableCell>
                           <TableCell>{group}</TableCell>
                           <TableCell>
                              <IconButton
                                 className="btn-table edit"
                                 onClick={() => {
                                    setOpen(true);
                                    getIdEditBtn(id);
                                 }}
                              >
                                 <EditIcon />
                              </IconButton>
                           </TableCell>
                           <TableCell>
                              <IconButton
                                 onClick={() => {
                                    setOpen(true);
                                    getIdDeleteBtn(id);
                                 }}
                                 className="btn-table delete"
                              >
                                 <DeleteIcon />
                              </IconButton>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </div>
      </div>
   );
};

export default Contacts;
