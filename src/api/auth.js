import api from "../Hooks/axios";


export const register = async (formData) => {
  const res = await api.post('/auth/register', formData);
  return res.data;
};

export const login = async (data) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export const refresh = async () => {
  const res = await api.post('/auth/refresh');
  return res.data;
};

export const logout = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};
