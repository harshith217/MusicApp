// src/components/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Music Streaming Service</h1>
          <nav>
            <a href="/login" className="text-blue-500 hover:underline mx-2">Login</a>
            <a href="/signup" className="text-blue-500 hover:underline mx-2">Sign up</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-4">Discover New Music</h2>
        <p className="text-lg mb-8">Stream your favorite songs and playlists.</p>
        <a href="/explore" className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-200">
          Explore Music
        </a>
      </div>

      {/* Featured Playlists Section */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example Playlist Cards */}
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold mb-2">Playlist {index + 1}</h3>
              <p className="text-gray-600">Description of the playlist goes here. Enjoy listening!</p>
              <a href="#" className="text-blue-500 hover:underline mt-2 block">Listen Now</a>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center py-4">
        <p className="text-gray-600">© 2024 Music Streaming Service. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
