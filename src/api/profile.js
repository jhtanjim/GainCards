import api from "../Hooks/axios";

// Get user profile
export const myProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data;
};

// Update user profile (with profile picture upload support)
export const updateProfile = async (profileData) => {
  const response = await api.patch("/users/profile", profileData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Create address
export const createAddress = async (addressFormData) => {
  const response = await api.post("/users/address", addressFormData);
  return response.data;
};

// Update address
export const updateAddress = async (addressFormData) => {
  const response = await api.patch("/users/address", addressFormData);
  return response.data;
};

// Delete address
export const deleteAddress = async () => {
  const response = await api.delete("/users/address");
  return response.data;
};