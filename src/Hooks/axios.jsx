import axios from "axios";

const api = axios.create({
  baseURL: "https://gain-card.onrender.com", // Update with your backend URL
  withCredentials: true, // This is the key for cookie-based auth!
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(originalRequest); // retry original request
      } catch (refreshErr) {
        console.error("Refresh failed:", refreshErr);
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
