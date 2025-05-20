import { data } from "autoprefixer";
import api from "../Hooks/axios";

export const myProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data;
};

export const createAddress = async (addressFormData) => {
  const response = await api.post("/users/address/create", addressFormData);
  return response.data;
};
