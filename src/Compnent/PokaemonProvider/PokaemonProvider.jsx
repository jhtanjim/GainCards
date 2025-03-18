import React, { createContext, useState, useContext } from 'react';

// Create context
const PokaemonContext = createContext();

// Provider component
export const PokaemonProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Add to cart
  const addToCart = (pokaemon) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.id === pokaemon.id);
      
      if (existingItem) {
        // If exists, increase quantity
        return prevItems.map(item => 
          item.id === pokaemon.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // If new item, add to cart with quantity 1
        return [...prevItems, { ...pokaemon, quantity: 1 }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (pokaemonId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== pokaemonId));
  };

  // Update quantity
  const updateQuantity = (pokaemonId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(pokaemonId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === pokaemonId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  // Toggle favorite
  const toggleFavorite = (pokaemon) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === pokaemon.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== pokaemon.id);
      } else {
        return [...prevFavorites, pokaemon];
      }
    });
  };

  // Check if item is in favorites
  const isFavorite = (pokaemonId) => {
    return favorites.some(fav => fav.id === pokaemonId);
  };

  // Calculate total price
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <PokaemonContext.Provider value={{
      cartItems,
      favorites,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleFavorite,
      isFavorite,
      cartTotal
    }}>
      {children}
    </PokaemonContext.Provider>
  );
};

// Custom hook to use the context
export const usePokaemon = () => useContext(PokaemonContext);