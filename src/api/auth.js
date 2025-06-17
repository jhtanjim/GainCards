import api from "../Hooks/axios";

export const register = async (formData) => {
  const res = await api.post("/auth/register", formData);
  return res.data;
};

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  console.log(res);
  return res.data;
};
export const forgotPass = async (email) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};
export const resetPass = async (data) => {
  const res = await api.post("/auth/reset-password", data);
  console.log(res);
  return res.data;
};

export const refresh = async () => {
  const res = await api.post("/auth/refresh");
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

// Add this new API function
export const checkAuthStatus = async () => {
  const response = await api.get("/auth/status");

  if (!response.ok && response.status !== 200) {
    throw new Error("Not authenticated");
  }

  return response.data;
};
