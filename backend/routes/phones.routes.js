const db = require('../models');
const ContactDetails = db.contactDetails;
const {
  authenticateToken,
  requireAdmin,
} = require('../middleware/auth.middleware');

module.exports = app => {
  let router = require('express').Router();

  // Get all the contacts (требуется аутентификация, доступно admin и user)
  router.get('/get-all', authenticateToken, async (req, res) => {
    try {
      const contactDetails = await ContactDetails.findAll();
      res.send(contactDetails);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  // Create new contact (только admin)
  router.post(
    '/add-contact',
    authenticateToken,
    requireAdmin,
    async (req, res) => {
      try {
        const newContact = await ContactDetails.create({
          userName: req.body.userName,
          phoneNumber1: req.body.phoneNumber1,
          phoneNumber2: req.body.phoneNumber2,
          phoneNumber3: req.body.phoneNumber3,
          group: req.body.group,
        });
        res.send(newContact);
      } catch (err) {
        console.log('----- Error during record insertion : ' + err);
        res.status(500).send(err);
      }
    }
  );

  // Update a contact by ID (только admin)
  router.put(
    '/edit-contact/:id',
    authenticateToken,
    requireAdmin,
    async (req, res) => {
      const contactId = req.params.id;
      const updatedContact = {
        userName: req.body.userName,
        phoneNumber1: req.body.phoneNumber1,
        phoneNumber2: req.body.phoneNumber2,
        phoneNumber3: req.body.phoneNumber3,
        group: req.body.group,
      };

      try {
        const [updated] = await ContactDetails.update(updatedContact, {
          where: { id: contactId },
        });
        if (updated) {
          const updatedDetails = await ContactDetails.findByPk(contactId);
          res.send(updatedDetails);
        } else {
          res.status(404).send({ message: 'Contact not found' });
        }
      } catch (err) {
        console.log('----- Error during contact update: ' + err);
        res.status(500).send(err);
      }
    }
  );

  // Delete a contact by ID (только admin)
  router.delete(
    '/delete-contact/:id',
    authenticateToken,
    requireAdmin,
    async (req, res) => {
      const contactId = req.params.id;

      try {
        const deleted = await ContactDetails.destroy({
          where: { id: contactId },
        });
        if (deleted) {
          res.send({ message: 'Контакт успешно удален' });
        } else {
          res.status(404).send({ message: 'Contact not found' });
        }
      } catch (err) {
        console.log('----- Ошибка при удалении записи: ' + err);
        res.status(500).send(err);
      }
    }
  );

  app.use('/api/contacts', router);
};
