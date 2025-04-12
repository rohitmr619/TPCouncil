const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Debug environment variables
console.log('Environment variables loaded:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
console.log('CLASH_ROYALE_API_KEY:', process.env.CLASH_ROYALE_API_KEY ? 'Set' : 'Not set');
console.log('CLASH_ROYALE_API_KEY length:', process.env.CLASH_ROYALE_API_KEY ? process.env.CLASH_ROYALE_API_KEY.length : 0);

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://20.244.50.82:3000'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 