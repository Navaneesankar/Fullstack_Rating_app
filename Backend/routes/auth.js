const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../firebase');
const router = express.Router();

const USERS = db.collection('users');

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({msg:'Missing fields'});
  const hash = await bcrypt.hash(password, 10);
  await USERS.doc(email).set({ name, email, passwordHash: hash, role: 'USER' });
  res.json({ msg: 'User created' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const doc = await USERS.doc(email).get();
  if (!doc.exists) return res.status(401).json({ msg: 'Invalid credentials' });

  const user = doc.data();
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

module.exports = router;
