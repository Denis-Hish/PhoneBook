const express = require('express');
const router = express.Router();
const db = require('../models');
const User = db.User;
const argon2 = require('argon2');

router.post('/createOrUpdateUser', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await argon2.hash(password);
    const [user, created] = await User.upsert({
      username,
      hashedPassword,
    });
    res
      .status(200)
      .json({
        message: created
          ? 'User created successfully'
          : 'User updated successfully',
      });
  } catch (error) {
    console.error('Error creating or updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/deleteUser/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const deleted = await User.destroy({ where: { username } });
    if (deleted) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/getAllUserLogins', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['username'] });
    const logins = users.map(user => user.username);
    res.status(200).json({ logins });
  } catch (error) {
    console.error('Error getting user logins:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
