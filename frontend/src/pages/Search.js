import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    setAllResults([]);
    fetchResults(1);
  };

  const [error, setError] = useState(null);  // New state for error handling

// Fetch results with error handling
const fetchResults = async (pageNumber) => {
  setLoading(true);
    
  setError(null);  // Clear previous errors
  try {
    const response = await axios.get(
      `https://itunes.apple.com/search?term=${query}&entity=song&limit=10&offset=${(pageNumber - 1) * 10}`
    );
    if (response.data.results.length === 0) {
      setError('No results found. Please try a different search term.');
    } else {
      setAllResults((prevResults) => [...prevResults, ...response.data.results]);
    }
  } catch (error) {
    setError('There was an error fetching the data. Please try again later.');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (page > 1) {
      fetchResults(page);
    }
  }, [page]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Music Streaming Search</h2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex space-x-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-3 rounded-lg w-full"
            placeholder="Enter song, artist, or album"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            disabled={loading}  // Disable button when loading
            >
            {loading ? 'Searching...' : 'Search'}  {/* Change text when loading */}
          </button>
        </div>
      </form>

      {/* Show loading spinner */}
      {loading && <p className="text-center text-blue-500">Loading...</p>}
       {error && <p className="text-center text-red-500">{error}</p>}

      {/* Display search results */}
      {!loading && allResults.length > 0 && (
        <div>
  <ul className="space-y-4">
    {allResults.map((track) => (
      <li key={track.trackId} className="flex items-center space-x-4 bg-white shadow p-4 rounded-lg">
        <img
          src={track.artworkUrl100}
          alt={track.trackName}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <h4 className="font-bold text-lg text-gray-700">{track.trackName}</h4>
          <p className="text-gray-500">by {track.artistName}</p>
          {/* Embedded audio player */}
          <audio controls className="mt-2">
            <source src={track.previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </li>
    ))}
  </ul>
        <div className="text-center mt-6">
  <button
    onClick={() => setPage(page + 1)}
    className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg ${loading ? 'cursor-not-allowed' : ''}`}
    disabled={loading}  // Disable the button when loading
  >
    {loading ? 'Loading More...' : 'Load More'}  {/* Change text when loading */}
  </button>
</div>

</div>

      )}
    </div>
  );
};

export default Search;
