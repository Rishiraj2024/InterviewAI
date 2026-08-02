import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API key / authorization header injection
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to format errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    return Promise.reject(message);
  }
);

export default api;
