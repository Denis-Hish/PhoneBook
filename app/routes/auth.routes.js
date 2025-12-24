const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const db = require('../models');
const User = db.User;

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid username or password' });
    }

    const isPasswordValid = await argon2.verify(user.hashedPassword, password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid username or password' });
    }

    return res.json({ success: true });
  } catch (error) {
    console.error('Error during login:', error);
    return res
      .status(500)
      .json({ success: false, message: 'An error occurred during login' });
  }
});

module.exports = router;
