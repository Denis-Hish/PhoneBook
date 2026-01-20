import axios from '../utils/axiosInstance';
import { setMessage } from '../utils/snackbarUtils';

export const getAllContacts = async () => {
  let res = await axios.get('/contacts/get-all');
  return res.data || [];
};

export const addContact = async (newContact, t) => {
  return axios
    .post('/contacts/add-contact', newContact)
    .then(response => {
      const message = `${t('contact')} "${response.data.userName}" ${t(
        'saved',
      )}`;
      const color = 'info';
      setMessage({ message, color });
      return response;
    })
    .catch(error => {
      console.error('There was an error!', error);
      throw error;
    });
};

export const editContact = (contactId, updatedContact, t) => {
  axios
    .put(`/contacts/edit-contact/${contactId}`, updatedContact)
    .then(response => {
      const message = `${t('contact')} "${response.data.userName}" ${t(
        'edited',
      )}`;
      const color = 'success';
      setMessage({ message, color });
    })
    .catch(error => {
      console.error('There was an error editing the contact:', error);
    });
};

export const deleteContact = (contactId, t) => {
  return axios
    .delete(`/contacts/delete-contact/${contactId}`)
    .then(response => {
      const message = `${t('contact')} ${t('deleted')}`;
      const color = 'error';
      setMessage({ message, color });
      return response;
    })
    .catch(error => {
      console.error('There was an error deleting the contact:', error);
      throw error;
    });
};

// ----------------------------------------------------------------

// TODO: Add error handler everywhere with popap in UI

//   updateParams: async (settings, callback) => {
//     try {
//       const response = await axios.patch('/api/settings/update', settings)
//       .then((response) => {
//         callback();
//       });
//       // response.data.headers['Content-Type'];
//       console.log('👉 Returned data:', response);
//     } catch (error) {
//       console.log(`😱 Axios request failed: ${error}`);
//     }
//   },

//   updateParams: async (settings, callback = () => {}) => {
//     try {
//       await axios.patch('/api/settings/update', settings)
//       .then(
//         callback()
//       );
//       console.log('👉 Updated');
//     } catch (error) {
//       console.log(`😱 Axios request failed: ${error}`);
//     }
//   }
