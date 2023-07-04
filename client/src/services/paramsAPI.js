import axios from 'axios';
import { setMessage } from '../components/Snackbar';

export const getAllContacts = async () => {
   let res = await axios.get('api/contacts/get-all');
   return res.data || [];
};

export const addContact = (newContact) => {
   axios
      .post('api/contacts/add-contact', newContact)
      .then((response) => {
         const message = `Contact ${response.data.userName} saved!`;
         const color = 'info';
         setMessage({ message, color });
      }) // TODO: Add success message
      .catch((error) => {
         console.error('There was an error!', error); // TODO: Add error handler
      });
};

export const editContact = (contactId, updatedContact) => {
   axios
      .put(`api/contacts/edit-contact/${contactId}`, updatedContact)
      .then((response) => {
         const message = `Contact ${response.data.userName} edited!`;
         const color = 'success';
         setMessage({ message, color });
      })
      .catch((error) => {
         console.error('There was an error editing the contact:', error);
      });
};

export const deleteContact = (contactId) => {
   axios
      .delete(`api/contacts/delete-contact/${contactId}`)
      .then(() => {
         const message = `Contact successfully deleted!`;
         const color = 'error';
         setMessage({ message, color });
      })
      .catch((error) => {
         console.error('There was an error deleting the contact:', error);
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
