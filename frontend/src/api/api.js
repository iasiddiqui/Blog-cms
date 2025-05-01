// src/api/api.js (frontend)
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your actual backend URL
});

// Add Authorization header for all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default API;
