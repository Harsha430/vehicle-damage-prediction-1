import axios from 'axios';

const API_BASE = 'http://localhost:5000';

// Configure axios with default timeout and retry logic
const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000, // 30 seconds
  headers: {
    'Accept': 'application/json',
  }
});

export const uploadImage = async (formData) => {
  try {
    console.log('Uploading image to:', `${API_BASE}/api/upload`);
    
    // Create form data with the file
    if (!(formData instanceof FormData)) {
      const newFormData = new FormData();
      newFormData.append('file', formData);
      formData = newFormData;
    }
    
    // Make the API call with explicit headers
    const response = await api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Add progress tracking
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
      }
    });
    
    console.log('Upload response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    
    // Enhanced error logging
    if (error.response) {
      // Server responded with an error status
      console.error('Error response:', error.response.data);
      console.error('Status code:', error.response.status);
      throw new Error(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No response received from server');
      throw new Error('Server not responding. Please check if the server is running and accessible.');
    } else {
      // Error setting up the request
      console.error('Error setting up request:', error.message);
    }
    
    throw error;
  }
};

// Health check endpoint
export const checkServerHealth = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};