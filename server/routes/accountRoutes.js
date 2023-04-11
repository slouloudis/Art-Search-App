// Import required modules and set up app
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const router = express.Router();

const app = express();
app.use(express.urlencoded({ extended: true }))

// Sign up route
router.post('/signup', async (req, res) => {
  console.log(req.body)
  try {
    // Check if email is already in use
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: 'User created successfully', _id: user._id, email: user.email });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});

// Sign in route
router.post('/signin', async (req, res) => {
  try {
    // Check if email exists in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare password with stored hashed password
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Create and sign JWT token
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Authentication successful', token, _id: user._id, email: user.email });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// get user by ID. 
// Get user by ID route
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// add favorite painting route

router.post('/add-favorite/:userId', async (req, res) => {
  const { userId } = req.params;
  const { id, title, artist, imageUrl } = req.body;

  try {
    const user = await User.findById(userId);
    user.favoritePaintings.push({ id, title, artist, imageUrl });
    await user.save();
    res.status(200).json({ message: 'Painting added to favorites!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get user favorite painings. 
router.get('/:userId/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.favoritePaintings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// remove a painting from favorites.
router.post('/remove-favorite/:userId', async (req, res) => {
  const { userId } = req.params;
  const { paintingId } = req.body;

  try {
    const user = await User.findById(userId);
    user.favoritePaintings = user.favoritePaintings.filter(painting => painting.id !== paintingId);
    await user.save();
    res.status(200).json({ message: 'Painting removed from favorites!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
