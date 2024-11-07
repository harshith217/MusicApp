// src/services/itunes.js
import axios from 'axios';

// Create an Axios instance for iTunes API
const itunesApi = axios.create({
  baseURL: 'https://itunes.apple.com/',
  timeout: 10000,
});

export default itunesApi;
