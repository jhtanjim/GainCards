import axios from "axios";

const api = axios.create({
  baseURL: 'https://gain-card.onrender.com', // Update with your backend URL
  withCredentials: true, // This is the key for cookie-based auth!
});

export default api;