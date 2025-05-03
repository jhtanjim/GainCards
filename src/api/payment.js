import api from "../Hooks/axios";

// Add a Pokémon to favorites
// Payment API function
export const addPayment = async (orderData) => {
  try {
    const response = await api.post('/orders/create', orderData);
    return response.data;
  } catch (error) {
    console.error('Error Processing Payment', error);
    throw error;
  }
};
