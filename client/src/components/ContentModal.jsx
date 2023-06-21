import React, { useState } from 'react';
import Button from '@mui/material/Button';
// import CustomModal from './CustomModal';

function YourComponent() {
   const [modalOpen, setModalOpen] = useState(false);

   const openModal = () => {
      setModalOpen(true);
   };

   const closeModal = () => {
      setModalOpen(false);
   };

   const modalContent = <div>{/* Контент модального окна */}</div>;

   const modalButtons = [
      {
         label: 'Button 1',
         onClick: () => {
            // Обработчик нажатия кнопки 1
         },
      },
      {
         label: 'Button 2',
         onClick: () => {
            // Обработчик нажатия кнопки 2
         },
      },
   ];

   return (
      <div>
         <Button onClick={openModal} variant="outlined">
            Open Modal
         </Button>

         {/* <CustomModal
            open={modalOpen}
            onClose={closeModal}
            content={modalContent}
            buttons={modalButtons}
         /> */}
      </div>
   );
}

export default YourComponent;
