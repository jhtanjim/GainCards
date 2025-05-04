import api from "../Hooks/axios";

export const getMyOrders = async () => {
    try {
      const response = await api.get("/orders/my");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };