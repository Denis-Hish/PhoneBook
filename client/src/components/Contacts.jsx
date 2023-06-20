import React, { useState, useEffect } from 'react';
import { getAllContacts } from '../services/paramsAPI';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalWindows from './ModalWindows';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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

   const getIdEditBtn = (id) => {
      console.log('Edit ID:', id);
   };
   const getIdDeleteBtn = (id) => {
      console.log('Delete ID:', id);
   };

   // SORTING ---------------------------------------------------------------
   const [sortField, setSortField] = useState(''); // текущее поле сортировки
   const [sortDirection, setSortDirection] = useState('asc'); // направление сортировки (asc - по возрастанию, desc - по убыванию)

   const handleSort = (field) => {
      // Если поле сортировки уже равно текущему полю, меняем направление сортировки
      if (sortField === field) {
         setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
         // Если поле сортировки отличается от текущего, устанавливаем новое поле сортировки и направление asc
         setSortField(field);
         setSortDirection('asc');
      }
   };

   // Отсортированные контакты с учетом текущего поля и направления сортировки
   const sortedContacts = contacts?.sort((a, b) => {
      // Извлекаем значения для сортировки из контактов
      const valueA = a[sortField] || '';
      const valueB = b[sortField] || '';

      // Сравниваем значения в зависимости от направления сортировки
      if (sortDirection === 'asc') {
         return valueA.localeCompare(valueB);
      } else {
         return valueB.localeCompare(valueA);
      }
   });

   useEffect(() => {
      if (!contacts) {
         getContacts();
      }
   }, []);

   console.log('---All contacts---', contacts);

   return (
      <div className="contacts">
         <ModalWindows content={'CONTENT TEST'} isOpen={open} setIsOpenModal={setOpen} Buttons={<Buttons />} />
         <div className="container">
            <h2>Kontakty:</h2>
            <table>
               <thead>
                  <tr>
                     <td className="header-title">№</td>
                     <td className="header-title" onClick={() => handleSort('userName')}>
                        <span>Name</span>
                        <IconButton className="arrow-btn" sx={{ position: 'relative' }}>
                           {sortField === 'userName' && sortDirection === 'asc' ? (
                              <ArrowUpwardIcon className="arrow-up" />
                           ) : (
                              <ArrowDownwardIcon />
                           )}
                        </IconButton>
                     </td>
                     <td className="header-title" onClick={() => handleSort('phoneNumber1')}>
                        <span>Phone 1</span>
                        <IconButton className="arrow-btn" sx={{ position: 'relative' }}>
                           {sortField === 'phoneNumber1' && sortDirection === 'asc' ? (
                              <ArrowUpwardIcon className="arrow-up" />
                           ) : (
                              <ArrowDownwardIcon />
                           )}
                        </IconButton>
                     </td>
                     <td className="header-title" onClick={() => handleSort('phoneNumber2')}>
                        <span>Phone 2</span>
                        <IconButton className="arrow-btn" sx={{ position: 'relative' }}>
                           {sortField === 'phoneNumber2' && sortDirection === 'asc' ? (
                              <ArrowUpwardIcon className="arrow-up" />
                           ) : (
                              <ArrowDownwardIcon />
                           )}
                        </IconButton>
                     </td>
                     <td className="header-title" onClick={() => handleSort('phoneNumber3')}>
                        <span>Phone 3</span>
                        <IconButton className="arrow-btn" sx={{ position: 'relative' }}>
                           {sortField === 'phoneNumber3' && sortDirection === 'asc' ? (
                              <ArrowUpwardIcon className="arrow-up" />
                           ) : (
                              <ArrowDownwardIcon />
                           )}
                        </IconButton>
                     </td>
                     <td className="header-title" onClick={() => handleSort('group')}>
                        <span>Group</span>
                        <IconButton className="arrow-btn" sx={{ position: 'relative' }}>
                           {sortField === 'group' && sortDirection === 'asc' ? (
                              <ArrowUpwardIcon className="arrow-up" />
                           ) : (
                              <ArrowDownwardIcon />
                           )}
                        </IconButton>
                     </td>
                     <td className="btn-icon-table" />
                     <td className="btn-icon-table" />
                  </tr>
               </thead>
               <tbody>
                  {sortedContacts?.map(({ id, userName, phoneNumber1, phoneNumber2, phoneNumber3, group }, index) => (
                     <tr key={id}>
                        <td>{index + 1}</td>
                        <td>{userName}</td>
                        <td>{phoneNumber1}</td>
                        <td>{phoneNumber2}</td>
                        <td>{phoneNumber3}</td>
                        <td>{group}</td>
                        <td className="btn-icon-table">
                           <Tooltip title="Edit contact" placement="top" TransitionComponent={Zoom} arrow>
                              <IconButton
                                 className="btn-table edit"
                                 onClick={() => {
                                    setOpen(true);
                                    getIdEditBtn(id);
                                 }}
                              >
                                 <EditIcon />
                              </IconButton>
                           </Tooltip>
                        </td>
                        <td className="btn-icon-table">
                           <Tooltip title="Delete contact" placement="top" TransitionComponent={Zoom} arrow>
                              <IconButton
                                 onClick={() => {
                                    setOpen(true);
                                    getIdDeleteBtn(id);
                                 }}
                                 className="btn-table delete"
                              >
                                 <DeleteIcon />
                              </IconButton>
                           </Tooltip>
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
