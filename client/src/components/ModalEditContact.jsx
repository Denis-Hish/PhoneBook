import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { editContact } from '../services/paramsAPI';
import Fade from '@mui/material/Fade';
import PersonIcon from '@mui/icons-material/Person';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import GroupsIcon from '@mui/icons-material/Groups';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
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
      <>
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
            <Fade in={openModal}>
               <Box sx={style} className="modal modal-add-contact">
                  <button className="btn-close" onClick={closeModal}></button>
                  <div className="add-contacts">
                     <h2 className="">Edit contact:</h2>
                     <form
                        className="form-wrap"
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
                           editContact(id, updatedContact);
                           closeModal();
                        }}
                     >
                        <div className="form">
                           <TextField
                              className="input"
                              label="Name"
                              variant="standard"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              autoComplete="off"
                           />
                           <div className="icons">
                              <PersonIcon />
                           </div>
                        </div>

                        <div className="form">
                           <TextField
                              className="input"
                              label="Phone 1"
                              variant="standard"
                              value={phone1}
                              onChange={(e) => setPhone1(e.target.value)}
                              autoComplete="off"
                           />
                           <div className="icons">
                              <PhoneEnabledIcon />
                           </div>
                        </div>

                        <div className="form">
                           <TextField
                              className="input"
                              label="Phone 2"
                              variant="standard"
                              value={phone2}
                              onChange={(e) => setPhone2(e.target.value)}
                              autoComplete="off"
                           />
                           <div className="icons">
                              <PhoneEnabledIcon />
                           </div>
                        </div>

                        <div className="form">
                           <TextField
                              className="input"
                              label="Phone 3"
                              variant="standard"
                              value={phone3}
                              onChange={(e) => setPhone3(e.target.value)}
                              autoComplete="off"
                           />
                           <div className="icons">
                              <PhoneEnabledIcon />
                           </div>
                        </div>

                        <div className="form">
                           <TextField
                              className="input"
                              label="Group"
                              variant="standard"
                              value={group1}
                              onChange={(e) => setGroup(e.target.value)}
                              autoComplete="off"
                           />
                           <div className="icons">
                              <GroupsIcon />
                           </div>
                        </div>

                        <Button className="btn-edit-contact" type="submit" variant="outlined">
                           Save contact
                        </Button>
                     </form>
                  </div>
               </Box>
            </Fade>
         </Modal>
      </>
   );
};

export default ModalEditContact;
