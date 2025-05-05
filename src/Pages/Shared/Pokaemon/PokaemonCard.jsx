import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useShop } from "../../../Context/ShopContext";
import {
  addFavoritePokemon,
  removeFavoritePokemon,
} from "../../../api/pokemondata";

const PokemonCard = ({ pokemon, isFavorite }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { cartItems, setCartItems } = useShop();

  // Destructure all pokemon card properties
  const {
    id,
    title,
    description,
    price,
    frontImageUrl,
    backImageUrl,
    labelType,
    year,
    brand,
    sport,
    cardNumber,
    player,
    varietyPedigree,
    updatedAt,
  } = pokemon;

  // Set background color based on card label type
  const getBackgroundClass = () => {
    if (!labelType) return "bg-gray-50";

    switch (labelType?.toLowerCase()) {
      case "premium":
        return "bg-blue-100";
      case "rare":
        return "bg-purple-100";
      case "limited":
        return "bg-yellow-100";
      default:
        return "bg-gray-100";
    }
  };

  const backgroundClass = getBackgroundClass();

  const queryClient = useQueryClient();
  const [favorite, setFavorite] = useState(isFavorite); // local state to update UI immediately

  const addFavoriteMutation = useMutation({
    mutationFn: () => addFavoritePokemon(id),
    onSuccess: () => {
      setFavorite(true);
      queryClient.invalidateQueries(["favorites"]); // Optional: refetch favorites list
    },
    onError: () => {
      Swal.fire("Error", "Could not add to favorites", "error");
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: () => removeFavoritePokemon(id),
    onSuccess: () => {
      setFavorite(false);
      queryClient.invalidateQueries(["favorites"]);
    },
    onError: () => {
      Swal.fire("Error", "Could not remove from favorites", "error");
    },
  });

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavoriteMutation.mutate();
    } else {
      addFavoriteMutation.mutate();
    }
  };

  const isInCart = cartItems.some((item) => item.id === pokemon.id);

  const handleAddToCart = () => {
    // Check if item is already in cart

    if (!isInCart) {
      setCartItems([...cartItems, pokemon]);
      Swal.fire({
        icon: "success",
        title: "Added to cart!",
        text: `${title} has been added to your cart`,
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Already in cart",
        text: `${title} is already in your cart`,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // Format price with commas for thousands
  const formattedPrice = price ? price.toLocaleString() : "N/A";

  // Format update date
  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString()
    : "N/A";

  return (
    <div className="w-full h-full">
      <div
        className={`rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 ${backgroundClass} h-full flex flex-col`}
      >
        {/* Card image section with flip effect */}
        <div
          className="relative p-4 flex justify-center"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          {/* Card image container with 3D flip effect */}
          <div
            className="relative h-60 w-full max-w-[240px] transition-all duration-500"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front image */}
            <div
              className="absolute w-full h-full backface-hidden transition-all duration-500"
              style={{
                backfaceVisibility: "hidden",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <img
                src={frontImageUrl || "/api/placeholder/240/240"}
                alt={`${title} front`}
                className="object-contain h-full w-full"
              />
            </div>

            {/* Back image */}
            <div
              className="absolute w-full h-full backface-hidden transition-all duration-500"
              style={{
                backfaceVisibility: "hidden",
                transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
              }}
            >
              <img
                src={backImageUrl || "/api/placeholder/240/240"}
                alt={`${title} back`}
                className="object-contain h-full w-full"
              />
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute opacity-10 right-0 bottom-0">
            <svg viewBox="0 0 20 20" className="h-32 w-32 fill-current">
              <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1 4a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1z" />
            </svg>
          </div>

          {/* Flip indicator text */}
          <div className="absolute bottom-0 text-xs text-center w-full text-gray-500">
            {isFlipped ? "Back of card" : "Hover to see back"}
          </div>
        </div>

        {/* Card Info Section */}
        <div className="bg-white/50 p-4 rounded-t-2xl relative -mt-4 flex-grow flex flex-col">
          {/* Title and Grade Section */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-gray-800 capitalize truncate">
              {title}
            </h2>
            <button
              onClick={handleToggleFavorite}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className={`w-6 h-6 ${
                  favorite ? "text-red-500 fill-red-500" : "text-gray-400"
                }`}
              />
            </button>
          </div>

          {/* Player & Variety Info */}
          <p className="text-sm text-gray-600 mb-3 truncate">
            {player} • {varietyPedigree}
          </p>

          {/* Card Description */}
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Card Details Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div>
              <span className="text-gray-600">Card #:</span>
              <span className="font-medium ml-1">{cardNumber}</span>
            </div>
            <div>
              <span className="text-gray-600">Year:</span>
              <span className="font-medium ml-1">{year}</span>
            </div>
            <div>
              <span className="text-gray-600">Brand:</span>
              <span className="font-medium ml-1">{brand}</span>
            </div>
            <div>
              <span className="text-gray-600">Sport:</span>
              <span className="font-medium ml-1">{sport}</span>
            </div>
          </div>

          {/* Price Section */}
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-xl text-green-700">
                ${formattedPrice}
              </div>
              <div className="text-xs text-gray-500">
                Updated: {formattedDate}
              </div>
            </div>

            {/* Add to Cart Button */}

            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className="mt-2 w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-gray-600 "
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </button>

            {/* View Details Button */}
            <Link to={`/pokemon/${id}`} state={{ pokemon }} className="block">
              <button className="mt-2 w-full py-2 bg-white text-blue-600 border border-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors">
                VIEW DETAILS
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
