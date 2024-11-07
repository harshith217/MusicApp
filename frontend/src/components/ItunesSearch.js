// src/components/ItunesSearch.js
import React, { useState } from 'react';
import itunesApi from '../services/itunes'; // Ensure the path to your service is correct
import AudioPlayer from './AudioPlayer';

const ItunesSearch = ({ onAddToPlaylist }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await itunesApi.get(`/search`, {
        params: {
          term: searchTerm,
          entity: 'song',
          limit: 10,
        },
      });
      setSongs(response.data.results);
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error fetching iTunes data:', err);
      setError('Failed to fetch data from iTunes. Please try again later.');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Search for songs..."
      />
      <button onClick={handleSearch} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Search
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-4">
        {songs.length > 0 && (
          <ul className="space-y-4">
            {songs.map((song) => (
              <li key={song.trackId} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                <div>
                  <p className="font-bold">{song.trackName}</p>
                  <p className="text-gray-600">{song.artistName}</p>
                </div>

                {/* Safely render AudioPlayer */}
                <AudioPlayer trackName={song.trackName} previewUrl={song.previewUrl} />

                <button
                  onClick={() => onAddToPlaylist(song)}
                  className="ml-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Add to Playlist
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ItunesSearch;
