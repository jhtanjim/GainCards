import api from "../Hooks/axios";

// Add a Pokémon to favorites
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
