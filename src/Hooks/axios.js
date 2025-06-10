import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 (Unauthorized) and 403 (Forbidden) for token refresh
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log("Attempting token refresh...");
        await api.post("/auth/refresh");
        console.log("Token refreshed successfully");
        return api(originalRequest); // Retry original request
      } catch (refreshErr) {
        console.error("Refresh failed:", refreshErr);

        // Clear any stored user data and redirect
        localStorage.clear(); // Clear any local storage
        sessionStorage.clear(); // Clear session storage

        // Use consistent route name (match your routing setup)
        window.location.href = "/signIn"; // Changed to match your Header.jsx
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default api;
