import api from "../Hooks/axios";

// Vendor API
export const registerVendor = async (vendorData) => {
  const response = await api.post("/vendors/register", vendorData);
  return response.data;
};

// Updated Subscription API functions to match your new endpoints
export const subscriptionApi = {
  // GET /subscriptions/my-subscription (vendor route)
  getSubscription: async () => {
    try {
      const response = await api.get("/subscriptions/my-subscription");
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription:", error);
      throw error;
    }
  },

  // GET /subscriptions/usage (vendor route)
  getAnalytics: async () => {
    try {
      const response = await api.get("/subscriptions/usage");
      return response.data;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      throw error;
    }
  },

  // GET /subscriptions/plans (public route)
  getAvailablePlans: async () => {
    try {
      const response = await api.get("/subscriptions/plans");
      return response.data;
    } catch (error) {
      console.error("Error fetching available plans:", error);
      throw error;
    }
  },

  // POST /subscriptions/upgrade (vendor route)
  upgradeSubscription: async (planId) => {
    try {
      const response = await api.post("/subscriptions/upgrade", {
        newPlanId: planId,
      });
      return response.data;
    } catch (error) {
      console.error("Error upgrading subscription:", error);
      throw error;
    }
  },

  // POST /subscriptions/renew (vendor route)
  renewSubscription: async (autoRenew = false) => {
    try {
      const response = await api.post("/subscriptions/renew", {
        autoRenew: autoRenew,
      });
      return response.data;
    } catch (error) {
      console.error("Error renewing subscription:", error);
      throw error;
    }
  },

  // POST /subscriptions/cancel (vendor route)
  cancelSubscription: async (immediately = false) => {
    try {
      const response = await api.post("/subscriptions/cancel", {
        immediately: immediately,
      });
      return response.data;
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      throw error;
    }
  },

  // GET /subscriptions/my-subscription/history (vendor route)
  getSubscriptionHistory: async (page = 1, limit = 10) => {
    try {
      const response = await api.get("/subscriptions/my-subscription/history", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription history:", error);
      throw error;
    }
  },

  // PUT /subscriptions/auto-renew (vendor route)
  updateAutoRenew: async (autoRenew) => {
    try {
      const response = await api.put("/subscriptions/auto-renew", {
        autoRenew: autoRenew,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating auto-renew:", error);
      throw error;
    }
  },

  // GET /subscriptions/can-list-card (vendor route)
  canListCard: async () => {
    try {
      const response = await api.get("/subscriptions/can-list-card");
      return response.data;
    } catch (error) {
      console.error("Error checking card listing permission:", error);
      throw error;
    }
  },
};

export default subscriptionApi;
