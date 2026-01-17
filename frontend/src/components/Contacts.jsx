import { useState, useEffect } from 'react';
import { deleteContact, getAllContacts } from '../services/paramsAPI';
import { useAuth } from '../contexts/AuthContext';
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
import MadalEditContact from './EditContact';
import ModalAddContact from './ModalAddContact';
import { useTranslation } from 'react-i18next';
import { maskedPhoneForDisplay } from './PhonesCodes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const ModalButtons = ({ t, handleDeleteContact, handleCloseModal }) => (
  <>
    <Button
      className='btn-modal btn-modal__cancel btn-blue'
      variant='outlined'
      color='primary'
      startIcon={<CancelOutlinedIcon />}
      onClick={handleCloseModal}
    >
      {t('cancel')}
    </Button>
    <Button
      className='btn-modal btn-modal__delete btn-red'
      variant='outlined'
      color='error'
      endIcon={<DeleteOutlineOutlinedIcon />}
      onClick={handleDeleteContact}
    >
      {t('delete-btn')}
    </Button>
  </>
);

const Contacts = ({ onClearData }) => {
  const { isAdmin, isAuthenticated } = useAuth();
  const [contacts, setContacts] = useState(null);
  const [open, setOpen] = useState(false); // малое модальное окно
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [contactForEdit, setContactForEdit] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const { t } = useTranslation();
  const contactRowsRef = useRef([]);
  const wasModalOpenRef = useRef(false);

  const getContacts = async () => {
    try {
      const res = await getAllContacts();
      setContacts(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      setContacts([]);
    }
  };

  const clearContactsData = () => {
    setContacts(null);
    setFilterValue('');
    setContactForEdit({});
    setOpenEditModal(false);
    setOpen(false);
  };

  // Передаём функцию очистки в родительский компонент
  useEffect(() => {
    if (onClearData) {
      onClearData(clearContactsData);
    }
  }, [onClearData]);

  const handleEdit = id => {
    const obj = contacts.find(contact => contact.id === id);
    setContactForEdit(obj);
    setOpenEditModal(true);
  };

  const getIdDeleteBtn = id => {
    setSelectedId(id);
    setOpen(true);
    setSelectedAction(t('delete'));
  };

  const handleDeleteContact = async () => {
    try {
      const contact = contacts?.find(contact => contact.id === selectedId);
      if (contact) {
        await deleteContact(selectedId, t);
        setOpen(false); // Закрыть модальное окно
        await getContacts(); // Обновление списка контактов после удаления
      }
    } catch (error) {
      console.error('There was an error deleting the contact:', error);
    }
  };

  // FILTER ------------------
  const handleFilterChange = event => {
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
    allArrowButtons.forEach(btn => btn.classList.remove('visible-btn'));

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
    ? [...contacts].sort((a, b) => {
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
    ? allContacts.filter(contact =>
        Object.values(contact).join(' ').toLowerCase().includes(filterValue),
      )
    : allContacts;

  useEffect(() => {
    // Загружаем контакты только если пользователь авторизован
    if (isAuthenticated) {
      (async () => {
        await getContacts();
      })();
    }
  }, [isAuthenticated]);

  // Kill all GSAP animations when modal opens
  useEffect(() => {
    if (open || openEditModal) {
      wasModalOpenRef.current = true;
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    } else if (wasModalOpenRef.current) {
      // Modal was just closed - delay re-initialization of animations
      const timer = setTimeout(() => {
        wasModalOpenRef.current = false;
      }, 300); // 300ms delay to prevent animation trigger on close

      return () => clearTimeout(timer);
    }
  }, [open, openEditModal]);

  // GSAP ANIMATIONS - Анимация появления/исчезновения строк при скролле
  useEffect(() => {
    // Skip animations if any modal is open or was just closed or in print mode
    if (
      document.body.classList.contains('print-mode') ||
      open ||
      openEditModal ||
      wasModalOpenRef.current
    ) {
      return;
    }
    if (!contacts || contacts.length === 0) return;
    if (!filteredAndSortedContacts || filteredAndSortedContacts.length === 0)
      return;

    const ctx = gsap.context(() => {
      contactRowsRef.current.forEach(row => {
        if (!row) return;

        const OPACITY_VISIBLE = 1;
        const OPACITY_HIDDEN = 0;
        const SCALE_VISIBLE = 1;
        const SCALE_HIDDEN = 0.9;
        const DURATION = 0.4;
        const EASE_VISUALIZER = 'elastic.inOut(1,0.5)';

        gsap.set(row, { opacity: 0, scale: 0.9 });

        ScrollTrigger.create({
          trigger: row,
          start: 'center 96%',
          end: 'center 23%',
          // markers: true,

          onEnter: () => {
            gsap.to(row, {
              opacity: OPACITY_VISIBLE,
              scale: SCALE_VISIBLE,
              duration: DURATION,
              ease: EASE_VISUALIZER,
            });
          },

          onLeave: () => {
            gsap.to(row, {
              opacity: OPACITY_HIDDEN,
              scale: SCALE_HIDDEN,
              duration: DURATION,
              ease: EASE_VISUALIZER,
            });
          },

          onEnterBack: () => {
            gsap.to(row, {
              opacity: OPACITY_VISIBLE,
              scale: SCALE_VISIBLE,
              duration: DURATION,
              ease: EASE_VISUALIZER,
            });
          },

          onLeaveBack: () => {
            gsap.to(row, {
              opacity: OPACITY_HIDDEN,
              scale: SCALE_HIDDEN,
              duration: DURATION,
              ease: EASE_VISUALIZER,
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, [filteredAndSortedContacts, open, openEditModal, contacts]);

  // GSAP ANIMATIONS - Анимация при добавлении/удалении контактов

  return (
    <div className='contacts'>
      {/* Кнопка добавления контакта - только для admin */}
      {isAdmin() && <ModalAddContact updateListContacts={getContacts} />}
      <MadalEditContact
        key={contactForEdit?.id || 'empty'}
        contact={contactForEdit}
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
        updateListContacts={getContacts}
      />
      <ModalWindows
        content={
          <>
            {selectedAction}:{' '}
            <b>
              {Array.isArray(contacts) &&
                contacts.find(contact => contact.id === selectedId)?.userName}
            </b>
            ?
          </>
        }
        isOpen={open}
        setIsOpenModal={setOpen}
        Buttons={
          <ModalButtons
            t={t}
            handleDeleteContact={handleDeleteContact}
            handleCloseModal={() => setOpen(false)}
          />
        }
      />
      <div className='header-table'>
        <div className='container'>
          <h2>{t('contacts')}:</h2>
          <Filter value={filterValue} onChange={handleFilterChange} />
          <div className='plug' />
        </div>
      </div>
      <div className='container'>
        {Array.isArray(contacts) && contacts.length === 0 ? (
          <p className='no-records-in-db'>{t('no-records-in-db')}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <td className='header-title'>№</td>
                <td
                  className='header-title'
                  onClick={event => handleSort('userName', event)}
                >
                  <span>{t('name')}</span>
                  <IconButton
                    className='arrow-btn visible-btn'
                    sx={{ position: 'relative' }}
                    tabIndex={-1}
                  >
                    {sortField === 'userName' && sortDirection === 'asc' ? (
                      <ArrowUpwardIcon className='arrow-up' />
                    ) : (
                      <ArrowDownwardIcon />
                    )}
                  </IconButton>
                </td>
                <td
                  className='header-title'
                  onClick={event => handleSort('phoneNumber1', event)}
                >
                  <span>{t('phone')} 1</span>
                  <IconButton
                    className='arrow-btn'
                    sx={{ position: 'relative' }}
                    tabIndex={-1}
                  >
                    {sortField === 'phoneNumber1' && sortDirection === 'asc' ? (
                      <ArrowUpwardIcon className='arrow-up' />
                    ) : (
                      <ArrowDownwardIcon />
                    )}
                  </IconButton>
                </td>
                <td
                  className='header-title'
                  onClick={event => handleSort('phoneNumber2', event)}
                >
                  <span>{t('phone')} 2</span>
                  <IconButton
                    className='arrow-btn'
                    sx={{ position: 'relative' }}
                    tabIndex={-1}
                  >
                    {sortField === 'phoneNumber2' && sortDirection === 'asc' ? (
                      <ArrowUpwardIcon className='arrow-up' />
                    ) : (
                      <ArrowDownwardIcon />
                    )}
                  </IconButton>
                </td>
                <td
                  className='header-title'
                  onClick={event => handleSort('phoneNumber3', event)}
                >
                  <span>{t('phone')} 3</span>
                  <IconButton
                    className='arrow-btn'
                    sx={{ position: 'relative' }}
                    tabIndex={-1}
                  >
                    {sortField === 'phoneNumber3' && sortDirection === 'asc' ? (
                      <ArrowUpwardIcon className='arrow-up' />
                    ) : (
                      <ArrowDownwardIcon />
                    )}
                  </IconButton>
                </td>
                <td
                  className='header-title'
                  onClick={event => handleSort('group', event)}
                >
                  <span>{t('group')}</span>
                  <IconButton
                    className='arrow-btn'
                    sx={{ position: 'relative' }}
                    tabIndex={-1}
                  >
                    {sortField === 'group' && sortDirection === 'asc' ? (
                      <ArrowUpwardIcon className='arrow-up' />
                    ) : (
                      <ArrowDownwardIcon />
                    )}
                  </IconButton>
                </td>
                {/* Заголовки колонок для кнопок - только для admin */}
                {isAdmin() && <td className='btn-icon-table' />}
                {isAdmin() && <td className='btn-icon-table' />}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedContacts?.map(
                (
                  {
                    id,
                    userName,
                    phoneNumber1,
                    phoneNumber2,
                    phoneNumber3,
                    group,
                  },
                  index,
                ) => (
                  <tr
                    key={id}
                    className='contact'
                    ref={el => (contactRowsRef.current[index] = el)}
                  >
                    <td>{index + 1}</td>
                    <td>{userName}</td>
                    <td>{maskedPhoneForDisplay(phoneNumber1)}</td>
                    <td>{maskedPhoneForDisplay(phoneNumber2)}</td>
                    <td>{maskedPhoneForDisplay(phoneNumber3)}</td>
                    <td>{group}</td>
                    {/* Кнопки редактирования и удаления - только для admin */}
                    {isAdmin() && (
                      <td className='btn-icon-table'>
                        <Tooltip
                          title={t('edit_contact')}
                          placement='top'
                          slots={{ transition: Zoom }}
                          arrow
                        >
                          <IconButton
                            className='btn-table edit'
                            onClick={() => {
                              handleEdit(id);
                            }}
                            tabIndex={-1}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </td>
                    )}
                    {isAdmin() && (
                      <td className='btn-icon-table'>
                        <Tooltip
                          title={t('delete_contact')}
                          placement='top'
                          slots={{ transition: Zoom }}
                          arrow
                        >
                          <IconButton
                            className='btn-table delete'
                            onClick={() => {
                              getIdDeleteBtn(id);
                            }}
                            tabIndex={-1}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </td>
                    )}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Contacts;
