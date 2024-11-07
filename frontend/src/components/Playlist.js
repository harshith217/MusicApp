// /src/components/Playlist.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState('');
  const [tracks, setTracks] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await api.get('/playlists');
        setPlaylists(response.data);
      } catch (err) {
        setError('Error fetching playlists.');
      }
    };
    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/playlists/create', { name, tracks });
      setPlaylists([...playlists, response.data]);
      setName('');
      setTracks('');
    } catch (err) {
      setError('Error creating playlist.');
    }
  };

  // Delete a playlist
  const handleDeletePlaylist = async (id) => {
    try {
      await api.delete(`/playlists/${id}`);
      setPlaylists(playlists.filter(playlist => playlist._id !== id));  // Remove deleted playlist
    } catch (err) {
      setError('Error deleting playlist.');
    }
  };

  return (
    <div>
      <h2>Your Playlists</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleCreatePlaylist}>
        <input
          type="text"
          placeholder="Playlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Tracks (comma-separated)"
          value={tracks}
          onChange={(e) => setTracks(e.target.value)}
        ></textarea>
        <button type="submit">Create Playlist</button>
      </form>

      <ul>
        {playlists.map((playlist) => (
          <li key={playlist._id}>
            {playlist.name}
            <button onClick={() => handleDeletePlaylist(playlist._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
