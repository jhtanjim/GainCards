"use client"

import React, { createContext, useContext, useState } from 'react';

// Create context with a default value to avoid the undefined error
const ShopContext = createContext({
  cartItems: [],
  favorites: [],
  addToCart: () => {},
  toggleFavorite: () => {},
  cartCount: 0,
  favoritesCount: 0
});

export function ShopProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Add to cart
  const addToCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // Toggle favorite
  const toggleFavorite = (item) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);
    
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== item.id));
    } else {
      setFavorites(prev => [...prev, item]);
    }
  };

  // Calculate counts
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favorites.length;

  const value = {
    cartItems,
    favorites,
    addToCart,
    toggleFavorite,
    cartCount,
    favoritesCount
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  return context;
}
