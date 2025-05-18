"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  const [clientSecret, setClientSecret] = useState("");

  // 🧹 Clear all items from cart
  const clearCart = () => {
    setCartItems([]);
  };

  // ❌ Remove single item by ID
  const removeItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // 🧠 Sync with localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        setCartItems,
        clientSecret,
        setClientSecret,
        clearCart,
        removeItem,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
