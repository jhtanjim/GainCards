import { createContext, useContext, useState } from "react";

const ShopContext=createContext()

export const useShop =()=>useContext(ShopContext)

export const ShopProvider=({children})=>{
  const [cartItems,setCartItems]=useState([])
  console.log( {cartItems})



return <ShopContext.Provider

value={{cartItems,setCartItems}}

>{children}</ShopContext.Provider>
}