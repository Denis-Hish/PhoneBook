const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const User = require('../models/authentication.model');

// Маршрут для аутентификации пользователя
router.post('/login', async (req, res) => {
   const { username, password } = req.body;

   try {
      const user = await User.findOne({ username });

      if (!user) {
         return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }

      const isPasswordValid = await argon2.verify(user.hashedPassword, password);

      if (!isPasswordValid) {
         return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }

      // Аутентификация успешна
      return res.json({ success: true });
   } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ success: false, message: 'An error occurred during login' });
   }
});

module.exports = router;
