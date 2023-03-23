import { useState } from 'react';
import { addContact } from '../services/paramsAPI';

const AddContacts = () => {
   const [contact, setContact] = useState();

   const onChangeHandler = event => {
      const { name, value } = event;
      setContact(prev => {
         return { ...prev, [name]: value };
      });
   };

   const sumbitForm = event => {
      // TODO: Add validation
      event.preventDefault();
      console.log('--contact--', contact);
      addContact(contact);
   };

   return (
      <div>
         <h2>Add Contact:</h2>
         <form onSubmit={sumbitForm}>
            <table>
               <tbody>
                  <tr>
                     <td>Name:</td>
                     <td>
                        <input
                           type="text"
                           name="userName"
                           value={contact?.userName}
                           onChange={e => onChangeHandler(e.target)}
                        />
                     </td>
                  </tr>
                  <tr>
                     <td>Phone1:</td>
                     <td>
                        <input
                           type="text"
                           name="phoneNumber1"
                           value={contact?.phoneNumber1}
                           onChange={e => onChangeHandler(e.target)}
                        />
                     </td>
                  </tr>
                  <tr>
                     <td>Phone2:</td>
                     <td>
                        <input
                           type="text"
                           name="phoneNumber2"
                           value={contact?.phoneNumber2}
                           onChange={e => onChangeHandler(e.target)}
                        />
                     </td>
                  </tr>
                  <tr>
                     <td>Phone3:</td>
                     <td>
                        <input
                           type="text"
                           name="phoneNumber3"
                           value={contact?.phoneNumber3}
                           onChange={e => onChangeHandler(e.target)}
                        />
                     </td>
                  </tr>
                  <tr>
                     <td>Group:</td>
                     <td>
                        <input
                           type="text"
                           name="group"
                           value={contact?.group}
                           onChange={e => onChangeHandler(e.target)}
                        />
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <button type="submit">Submit</button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </form>
      </div>
   );
};

export default AddContacts;
