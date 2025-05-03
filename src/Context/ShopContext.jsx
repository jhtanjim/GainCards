import { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const [clientSecret, setClientSecret] = useState("");

  return (
    <ShopContext.Provider
      value={{ cartItems, setCartItems, clientSecret, setClientSecret }}
    >
      {children}
    </ShopContext.Provider>
  );
};
