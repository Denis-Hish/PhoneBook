const db = require('../models');
const ContactDetails = db.contactDetails;

module.exports = app => {
   let router = require('express').Router();

   // Get all the contacts
   router.get('/get-all', (req, res) => {
      ContactDetails.find({})
         .then(contactDetails => {
            res.send(contactDetails);
         })
         .catch(e => {
            res.send(e);
         });
   });

   // Create new contact
   router.post('/add-contact', (req, res) => {
      // TODO: add express validation
      const newContact = new ContactDetails({
         userName: req.body.userName,
         phoneNumber1: req.body.phoneNumber1,
         phoneNumber2: req.body.phoneNumber2,
         phoneNumber3: req.body.phoneNumber3,
         group: req.body.group,
      });

      newContact
         .save()
         .then(newContactDetails => {
            res.send(newContactDetails);
         })
         .catch(err => {
            console.log('----- Error during record insertion : ' + err);
            res.send(err);
         });
   });

   // ----------------TESTED------------------------------------------
   // Update a contact by ID
   router.put('/edit-contact/:id', (req, res) => {
      const contactId = req.params.id;

      const updatedContact = {
         userName: req.body.userName,
         phoneNumber1: req.body.phoneNumber1,
         phoneNumber2: req.body.phoneNumber2,
         phoneNumber3: req.body.phoneNumber3,
         group: req.body.group,
      };

      ContactDetails.findByIdAndUpdate(contactId, updatedContact, { new: true })
         .then(updatedContactDetails => {
            res.send(updatedContactDetails);
         })
         .catch(err => {
            console.log('----- Error during contact update: ' + err);
            res.send(err);
         });
   });

   // Delete a contact by ID
   router.delete('/delete-contact/:id', (req, res) => {
      const contactId = req.params.id;

      ContactDetails.findByIdAndDelete(contactId)
         .then(() => {
            res.send({ message: 'Контакт успешно удален' });
         })
         .catch(err => {
            console.log('----- Ошибка при удалении записи: ' + err);
            res.send(err);
         });
   });
   // ----------------------------------------------------------------

   app.use('/api/contacts', router);
};
