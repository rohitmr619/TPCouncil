const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const axios = require('axios');

// Get user data including player tag and trophy count
router.get('/data', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get player stats from Clash Royale API
router.get('/player-stats/:playerTag', auth, async (req, res) => {
  try {
    const { playerTag } = req.params;
    
    // Remove # if present
    const cleanPlayerTag = playerTag.startsWith('#') ? playerTag.substring(1) : playerTag;
    
    if (!process.env.CLASH_ROYALE_API_KEY) {
      throw new Error('Clash Royale API key is not configured');
    }

    // Fetch player data from Clash Royale API
    const apiUrl = `https://api.clashroyale.com/v1/players/%23${cleanPlayerTag}`;
    
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.CLASH_ROYALE_API_KEY}`,
        'Accept': 'application/json',
      },
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    });

    if (response.status === 403) {
      throw new Error('Invalid API key or unauthorized access');
    }

    if (response.status === 404) {
      throw new Error('Player tag not found');
    }

    if (response.status !== 200) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Send player data to client
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching player stats:', err.message);
    if (err.response) {
      console.error('Error response data:', JSON.stringify(err.response.data, null, 2));
      console.error('Error response status:', err.response.status);
    }
    
    if (err.response?.status === 404) {
      return res.status(404).json({ message: 'Invalid player tag' });
    }
    if (err.response?.status === 403) {
      return res.status(500).json({ message: 'Clash Royale API key is invalid' });
    }
    
    res.status(500).json({ 
      message: 'Error fetching player data from Clash Royale API',
      error: err.message,
      details: err.response?.data || 'No additional details'
    });
  }
});

// Update player tag and fetch trophy count
router.post('/player-tag', auth, async (req, res) => {
  try {
    const { playerTag } = req.body;
    console.log('Received player tag:', playerTag);

    // Remove # if present in the player tag
    const cleanPlayerTag = playerTag.replace('#', '');
    console.log('Cleaned player tag:', cleanPlayerTag);

    // Check if player tag is already in use
    const existingUser = await User.findOne({ playerTag: cleanPlayerTag });
    if (existingUser && existingUser._id.toString() !== req.user.id) {
      return res.status(400).json({ message: 'Player tag is already in use' });
    }

    // Debug API key
    console.log('API Key from env:', process.env.CLASH_ROYALE_API_KEY);
    console.log('API Key length:', process.env.CLASH_ROYALE_API_KEY ? process.env.CLASH_ROYALE_API_KEY.length : 0);
    
    if (!process.env.CLASH_ROYALE_API_KEY) {
      throw new Error('Clash Royale API key is not configured');
    }

    // Fetch trophy count from Clash Royale API
    const apiUrl = `https://api.clashroyale.com/v1/players/%23${cleanPlayerTag}`;
    console.log('API URL:', apiUrl);
    
    // Create the authorization header
    const authHeader = `Bearer ${process.env.CLASH_ROYALE_API_KEY}`;
    console.log('Authorization header:', authHeader);
    
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
      },
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    });

    if (response.status === 403) {
      console.error('API Key error:', response.data);
      throw new Error('Invalid API key or unauthorized access');
    }

    if (response.status === 404) {
      throw new Error('Player tag not found');
    }

    if (response.status !== 200) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    console.log('API Response:', JSON.stringify(response.data, null, 2));
    const trophyCount = response.data.trophies;
    console.log('Trophy count:', trophyCount);

    // Update user with player tag and trophy count
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { playerTag: cleanPlayerTag, trophyCount },
      { new: true }
    ).select('-password');

    console.log('Updated user:', JSON.stringify(user, null, 2));
    res.json(user);
  } catch (err) {
    console.error('Clash Royale API Error:', err.message);
    if (err.response) {
      console.error('Error response data:', JSON.stringify(err.response.data, null, 2));
      console.error('Error response status:', err.response.status);
    }
    
    if (err.response?.status === 404) {
      return res.status(400).json({ message: 'Invalid player tag' });
    }
    if (err.response?.status === 403) {
      return res.status(500).json({ message: 'Clash Royale API key is invalid' });
    }
    res.status(500).json({ 
      message: 'Error fetching player data from Clash Royale API',
      error: err.message,
      details: err.response?.data || 'No additional details'
    });
  }
});

module.exports = router; 