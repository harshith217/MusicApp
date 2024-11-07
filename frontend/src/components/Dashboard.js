// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AudioPlayer from './AudioPlayer';
import ItunesSearch from './ItunesSearch';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userRes = await api.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(userRes.data);

        const playlistsRes = await api.get('/api/playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlaylists(playlistsRes.data);
      } catch (err) {
        console.error(err);
        setError(err.response ? err.response.data.msg : 'Failed to load user data and playlists');
      }
    };

    fetchData();
  }, []);

  const togglePlaylist = (playlistId) => {
    setExpandedPlaylist((prev) => (prev === playlistId ? null : playlistId));
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      {user && (
        <h1 className="text-3xl font-bold text-center mb-6">Welcome, {user.username}!</h1>
      )}

      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4 text-center">Your Playlists</h2>
          <div className="grid grid-cols-1 gap-4">
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div
                    className="p-4 cursor-pointer hover:bg-blue-100 transition-colors duration-300"
                    onClick={() => togglePlaylist(playlist._id)}
                  >
                    <h3 className="text-lg font-bold text-gray-800">{playlist.name}</h3>
                    <p className="text-sm text-gray-600">
                      {playlist.tracks.length} tracks
                    </p>
                  </div>

                  {expandedPlaylist === playlist._id && (
                    <ul className="p-4 bg-gray-100">
                      {playlist.tracks.map((track) => (
                        <li key={track.trackId} className="text-gray-800 flex items-center justify-between">
                          {track.trackName}

                          {/* AudioPlayer for each playlist song */}
                          <AudioPlayer trackName={track.trackName} previewUrl={track.previewUrl} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">You have no playlists yet.</p>
            )}
          </div>
        </div>

        <div className="md:w-1/2 mt-6 md:mt-0">
          <ItunesSearch onAddToPlaylist={song => {/* Add logic to update playlists with new song */}} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
