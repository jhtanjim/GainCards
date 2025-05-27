import api from "../Hooks/axios";

// Get all subscription plans
export const getAllPlan = async () => {
  const response = await api.get("/subscription");
  return response.data;
};

// Create a new subscription plan
export const createPlan = async (plan) => {
  const response = await api.post("/subscription", plan);
  return response.data;
};

// Update a subscription plan
export const updatePlan = async (id, updates) => {
  console.log(id)
  const response = await api.patch(`/subscription/${id}`, updates);
  return response.data;
};

// Delete a subscription plan
export const deletePlan = async (id) => {
  const response = await api.delete(`/subscription/${id}`);
  return response.data;
};
