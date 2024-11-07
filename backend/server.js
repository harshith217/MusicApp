// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');




// Initialize app
dotenv.config();
console.log('Mongo URI:', process.env.MONGODB_URI); 
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.send('Music Streaming Backend is running');
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/playlists', require('./routes/playlistRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
