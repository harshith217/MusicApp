// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Update this if your backend runs on a different port or URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
