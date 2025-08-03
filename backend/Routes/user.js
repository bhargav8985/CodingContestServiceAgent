const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Fetch users error:', err);
    res.status(500).send('Error fetching users');
  }
});

// Update platforms and notification time
router.put('/:id', async (req, res) => {
  try {
    const { platforms, notificationTime } = req.body;
    await User.findByIdAndUpdate(req.params.id, { platforms, notificationTime });
    res.send('User email preferences updated');
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).send('Error updating user');
  }
});

// Update contest settings by email
router.put('/contest/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { contestSettings } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { contestSettings },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Update contest settings error:', err);
    res.status(500).send('Error updating contest settings');
  }
});

// Update contest preferences by userId
router.put('/contest-preferences/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { contestPreferences } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { contestSettings: contestPreferences },
      { new: true }
    );

    if (!updatedUser) return res.status(404).send('User not found');
    res.status(200).json({ message: 'Contest preferences updated successfully' });
  } catch (err) {
    console.error('Update contest preferences error:', err);
    res.status(500).send('Server error');
  }
});
router.put('/profile/:userId', async (req, res) => {
  try {
    const { email, notificationsEnabled } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId, // ✅ correct param usage
      { email, notificationsEnabled },
      { new: true }
    );

    if (!updatedUser) return res.status(404).send('User not found');
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).send('Error updating profile');
  }
});

// ✅ GET user profile by ID
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send('User not found');
    res.status(200).json(user);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).send('Error fetching profile');
  }
});

// ✅ UPDATE user profile
router.put('/profile/:userId', async (req, res) => {
  try {
    const { email, notificationsEnabled } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { email, notificationsEnabled },
      { new: true }
    );

    if (!updatedUser) return res.status(404).send('User not found');
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).send('Error updating profile');
  }
});
module.exports = router;
