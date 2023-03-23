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

   app.use('/api/contacts', router);
};
