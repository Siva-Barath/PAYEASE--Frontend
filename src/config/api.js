// API Configuration
const API_CONFIG = {
  // Use environment variable for production
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
};

export default API_CONFIG;