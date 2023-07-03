import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addContact } from '../services/paramsAPI';
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
                     console.log('Редактируемый контакт', contact);
                     editContact({ id, userName, phoneNumber1, phoneNumber2, phoneNumber3, group });
                  }}
               >
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                     Edit contact: {userName}, {id} ?
                  </Typography>

                  <TextField
                     id="outlined-basic"
                     label="Name"
                     variant="outlined"
                     // required // обязательное для заполнения
                     defaultValue={userName}
                  />
                  <TextField id="outlined-basic" label="Phone 1" variant="outlined" defaultValue={phoneNumber1} />
                  <TextField id="outlined-basic" label="Phone 2" variant="outlined" defaultValue={phoneNumber2} />
                  <TextField id="outlined-basic" label="Phone 3" variant="outlined" defaultValue={phoneNumber3} />
                  <TextField id="outlined-basic" label="Group" variant="outlined" defaultValue={group} />
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
