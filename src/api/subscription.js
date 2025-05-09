import api from "../Hooks/axios";

export const getAllPlan = async () => {
  try {
    const response = await api.get("/subscription");
    return response.data;
  } catch (error) {
    console.error("Error fetching Subscription Plan:", error);
    throw error;
  }
};
