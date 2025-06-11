import api from "../Hooks/axios";

export const myProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data;
};

export const createAddress = async (addressFormData) => {
  const response = await api.post("/users/address", addressFormData);
  return response.data;
};
export const updateAddress = async (addressFormData) => {
  const response = await api.patch("/users/address", addressFormData);
  return response.data;
};
