import api from "../Hooks/axios";

export const myProfile = async () => {
    const res = await api.get('/users/profile');
    return res.data;
  };