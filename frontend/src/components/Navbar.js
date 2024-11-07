import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-blue-600 text-white">
      <ul className="flex justify-between">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/player">Player</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
