import { createContext, useContext, useState, useEffect } from "react";

const FavouriteContext = createContext();

export const useFavourite = () => useContext(FavouriteContext);

export const FavouriteProvider = ({ children }) => {
  const [favouriteItems, setfavouriteItems] = useState(() => {
    const storedFavouriteItems = localStorage.getItem("favouriteItems");
    return storedFavouriteItems ? JSON.parse(storedFavouriteItems) : [];
  });

  const [clientSecret, setClientSecret] = useState("");

  // Update localStorage whenever favouriteItems change
  useEffect(() => {
    localStorage.setItem("favouriteItems", JSON.stringify(favouriteItems));
  }, [favouriteItems]);

  return (
    <FavouriteContext.Provider
      value={{ favouriteItems, setfavouriteItems, clientSecret, setClientSecret }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
