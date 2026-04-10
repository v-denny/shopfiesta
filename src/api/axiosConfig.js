// src/api/axiosConfig.js
import axios from 'axios';

// Create a custom axios instance
const apiClient = axios.create({
  // Set the base URL once! 
  // Notice I included '/api' at the end to save you even more typing later.
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:5000/api',
  
  // You can also set default headers here that will apply to EVERY request
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;