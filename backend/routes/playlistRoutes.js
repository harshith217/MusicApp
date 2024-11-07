// /routes/playlistRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const Playlist = require('../models/Playlist'); // Assuming you have a Playlist model

// @route   POST /playlists/create
// @desc    Create a new playlist
// @access  Private (Protected Route)
router.post('/create', authMiddleware, async (req, res) => {
  const { name, tracks } = req.body;

  try {
    const newPlaylist = new Playlist({
      name,
      tracks,
      user: req.user.id, // Assuming the user ID is stored in req.user
    });

    const playlist = await newPlaylist.save();
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /playlists
// @desc    Get all playlists for the logged-in user
// @access  Private (Protected Route)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE /playlists/:id
// @desc    Delete a playlist by ID
// @access  Private (Protected Route)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ msg: 'Playlist not found' });
    }

    // Ensure the user owns the playlist
    if (playlist.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await playlist.remove();
    res.json({ msg: 'Playlist removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
