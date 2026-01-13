const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const db = require('../models');
const User = db.User;
const {
  generateToken,
  authenticateToken,
} = require('../middleware/auth.middleware');

// Вход в систему
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log(`📝 Login attempt for user: ${username}`);

    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log(`❌ User not found: ${username}`);
      return res
        .status(401)
        .json({ success: false, message: 'Invalid username or password' });
    }

    console.log(`✅ User found: ${username}, checking password...`);
    const isPasswordValid = await argon2.verify(user.hashedPassword, password);

    if (!isPasswordValid) {
      console.log(`❌ Password invalid for user: ${username}`);
      return res
        .status(401)
        .json({ success: false, message: 'Invalid username or password' });
    }

    console.log(`✅ Password valid for user: ${username}, generating token...`);
    // Генерируем JWT токен
    const token = generateToken(user);

    console.log(`✅ Login successful for user: ${username}`);
    return res.json({
      success: true,
      token,
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('❌ Error during login:', error.message);
    console.error('   Full error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Проверка токена и получение информации о текущем пользователе
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'role'],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.json({
      success: true,
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error getting user info:', error);
    return res
      .status(500)
      .json({ success: false, message: 'An error occurred' });
  }
});

module.exports = router;
