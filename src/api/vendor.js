import api from "../Hooks/axios";

// Vendor API
export const registerVendor = async (vendorData) => {
  console.log(vendorData);
  const response = await api.post("/vendor/register", vendorData);
  return response.data;
};

// Subscription API functions using your actual endpoints
export const subscriptionApi = {
  // GET /vendor/subscription
  getSubscription: async () => {
    try {
      const response = await api.get("/vendor/subscription");
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription:", error);
      throw error;
    }
  },

  // GET /vendor/subscription/analytics
  getAnalytics: async () => {
    try {
      const response = await api.get("/vendor/subscription/analytics");
      return response.data;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      throw error;
    }
  },

  // GET /subscription/active
  getAvailablePlans: async () => {
    try {
      const response = await api.get("/subscription/active");
      return response.data;
    } catch (error) {
      console.error("Error fetching available plans:", error);
      throw error;
    }
  },

  // PATCH /vendor/subscription/upgrade
  upgradeSubscription: async (planId) => {
    try {
      const response = await api.patch("/vendor/subscription/upgrade", {
        newSubscriptionPlanId:planId,
      });
      return response.data;
    } catch (error) {
      console.error("Error upgrading subscription:", error);
      throw error;
    }
  },

  // PATCH /vendor/subscription/renew
  renewSubscription: async () => {
    try {
      const response = await api.patch("/vendor/subscription/renew");
      return response.data;
    } catch (error) {
      console.error("Error renewing subscription:", error);
      throw error;
    }
  },

  // DELETE /vendor/subscription
  cancelSubscription: async () => {
    try {
      const response = await api.delete("/vendor/subscription");
      return response.data;
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      throw error;
    }
  },
};

export default subscriptionApi;
