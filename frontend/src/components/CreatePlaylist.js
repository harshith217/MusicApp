// src/components/CreatePlaylist.js
import React, { useState } from 'react';
import api from '../services/api';

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/playlists', { name: playlistName });
      setPlaylistName('');
      alert('Playlist created successfully!');
    } catch (err) {
      setError('Failed to create playlist.');
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold text-center mb-4">Create Playlist</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleCreate} className="flex flex-col items-center">
        <input
          type="text"
          className="border rounded-lg p-2 mb-4 w-1/2"
          placeholder="Playlist Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2">
          Create Playlist
        </button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
