import { useState, useEffect } from 'react';
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
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';
import { getAllContacts } from '../services/paramsAPI';
import IMaskCustom from './IMaskCustom';
import { phoneNumberMask } from './PhonesCodes';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const filter = createFilterOptions();

const ModalEditContact = ({
  contact,
  openModal,
  setOpenModal,
  updateListContacts,
}) => {
  const { id, userName, phoneNumber1, phoneNumber2, phoneNumber3, group } =
    contact;

  const closeModal = () => {
    setOpenModal(false);
  };

  const [fieldUserNameError, setFieldUserNameError] = useState(false);
  const [fieldGroupError, setFieldGroupError] = useState(false);

  const [name, setName] = useState(userName || '');
  const [phone1, setPhone1] = useState(phoneNumber1 || '');
  const [phone2, setPhone2] = useState(phoneNumber2 || '');
  const [phone3, setPhone3] = useState(phoneNumber3 || '');
  const [group1, setGroup] = useState(group || '');
  const { t } = useTranslation();

  useEffect(() => {
    setName(userName || '');
    setPhone1(phoneNumber1 || '');
    setPhone2(phoneNumber2 || '');
    setPhone3(phoneNumber3 || '');
    setGroup(group || '');
  }, [group, phoneNumber1, phoneNumber2, phoneNumber3, userName]);

  const handleEditContact = async e => {
    e.preventDefault();
    // Check if the name field is empty and set the error state accordingly
    if (name.trim() === '' && group1.trim() === '') {
      setFieldUserNameError(true);
      setFieldGroupError(true);
    } else if (name.trim() !== '' && group1.trim() === '') {
      setFieldUserNameError(false);
      setFieldGroupError(true);
    } else if (name.trim() === '' && group1.trim() !== '') {
      setFieldUserNameError(true);
      setFieldGroupError(false);
    } else {
      const updatedContact = {
        id,
        userName: name,
        phoneNumber1: phone1,
        phoneNumber2: phone2,
        phoneNumber3: phone3,
        group: group1,
      };
      await editContact(id, updatedContact, t);
      closeModal();
      updateListContacts();
    }
  };

  // Сброс стилей при потере фокуса у инпута name
  const handleBlur = () => {
    if (name.trim() === '') {
      setFieldUserNameError(false);
    }
    setNameInputActive(false);
  };

  const onChangeHandler = event => {
    const { value } = event.target;
    setName(value);
    setFieldUserNameError(false);
  };

  // Focus on input
  // eslint-disable-next-line no-unused-vars
  const [isNameInputActive, setNameInputActive] = useState(false);
  useEffect(() => {
    if (openModal) {
      setNameInputActive(true);
    }
  }, [openModal]);

  //Clear input
  const clearInput = name => {
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

  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const extractGroups = async () => {
      const contacts = await getAllContacts();
      const allGroups = Array.isArray(contacts)
        ? contacts.map(contact => contact.group)
        : [];
      const uniqueGroups = [...new Set(allGroups)];
      const sortedGroups = uniqueGroups.sort(); // Сортировка по алфавиту
      const groups = sortedGroups.map(group => ({ title: group }));
      setGroups(groups);
    };

    extractGroups();
  }, []);

  const validGroups = groups.map(group => group.title);
  const selectedGroup = validGroups.includes(group1) ? group1 : null;

  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
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
          <Box sx={style} className='modal modal-add-contact'>
            <button className='btn-close' onClick={closeModal}></button>
            <div className='add-contacts'>
              <h2 className='mb-2'>{t('edit_contact')}:</h2>
              <form
                className='form-wrap modal-section'
                onSubmit={handleEditContact}
              >
                <div className='form'>
                  <TextField
                    className='input'
                    name='userName'
                    label={`${t('name')} *`}
                    variant='standard'
                    value={name}
                    onChange={onChangeHandler}
                    autoComplete='off'
                    autoFocus
                    onFocus={() => setNameInputActive(true)}
                    onBlur={handleBlur}
                    error={fieldUserNameError}
                  />
                  <div className='icons'>
                    <PersonIcon />
                  </div>
                  {name && (
                    <IconButton
                      className='clear-btn'
                      onClick={() => clearInput('userName')}
                      tabIndex={-1}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                </div>
                <div className='form'>
                  <TextField
                    className='input'
                    name='phoneNumber1'
                    label={`${t('phone')} 1`}
                    variant='standard'
                    value={phone1}
                    autoComplete='off'
                    onChange={e =>
                      setPhone1(e.target.value.replace(/[^0-9]/g, ''))
                    }
                    InputProps={{
                      inputComponent: IMaskCustom,
                      inputProps: {
                        mask: phoneNumberMask(phone1),
                        onChange: e =>
                          setPhone1(e.target.value.replace(/[^0-9]/g, '')),
                        value: phone1,
                        placeholderChar: '',
                      },
                    }}
                  />

                  <div className='icons'>
                    <PhoneEnabledIcon />
                  </div>
                  {phone1 && (
                    <IconButton
                      className='clear-btn'
                      onClick={() => clearInput('phone1')}
                      tabIndex={-1}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                </div>
                <div className='form'>
                  <TextField
                    className='input'
                    name='phoneNumber2'
                    label={`${t('phone')} 2`}
                    variant='standard'
                    value={phone2}
                    autoComplete='off'
                    onChange={e =>
                      setPhone2(e.target.value.replace(/[^0-9]/g, ''))
                    }
                    InputProps={{
                      inputComponent: IMaskCustom,
                      inputProps: {
                        mask: phoneNumberMask(phone2),
                        onChange: e =>
                          setPhone2(e.target.value.replace(/[^0-9]/g, '')),
                        value: phone2,
                        placeholderChar: '',
                      },
                    }}
                  />
                  <div className='icons'>
                    <PhoneEnabledIcon />
                  </div>
                  {phone2 && (
                    <IconButton
                      className='clear-btn'
                      onClick={() => clearInput('phone2')}
                      tabIndex={-1}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                </div>
                <div className='form'>
                  <TextField
                    className='input'
                    name='phoneNumber3'
                    label={`${t('phone')} 3`}
                    variant='standard'
                    value={phone3}
                    autoComplete='off'
                    onChange={e =>
                      setPhone3(e.target.value.replace(/[^0-9]/g, ''))
                    }
                    InputProps={{
                      inputComponent: IMaskCustom,
                      inputProps: {
                        mask: phoneNumberMask(phone3),
                        onChange: e =>
                          setPhone3(e.target.value.replace(/[^0-9]/g, '')),
                        value: phone3,
                        placeholderChar: '',
                      },
                    }}
                  />
                  <div className='icons'>
                    <PhoneEnabledIcon />
                  </div>
                  {phone3 && (
                    <IconButton
                      className='clear-btn'
                      onClick={() => clearInput('phone3')}
                      tabIndex={-1}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                </div>
                <div className='form'>
                  <Autocomplete
                    className={`input combo-box${
                      fieldGroupError ? ' error' : ''
                    }`}
                    value={selectedGroup}
                    onChange={(event, newValue) => {
                      let selectedGroup = '';
                      if (newValue !== null) {
                        if (typeof newValue === 'object') {
                          if (newValue.inputValue) {
                            selectedGroup = newValue.inputValue;
                            setFieldGroupError(false);
                          } else {
                            selectedGroup = newValue.title;
                            setFieldGroupError(false);
                          }
                        } else {
                          selectedGroup = newValue;
                        }
                      }
                      setGroup(selectedGroup);
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      const { inputValue } = params;
                      // Создание нового значения
                      const isExisting = options.some(
                        option => inputValue === option.title
                      );
                      if (inputValue !== '' && !isExisting) {
                        filtered.push({
                          inputValue,
                          title: t('add_new_group') + `"${inputValue}"`,
                        });
                      }
                      // Исключение пустых значений
                      const nonEmptyFiltered = filtered.filter(
                        option => option.title !== ''
                      );
                      return nonEmptyFiltered;
                    }}
                    selectOnFocus
                    handleHomeEndKeys
                    options={groups}
                    getOptionLabel={option => {
                      // Value selected with enter, right from the input
                      if (typeof option === 'string') {
                        return option;
                      }
                      // Add "xxx" option created dynamically
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      // Regular option
                      return option.title;
                    }}
                    renderOption={(props, option) => (
                      <li {...props}>{option.title}</li>
                    )}
                    sx={{ width: 300 }}
                    freeSolo
                    renderInput={params => (
                      <TextField {...params} label={`${t('group')} *`} />
                    )}
                  />
                  <div className='icons'>
                    <GroupsIcon />
                  </div>
                </div>
                <p className='fst-italic'>{t('required')}</p>
                <Button
                  className='btn-edit-contact btn-blue'
                  type='submit'
                  variant='outlined'
                >
                  {t('save_changes')}
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
