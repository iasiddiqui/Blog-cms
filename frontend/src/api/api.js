import axios from 'axios';

// Set backend URL based on environment
const backendURL = process.env.NODE_ENV === 'production'
  ? 'https://your-deployed-backend-url.com/api'  
  : 'http://localhost:5000/api';                
const API = axios.create({
  baseURL: backendURL,
});

// Add Authorization header for all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default API;
