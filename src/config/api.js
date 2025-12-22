// API Configuration
const API_CONFIG = {
  // Use environment variable for production
  BASE_URL: import.meta.env.VITE_API_URL || 'https://payease-backend-fmmh.onrender.com/api'
};

export default API_CONFIG;