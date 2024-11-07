// models/Playlist.js
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tracks: [{
    trackId: String,
    trackName: String,
    artistName: String,
    previewUrl: String,
  }],
});

module.exports = mongoose.model('Playlist', playlistSchema);
