import React, { useState, useEffect } from 'react';
import { deleteContact, getAllContacts } from '../services/paramsAPI';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModalWindows from './ModalWindows';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Filter from './Filter';
import Converter from './Converter';
// import MadalEditContact from './ModalEditContact';
import MadalEditContact from './EditContact_test';
import ModalAddContact from './ModalAddContact';
import { useTranslation } from 'react-i18next';
// import Converter1 from './Converter1';
// import Converter2 from './Converter2';
// import Converter from './Converter_test';
import Demo from './test/demo';

const Contacts = () => {
   const [contacts, setContacts] = useState(null);
   const [open, setOpen] = useState(false); // малое модальное окно
   const [selectedId, setSelectedId] = useState(null);
   const [selectedAction, setSelectedAction] = useState(null);
   const [filterValue, setFilterValue] = useState('');
   const [contactForEdit, setContactForEdit] = useState({});
   const [openEditModal, setOpenEditModal] = useState(false);
   const { t } = useTranslation();

   const getContacts = async () => {
      let res = await getAllContacts();

      if (res instanceof Array && !res.length) {
         console.log('---No Contacts in DB -', res.length);
      }
      setContacts(res);
   };

   const handleEdit = (id) => {
      const obj = contacts.find((contact) => contact.id === id);
      setContactForEdit(obj);
      setOpenEditModal(true);

      // setContactForEdit({
      // id: 'id',
      // name: 'name',
      // tel1: 'Tel 1',
      // tel2: 'Tel 2',
      // tel3: 'Tel 3',
      // group: 'Group',
      // });
   };

   const getIdDeleteBtn = (id) => {
      // console.log('Delete ID:', id);
      setSelectedId(id);
      setOpen(true);
      // setSelectedAction('Delete');
      setSelectedAction(t('delete'));
   };

   const handleDeleteContact = async () => {
      try {
         const contact = contacts?.find((contact) => contact.id === selectedId);
         if (contact) {
            await deleteContact(selectedId, t);
            setOpen(false); // Закрыть модальное окно
            getContacts(); // Обновление списка контактов после удаления
         } else {
         }
      } catch (error) {
         console.error('There was an error deleting the contact:', error);
      }
   };

   // FILTER ------------------
   const handleFilterChange = (event) => {
      const filterInput = event.target.value.toLowerCase();
      setFilterValue(filterInput);
   };

   // SORTING ---------------------------------------------------------------
   const [sortField, setSortField] = useState('userName'); // состояние сортировки при загрузке страницы, без сортировки = ''
   const [sortDirection, setSortDirection] = useState('asc'); // направление сортировки (asc - по возрастанию, desc - по убыванию)

   const handleSort = (field, event) => {
      // Если поле сортировки уже равно текущему полю, меняем направление сортировки
      if (sortField === field) {
         setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
         // Если поле сортировки отличается от текущего, устанавливаем новое поле сортировки и направление asc
         setSortField(field);
         setSortDirection('asc');
      }

      // Добавление класса для отображения стрелки сортировки
      const headerTitle = event.currentTarget;
      const arrowButton = headerTitle.querySelector('.arrow-btn');

      // Удаление класса "visible-btn" из всех элементов "arrow-btn"
      const allArrowButtons = document.querySelectorAll('.arrow-btn');
      allArrowButtons.forEach((btn) => btn.classList.remove('visible-btn'));

      // Проверка, был ли клик по элементу "header-title"
      if (headerTitle.classList.contains('header-title')) {
         // Check if the arrowButton doesn't have the visible-btn class
         if (arrowButton && !arrowButton.classList.contains('visible-btn')) {
            arrowButton.classList.add('visible-btn');
         }
      }
   };

   // Отсортированные контакты с учетом текущего поля и направления сортировки
   const allContacts = Array.isArray(contacts)
      ? contacts.sort((a, b) => {
           const valueA = a[sortField] || '';
           const valueB = b[sortField] || '';

           if (sortDirection === 'asc') {
              if (valueA === '' && valueB !== '') return 1;
              if (valueA !== '' && valueB === '') return -1;
              return valueA.localeCompare(valueB);
           } else {
              if (valueA === '' && valueB !== '') return -1;
              if (valueA !== '' && valueB === '') return 1;
              return valueB.localeCompare(valueA);
           }
        })
      : [];

   const filteredAndSortedContacts = filterValue
      ? allContacts.filter((contact) => Object.values(contact).join(' ').toLowerCase().includes(filterValue))
      : allContacts;

   useEffect(() => {
      if (!contacts) {
         getContacts();
      }
   }, []);

   // console.log('---All contacts---', contacts);

   const Buttons = ({ handleDeleteContact, handleCloseModal }) => (
      <>
         <Button
            className="btn-modal btn-modal__cancel"
            variant="outlined"
            color="primary"
            startIcon={<CancelOutlinedIcon />}
            onClick={handleCloseModal}
         >
            {t('cancel')}
         </Button>
         <Button
            className="btn-modal btn-modal__delete"
            variant="outlined"
            color="error"
            endIcon={<DeleteOutlineOutlinedIcon />}
            onClick={handleDeleteContact}
         >
            {t('delete-btn')}
         </Button>
      </>
   );

   return (
      <div className="contacts">
         <ModalAddContact updateListContacts={getContacts} />
         <MadalEditContact
            contact={contactForEdit}
            openModal={openEditModal}
            setOpenModal={setOpenEditModal}
            updateListContacts={getContacts}
         />
         <ModalWindows
            content={
               <>
                  {selectedAction}:
                  <b>{Array.isArray(contacts) && contacts.find((contact) => contact.id === selectedId)?.userName}</b>?
                  {/* ID: {selectedId} */}
               </>
            }
            isOpen={open}
            setIsOpenModal={setOpen}
            Buttons={<Buttons handleDeleteContact={handleDeleteContact} handleCloseModal={() => setOpen(false)} />}
         />
         <div className="header-table">
            <div className="container">
               <h2>{t('contacts')}:</h2>
               <Filter value={filterValue} onChange={handleFilterChange} />

               <Converter />

               {/* <Demo /> */}

               {/* <Converter1 /> */}
               {/* <Converter2 /> */}
            </div>
         </div>
         <div className="container">
            <table>
               <thead>
                  <tr>
                     <td className="header-title">№</td>
                     <td className="header-title" onClick={(event) => handleSort('userName', event)}>
                        <span>{t('name')}</span>
                        <IconButton className="arrow-btn visible-btn" sx={{ position: 'relative' }}>
                           {sortField === 'userName' && sortDirection === 'asc' ? (
                              <ArrowUpwardIcon className="arrow-up" />
                           ) : (
                              <ArrowDownwardIcon />
                           )}
                        </IconButton>
                     </td>
                     <td className="header-title" onClick={(event) => handleSort('phoneNumber1', event)}>
                        <span>{t('phone')} 1</span>
                        <IconButton className="arrow-btn" sx={{ position: 'relative' }}>
                           {sortField === 'phoneNumber1' && sortDirection === 'asc' ? (
                              <ArrowUpwardIcon className="arrow-up" />
                           ) : (
                              <ArrowDownwardIcon />
                           )}
                        </IconButton>
                     </td>
                     <td className="header-title" onClick={(event) => handleSort('phoneNumber2', event)}>
                        <span>{t('phone')} 2</span>
                        <IconButton className="arrow-btn" sx={{ position: 'relative' }}>
                           {sortField === 'phoneNumber2' && sortDirection === 'asc' ? (
                              <ArrowUpwardIcon className="arrow-up" />
                           ) : (
                              <ArrowDownwardIcon />
                           )}
                        </IconButton>
                     </td>
                     <td className="header-title" onClick={(event) => handleSort('phoneNumber3', event)}>
                        <span>{t('phone')} 3</span>
                        <IconButton className="arrow-btn" sx={{ position: 'relative' }}>
                           {sortField === 'phoneNumber3' && sortDirection === 'asc' ? (
                              <ArrowUpwardIcon className="arrow-up" />
                           ) : (
                              <ArrowDownwardIcon />
                           )}
                        </IconButton>
                     </td>
                     <td className="header-title" onClick={(event) => handleSort('group', event)}>
                        <span>{t('group')}</span>
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
                  {filteredAndSortedContacts?.map(
                     ({ id, userName, phoneNumber1, phoneNumber2, phoneNumber3, group }, index) => (
                        <tr key={id}>
                           <td>{index + 1}</td>
                           <td>{userName}</td>
                           <td>{phoneNumber1}</td>
                           <td>{phoneNumber2}</td>
                           <td>{phoneNumber3}</td>
                           <td>{group}</td>
                           <td className="btn-icon-table">
                              <Tooltip title={t('edit_contact')} placement="top" TransitionComponent={Zoom} arrow>
                                 <IconButton
                                    className="btn-table edit"
                                    onClick={() => {
                                       handleEdit(id);
                                    }}
                                 >
                                    <EditIcon />
                                 </IconButton>
                              </Tooltip>
                           </td>
                           <td className="btn-icon-table">
                              <Tooltip title={t('delete_contact')} placement="top" TransitionComponent={Zoom} arrow>
                                 <IconButton
                                    className="btn-table delete"
                                    onClick={() => {
                                       getIdDeleteBtn(id);
                                    }}
                                 >
                                    <DeleteIcon />
                                 </IconButton>
                              </Tooltip>
                           </td>
                        </tr>
                     )
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Contacts;
