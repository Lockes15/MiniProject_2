import axios from "axios";

const API_URL = "http://localhost:5000"; // Adjust the URL if your server runs on a different port

// Fetch weather data from the backend
export const fetchWeather = async () => {
  try {
    const response = await axios.get(`${API_URL}/weather`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// Add new weather data to the backend
export const addWeather = async (weatherData) => {
  try {
    const response = await axios.post(`${API_URL}/weather`, weatherData); // POST req to /weather endpoint - response then stored in the response variable 
    return response.data;
  } catch (error) {
    console.error("Error adding weather data:", error);
    throw error;
  }
};

// Update existing weather data in the backend
export const updateWeather = async (id, weatherData) => {
  try {
    const response = await axios.put(`${API_URL}/weather/${id}`, weatherData);
    return response.data;
  } catch (error) {
    console.error("Error updating weather data:", error);
    throw error;
  }
};

// Delete weather data from the backend
export const deleteWeather = async (id) => {
  try {
    await axios.delete(`${API_URL}/weather/${id}`);
  } catch (error) {
    console.error("Error deleting weather data:", error);
    throw error;
  }
};