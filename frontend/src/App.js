// src/App.js
import './App.css'; 
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Playlist from './components/Playlist';
import Home from './components/Home';
import Signup  from './components/Signup';
import CreatePlaylist from './components/CreatePlaylist';
import Dashboard from './components/Dashboard';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/playlists" element={isAuthenticated ? <Playlist /> : <Login setAuth={setIsAuthenticated} />} />
          <Route path="/" element={<Home />} />  {/* Home Page */}
          <Route path="/signup" element={<Signup />} />  {/* Register Page */}
          <Route path="/Dashboard" element={isAuthenticated ? <Dashboard /> : <Login setAuth={setIsAuthenticated} />} />
        <Route path="/create-playlist" element={<CreatePlaylist />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
