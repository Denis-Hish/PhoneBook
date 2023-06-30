import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

const ModalEditContact = ({ contact, openModal }) => {
   // const [open, setOpen] = React.useState(false);
   // const handleOpen = () => setOpen(true);
   // const handleClose = () => setOpen(false);

   const { id, userName, tel1, tel2, tel3, group } = contact;

   return (
      <div>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            // onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
               backdrop: {
                  timeout: 500,
               },
            }}
         >
            <Box sx={style}>
               <Box
                  component="form"
                  onSubmit={e => {
                     e.preventDefault();
                     console.log(e);
                  }}
               >
                  <Typography
                     id="transition-modal-title"
                     variant="h6"
                     component="h2"
                  >
                     Edit contact: {userName} ?
                  </Typography>

                  <TextField
                     id="outlined-basic"
                     label="Name"
                     variant="outlined"
                     required // обязательное для заполнения
                     defaultValue={userName}
                  />
                  <TextField
                     id="outlined-basic"
                     label="Tel 1"
                     variant="outlined"
                     defaultValue={tel1}
                  />
                  <TextField
                     id="outlined-basic"
                     label="Tel 2"
                     variant="outlined"
                     defaultValue={tel2}
                  />
                  <TextField
                     id="outlined-basic"
                     label="Tel 3"
                     variant="outlined"
                     defaultValue={tel3}
                  />
                  <TextField
                     id="outlined-basic"
                     label="Group"
                     variant="outlined"
                     defaultValue={group}
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
