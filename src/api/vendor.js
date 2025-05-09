import api from "../Hooks/axios";

// Vendor API
export const registerVendor = async (vendorData) => {
  console.log(vendorData);
  const response = await api.post("/vendor/register", vendorData);
  return response.data;
};
