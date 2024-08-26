import axios from 'axios';

console.log("process.env.REACT_BACKEND_URL", process.env.REACT_APP_BACKEND_URL)

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api',
});

export default api;