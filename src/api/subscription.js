import api from "../Hooks/axios";

// Admin routes for subscription plan management
export const getAllPlan = async () => {
  const response = await api.get("/subscriptions/admin/plans");
  return response.data;
};

export const getAllActivePlan = async () => {
  const response = await api.get("/subscriptions/plans");
  return response.data;
};

// Create a new subscription plan (admin only)
export const createPlan = async (plan) => {
  const response = await api.post("/subscriptions/admin/plans", plan);
  return response.data;
};

// Update a subscription plan (admin only)
export const updatePlan = async (id, updateData) => {
  const response = await api.put(
    `/subscriptions/admin/plans/${id}`,
    updateData
  );
  return response.data;
};

// Delete a subscription plan (admin only)
export const deletePlan = async (id) => {
  const response = await api.delete(`/subscriptions/admin/plans/${id}`);
  return response.data;
};

// Admin vendor management routes
export const adminVendorApi = {
  // GET /subscriptions/admin/vendors/:vendorId
  getVendorSubscription: async (vendorId) => {
    try {
      const response = await api.get(
        `/subscriptions/admin/vendors/${vendorId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor subscription:", error);
      throw error;
    }
  },

  // GET /subscriptions/admin/vendors/:vendorId/history
  getVendorSubscriptionHistory: async (vendorId, page = 1, limit = 10) => {
    try {
      const response = await api.get(
        `/subscriptions/admin/vendors/${vendorId}/history`,
        {
          params: { page, limit },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor subscription history:", error);
      throw error;
    }
  },

  // POST /subscriptions/admin/vendors/:vendorId/expire
  expireVendorSubscription: async (vendorId) => {
    try {
      const response = await api.post(
        `/subscriptions/admin/vendors/${vendorId}/expire`
      );
      return response.data;
    } catch (error) {
      console.error("Error expiring vendor subscription:", error);
      throw error;
    }
  },

  // GET /subscriptions/admin/expired
  getExpiredSubscriptions: async (page = 1, limit = 10) => {
    try {
      const response = await api.get("/subscriptions/admin/expired", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching expired subscriptions:", error);
      throw error;
    }
  },

  // GET /subscriptions/admin/stats
  getSubscriptionStats: async () => {
    try {
      const response = await api.get("/subscriptions/admin/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription stats:", error);
      throw error;
    }
  },
};

// Admin vendor routes (from vendors controller)
export const adminVendorManagement = {
  // GET /vendors/admin/all
  getAllVendors: async (page = 1, limit = 10) => {
    try {
      const response = await api.get("/vendors/admin/all", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all vendors:", error);
      throw error;
    }
  },

  // GET /vendors/admin/:vendorId
  getVendorById: async (vendorId) => {
    try {
      const response = await api.get(`/vendors/admin/${vendorId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor by ID:", error);
      throw error;
    }
  },

  // GET /vendors/admin/:vendorId/dashboard
  getVendorDashboard: async (vendorId) => {
    try {
      const response = await api.get(`/vendors/admin/${vendorId}/dashboard`);
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor dashboard:", error);
      throw error;
    }
  },

  // GET /vendors/admin/:vendorId/products
  getVendorProducts: async (vendorId, page = 1, limit = 10, status = null) => {
    try {
      const params = { page, limit };
      if (status) params.status = status;

      const response = await api.get(`/vendors/admin/${vendorId}/products`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor products:", error);
      throw error;
    }
  },

  // GET /vendors/admin/:vendorId/orders
  getVendorOrders: async (vendorId, page = 1, limit = 10, status = null) => {
    try {
      const params = { page, limit };
      if (status) params.status = status;

      const response = await api.get(`/vendors/admin/${vendorId}/orders`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor orders:", error);
      throw error;
    }
  },

  // GET /vendors/admin/:vendorId/payouts
  getVendorPayouts: async (vendorId, page = 1, limit = 10) => {
    try {
      const response = await api.get(`/vendors/admin/${vendorId}/payouts`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor payouts:", error);
      throw error;
    }
  },

  // GET /vendors/admin/:vendorId/recommendations
  getVendorRecommendations: async (vendorId) => {
    try {
      const response = await api.get(
        `/vendors/admin/${vendorId}/recommendations`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor recommendations:", error);
      throw error;
    }
  },
};

// Vendor self-service routes (from vendors controller)
export const vendorSelfService = {
  // GET /vendors/profile
  getMyProfile: async () => {
    try {
      const response = await api.get("/vendors/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor profile:", error);
      throw error;
    }
  },

  // GET /vendors/dashboard
  getDashboard: async () => {
    try {
      const response = await api.get("/vendors/dashboard");
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor dashboard:", error);
      throw error;
    }
  },

  // GET /vendors/recommendations
  getRecommendations: async () => {
    try {
      const response = await api.get("/vendors/recommendations");
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor recommendations:", error);
      throw error;
    }
  },

  // GET /vendors/products
  getMyProducts: async (page = 1, limit = 10, status = null) => {
    try {
      const params = { page, limit };
      if (status) params.status = status;

      const response = await api.get("/vendors/products", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor products:", error);
      throw error;
    }
  },

  // GET /vendors/orders
  getMyOrders: async (page = 1, limit = 10, status = null) => {
    try {
      const params = { page, limit };
      if (status) params.status = status;

      const response = await api.get("/vendors/orders", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor orders:", error);
      throw error;
    }
  },

  // GET /vendors/payouts
  getMyPayouts: async (page = 1, limit = 10) => {
    try {
      const response = await api.get("/vendors/payouts", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching vendor payouts:", error);
      throw error;
    }
  },
};
