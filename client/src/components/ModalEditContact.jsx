import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { editContact } from '../services/paramsAPI';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};

const ModalEditContact = ({ contact, openModal, setOpenModal }) => {
   const { id, userName, phoneNumber1, phoneNumber2, phoneNumber3, group } = contact;

   const closeModal = () => {
      setOpenModal(false);
   };

   const [name, setName] = useState(userName || '');
   const [phone1, setPhone1] = useState(phoneNumber1 || '');
   const [phone2, setPhone2] = useState(phoneNumber2 || '');
   const [phone3, setPhone3] = useState(phoneNumber3 || '');
   const [group1, setGroup] = useState(group || '');

   useEffect(() => {
      setName(userName || '');
      setPhone1(phoneNumber1 || '');
      setPhone2(phoneNumber2 || '');
      setPhone3(phoneNumber3 || '');
      setGroup(group || '');
   }, [contact]);

   return (
      <div>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={closeModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
               backdrop: {
                  timeout: 500,
               },
            }}
         >
            <Box sx={style}>
               <button className="btn-close" onClick={closeModal}></button>
               <Box
                  component="form"
                  onSubmit={(e) => {
                     e.preventDefault();
                     const updatedContact = {
                        id,
                        userName: name,
                        phoneNumber1: phone1,
                        phoneNumber2: phone2,
                        phoneNumber3: phone3,
                        group: group1,
                     };
                     console.log('Редактируемый контакт', updatedContact);
                     editContact(id, updatedContact);
                  }}
               >
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                     Edit contact: {userName}, {id} ?
                  </Typography>

                  <TextField
                     // id="outlined-basic"
                     label="Name"
                     variant="outlined"
                     // required // обязательное для заполнения
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                     // id="outlined-basic"
                     label="Phone 1"
                     variant="outlined"
                     // required // обязательное для заполнения
                     value={phone1}
                     onChange={(e) => setPhone1(e.target.value)}
                  />
                  <TextField
                     // id="outlined-basic"
                     label="Phone 2"
                     variant="outlined"
                     // required // обязательное для заполнения
                     value={phone2}
                     onChange={(e) => setPhone2(e.target.value)}
                  />
                  <TextField
                     // id="outlined-basic"
                     label="Phone 3"
                     variant="outlined"
                     // required // обязательное для заполнения
                     value={phone3}
                     onChange={(e) => setPhone3(e.target.value)}
                  />
                  <TextField
                     // id="outlined-basic"
                     label="Group"
                     variant="outlined"
                     // required // обязательное для заполнения
                     value={group1}
                     onChange={(e) => setGroup(e.target.value)}
                  />
                  <Button type="submit" variant="outlined">
                     Save contact
                  </Button>
               </Box>
            </Box>
         </Modal>
      </div>
   );
};

export default ModalEditContact;
