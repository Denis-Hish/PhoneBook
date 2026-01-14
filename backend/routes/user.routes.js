const express = require('express');
const router = express.Router();
const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');
const {
  authenticateToken,
  requireAdmin,
} = require('../middleware/auth.middleware');

router.post(
  '/createOrUpdateUser',
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    const { username, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [user, created] = await User.upsert({
        username,
        hashedPassword,
        role: role || 'user', // По умолчанию роль 'user'
      });
      res.status(200).json({
        message: created
          ? 'User created successfully'
          : 'User updated successfully',
      });
    } catch (error) {
      console.error('Error creating or updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

router.delete(
  '/deleteUser/:username',
  authenticateToken,
  requireAdmin,
  async (req, res) => {
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
  }
);

router.get(
  '/getAllUserLogins',
  authenticateToken,
  requireAdmin,
  async (req, res) => {
    try {
      const users = await User.findAll({ attributes: ['username', 'role'] });
      const usersData = users.map(user => ({
        username: user.username,
        role: user.role,
      }));
      res.status(200).json({ users: usersData });
    } catch (error) {
      console.error('Error getting user logins:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

module.exports = router;
