import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

function MyModal({ open, onClose, content, buttons }) {
   return (
      <Modal open={open} onClose={onClose}>
         <div className="modal-content">
            {content}
            <div className="modal-buttons">
               {buttons.map((button, index) => (
                  <Button key={index} onClick={button.onClick}>
                     {button.label}
                  </Button>
               ))}
            </div>
         </div>
      </Modal>
   );
}

export default MyModal;
