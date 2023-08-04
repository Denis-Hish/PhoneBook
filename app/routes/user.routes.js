const express = require('express');
const router = express.Router();
const { createOrUpdateAdminUser, deleteUserByUsername, getAllUserLogins } = require('../../userUtils');

router.post('/createOrUpdateUser', async (req, res) => {
   const { username, password } = req.body;
   try {
      await createOrUpdateAdminUser(username, password);
      res.status(200).json({ message: 'User created or updated successfully' });
   } catch (error) {
      console.error('Error creating or updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
   }
});

router.delete('/deleteUser/:username', async (req, res) => {
   const { username } = req.params;
   try {
      await deleteUserByUsername(username);
      res.status(200).json({ message: 'User deleted successfully' });
   } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
   }
});

router.get('/getAllUserLogins', async (req, res) => {
   try {
      const logins = await getAllUserLogins();
      res.status(200).json({ logins });
   } catch (error) {
      console.error('Error getting user logins:', error);
      res.status(500).json({ message: 'Internal server error' });
   }
});

module.exports = router;
