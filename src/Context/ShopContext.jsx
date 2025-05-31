"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext"; // Import your auth context

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { user } = useAuth(); // Get current user from auth context
  const [cartItems, setCartItems] = useState([]);
  const [clientSecret, setClientSecret] = useState("");

  // Generate user-specific cart key
  const getCartKey = (userId) => {
    return userId ? `cartItems_${userId}` : null;
  };

  // Load cart items for current user
  const loadUserCart = (userId) => {
    if (typeof window !== "undefined" && userId) {
      const cartKey = getCartKey(userId);
      const storedCart = localStorage.getItem(cartKey);
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  };

  // Save cart items for current user
  const saveUserCart = (userId, items) => {
    if (typeof window !== "undefined" && userId) {
      const cartKey = getCartKey(userId);
      localStorage.setItem(cartKey, JSON.stringify(items));
    }
  };

  // Clear cart items for current user
  const clearUserCart = (userId) => {
    if (typeof window !== "undefined" && userId) {
      const cartKey = getCartKey(userId);
      localStorage.removeItem(cartKey);
    }
  };

  // Load cart when user changes
  useEffect(() => {
    if (user?.id) {
      // User is logged in - load their specific cart
      const userCart = loadUserCart(user.id);
      setCartItems(userCart);
    } else {
      // User is not logged in - clear cart
      setCartItems([]);
    }
  }, [user?.id]);

  // Save cart whenever cartItems change (only if user is logged in)
  useEffect(() => {
    if (user?.id) {
      saveUserCart(user.id, cartItems);
    }
  }, [cartItems, user?.id]);

  // 🧹 Clear all items from cart
  const clearCart = () => {
    setCartItems([]);
    if (user?.id) {
      clearUserCart(user.id);
    }
  };

  // ❌ Remove single item by ID
  const removeItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // 🔄 Add item to cart (with duplicate check)
  const addItem = (item) => {
    setCartItems((prev) => {
      // Check if item already exists
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev; // Don't add duplicate
      }
      return [...prev, item];
    });
  };

  // 🔍 Check if item is in cart
  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  // 📊 Get cart count
  const getCartCount = () => {
    return cartItems.length;
  };

  // 💰 Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        setCartItems,
        clientSecret,
        setClientSecret,
        clearCart,
        removeItem,
        addItem,
        isInCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};