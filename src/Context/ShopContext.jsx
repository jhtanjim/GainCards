import { createContext, useContext, useState, useEffect } from "react";
 
 const ShopContext = createContext();
 
 export const useShop = () => useContext(ShopContext);
 
 export const ShopProvider = ({ children }) => {
   const [cartItems, setCartItems] = useState(() => {
     const storedCart = localStorage.getItem("cartItems");
     return storedCart ? JSON.parse(storedCart) : [];
   });
 
   const [clientSecret, setClientSecret] = useState("");
 
   // Update localStorage whenever cartItems change
   useEffect(() => {
     localStorage.setItem("cartItems", JSON.stringify(cartItems));
   }, [cartItems]);
 
 
   return (
     <ShopContext.Provider
       value={{ cartItems, setCartItems, clientSecret, setClientSecret }}
     >
       {children}
     </ShopContext.Provider>
   );

};
 
 export default ShopContext