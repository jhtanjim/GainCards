import api from "../Hooks/axios";

// Payment API function
export const placeOrder = async (orderData) => {
  try {
    const response = await api.post("/orders/create", orderData);
    return response.data;
  } catch (error) {
    console.error("Error Processing Payment", error);
    throw error;
  }
};

export const getMyOrders = async () => {
  try {
    const response = await api.get("/orders/my");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const getMySharedOrders = async (orderItemId) => {
  try {
    const response = await api.get(`/share/order-item/${orderItemId}/data`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// get all orders for admin pannel

export const getAllOrders = async () => {
  try {
    const response = await api.get("/orders/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders/all:", error);
    throw error;
  }
};

// Get a single user by ID
export const getOrdersDataById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching orders with id ${id}:`, error);
    throw error;
  }
};
