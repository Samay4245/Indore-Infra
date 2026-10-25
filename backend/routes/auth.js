const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Please enter both Login ID and password' });
  }

  const trimmedUsername = username.toString().trim();
  const digitsOnly = trimmedUsername.replace(/\D/g, '');

  try {
    const [users] = await db.execute(
      'SELECT * FROM users WHERE username = ? OR (LENGTH(?) >= 10 AND username = ?)',
      [trimmedUsername, digitsOnly, digitsOnly]
    );

    if (users.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        name: 'Roopnarayan Shukla'
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            username: user.username,
            name: 'Roopnarayan Shukla'
          }
        });
      }
    );
  } catch (err) {
    console.error('[Auth Error]', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/auth/verify - Check token validity
router.get('/verify', authMiddleware, async (req, res) => {
  res.json({
    success: true,
    user: {
      username: req.user.username,
      name: 'Roopnarayan Shukla'
    }
  });
});

module.exports = router;
