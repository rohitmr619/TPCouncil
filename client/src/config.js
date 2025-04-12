const config = {
  // Use environment variable if set, otherwise use localhost for development
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'
};

export default config; 