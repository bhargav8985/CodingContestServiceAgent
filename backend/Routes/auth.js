const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User'); 

router.post('/register', async (req, res) => {
  console.log('Register endpoint hit');
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password, provider: 'local' });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback after Google authentication
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login',
    session: true,
  }),
  async (req, res) => {
    try {
      const profile = req.user;

      let user = await User.findOne({ email: profile.email });

      if (!user) {
        user = new User({
          email: profile.email,
          name: profile.name,
          picture: profile.picture,
          provider: 'google',
        });
        await user.save();
      }

      console.log('Google login successful:', user.email);

      const encodedUser = encodeURIComponent(JSON.stringify({
        email: user.email,
        name: user.name,
        picture: user.picture
      }));

      res.redirect(`http://localhost:3000/dashboard?user=${encodedUser}`);
    } catch (err) {
      console.error('Google login error:', err);
      res.redirect('http://localhost:3000/login');
    }
  }
);

router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: 'http://localhost:3000/login',
}), (req, res) => {
  const user = req.user;

  // Ensure user is populated
  if (!user) return res.redirect('http://localhost:3000/login');

  // Encode user info safely
  const encodedUser = encodeURIComponent(JSON.stringify({
    name: user.name,
    email: user.email,
    picture: user.picture,
    _id: user._id,
  }));

  // ✅ This redirect must include the encoded user object in the URL
  res.redirect(`http://localhost:3000/dashboard?user=${encodedUser}`);
});

// --- Logout (optional) ---
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Logout error');
    }
    res.redirect('http://localhost:3000');
  });
});

module.exports = router;
