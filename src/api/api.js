import axios from 'axios';

// Set the Render backend URL here (no trailing slash).
// Example: 'https://helpdeskcrm-service.onrender.com'
// NOTE: you asked to avoid .env — this constant will be used directly.
const BACKEND_BASE_URL = 'https://helpdesk-backend-90tl.onrender.com/api';

const base = BACKEND_BASE_URL
  ? `${BACKEND_BASE_URL}/api`
  : (typeof window !== 'undefined' && window.location.hostname !== 'localhost')
    ? `${window.location.origin}/api`
    : 'http://localhost:5000/api';

const API = axios.create({
  baseURL: base,
});

console.log('API base URL:', API.defaults.baseURL);

// attach token (guard for environments where localStorage may not exist)
API.interceptors.request.use((config) => {
  try {
    const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('token') : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    // ignore when localStorage isn't available
  }
  return config;
});

export default API;

