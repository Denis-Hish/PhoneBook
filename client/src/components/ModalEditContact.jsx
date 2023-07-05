import React, { useState, useEffect, useRef } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { editContact, getAllContacts } from '../services/paramsAPI';
import Fade from '@mui/material/Fade';
import PersonIcon from '@mui/icons-material/Person';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import GroupsIcon from '@mui/icons-material/Groups';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import ComboboxEdit from './ComboboxEdit';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
};

const ModalEditContact = ({ contact, openModal, setOpenModal, updateListContacts }) => {
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

   const handleEditContact = async (e) => {
      e.preventDefault();
      const updatedContact = {
         id,
         userName: name,
         phoneNumber1: phone1,
         phoneNumber2: phone2,
         phoneNumber3: phone3,
         group: group1,
      };
      await editContact(id, updatedContact);
      closeModal();
      updateListContacts();
   };

   // Focus on input
   const [isNameInputActive, setNameInputActive] = useState(false);
   useEffect(() => {
      if (openModal) {
         setNameInputActive(true);
      }
   }, [openModal]);

   //Clear input
   const clearInput = (name) => {
      const inputFields = {
         userName: setName,
         phone1: setPhone1,
         phone2: setPhone2,
         phone3: setPhone3,
      };

      const clearField = inputFields[name];
      if (clearField) {
         clearField('');
      }
   };

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
                     <form className="form-wrap" onSubmit={handleEditContact}>
                        <div className="form">
                           <TextField
                              className="input"
                              name="userName"
                              label="Name"
                              variant="standard"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              autoComplete="off"
                              autoFocus
                              onFocus={() => setNameInputActive(true)}
                              onBlur={() => setNameInputActive(false)}
                           />
                           <div className="icons">
                              <PersonIcon />
                           </div>
                           {name && (
                              <IconButton className="clear-btn" onClick={() => clearInput('userName')} tabIndex={-1}>
                                 <ClearIcon />
                              </IconButton>
                           )}
                        </div>
                        <div className="form">
                           <TextField
                              className="input"
                              name="phoneNumber1"
                              label="Phone 1"
                              variant="standard"
                              value={phone1}
                              onChange={(e) => setPhone1(e.target.value)}
                              autoComplete="off"
                           />
                           <div className="icons">
                              <PhoneEnabledIcon />
                           </div>
                           {phone1 && (
                              <IconButton className="clear-btn" onClick={() => clearInput('phone1')} tabIndex={-1}>
                                 <ClearIcon />
                              </IconButton>
                           )}
                        </div>
                        <div className="form">
                           <TextField
                              className="input"
                              name="phoneNumber2"
                              label="Phone 2"
                              variant="standard"
                              value={phone2}
                              onChange={(e) => setPhone2(e.target.value)}
                              autoComplete="off"
                           />
                           <div className="icons">
                              <PhoneEnabledIcon />
                           </div>
                           {phone2 && (
                              <IconButton className="clear-btn" onClick={() => clearInput('phone2')} tabIndex={-1}>
                                 <ClearIcon />
                              </IconButton>
                           )}
                        </div>
                        <div className="form">
                           <TextField
                              className="input"
                              name="phoneNumber3"
                              label="Phone 3"
                              variant="standard"
                              value={phone3}
                              onChange={(e) => setPhone3(e.target.value)}
                              autoComplete="off"
                           />
                           <div className="icons">
                              <PhoneEnabledIcon />
                           </div>
                           {phone3 && (
                              <IconButton className="clear-btn" onClick={() => clearInput('phone3')} tabIndex={-1}>
                                 <ClearIcon />
                              </IconButton>
                           )}
                        </div>
                        <div className="form">
                           <ComboboxEdit onChangeHandler={(e) => setGroup(e.target.value)} valueGroup={group1} />
                           {/* <TextField
                              className="input"
                              label="Group"
                              variant="standard"
                              value={group1}
                              onChange={(e) => setGroup(e.target.value)}
                              autoComplete="off"
                           /> */}
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
