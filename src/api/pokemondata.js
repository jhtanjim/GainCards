import api from "../Hooks/axios";

export const getAllPokemonData = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get a single product by ID
export const getPokemonDataById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

// Create a new product
export const createPokemon = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
// Donatee a new product
export const donatePokemon = async (productData) => {
  try {
    const response = await api.post("/products/donate", productData);
    return response.data;
  } catch (error) {
    console.error("Error donating product:", error);
    throw error;
  }
};

// Update a product
export const updatePokemon = async (id, productData) => {
  try {
    const response = await api.patch(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
};

// Delete a product
export const deletePokemon = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};
// Add a Pokémon to favorites
export const toggleFavoritePokemon = async (productId) => {
  try {
    const response = await api.post(`/users/favorite/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error adding favorite for product ${productId}:`, error);
    throw error;
  }
};

// Get all favorite Pokémon
export const getAllFavoritePokemon = async () => {
  try {
    const response = await api.get("/users/favorite/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    throw error;
  }
};

// Export all functions as default object
const productService = {
  getAllPokemonData,
  getPokemonDataById,
  createPokemon,
  updatePokemon,
  deletePokemon,
  toggleFavoritePokemon,
  getAllFavoritePokemon,
};

export default productService;
