import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, Gift, Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllFavoritePokemon,
  toggleFavoritePokemon,
} from "../../../api/pokemondata";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../../Context/AuthContext";
import { useShop } from "../../../Context/ShopContext";

const PokemonCard = ({ pokemon }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { addItem, isInCart } = useShop();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
    isDonation,
    grade,
    population,
    certificationNumber,
  } = pokemon;

  // Fetch favorites
  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites"],
    queryFn: getAllFavoritePokemon,
    enabled: !!isAuthenticated,
  });

  // Check if current pokemon is in favorites
  const isFavorite = favorites.some((fav) => fav.id === id);
  const [optimisticFavorite, setOptimisticFavorite] = useState(isFavorite);

  // Update optimistic state when favorites data changes
  useEffect(() => {
    setOptimisticFavorite(isFavorite);
  }, [isFavorite]);

  const getBackgroundClass = () => {
    if (isDonation) return "bg-gradient-to-br from-pink-100 to-purple-100";
    if (!labelType) return "bg-gray-50";

    switch (labelType?.toLowerCase()) {
      case "premium":
        return "bg-gradient-to-br from-blue-100 to-blue-200";
      case "rare":
        return "bg-gradient-to-br from-purple-100 to-purple-200";
      case "limited":
        return "bg-gradient-to-br from-yellow-100 to-orange-100";
      default:
        return "bg-gray-100";
    }
  };

  const backgroundClass = getBackgroundClass();
  const queryClient = useQueryClient();

  const toggleFavoriteMutation = useMutation({
    mutationFn: () => toggleFavoritePokemon(id),
    onMutate: async () => {
      // Optimistically update UI
      setOptimisticFavorite(!optimisticFavorite);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);

      // Show appropriate message based on the action
      if (optimisticFavorite) {
        Swal.fire({
          toast: true,
          position: "bottom-left",
          icon: "success",
          title: "Added to Favorites!",
          text: `${title} has been added to your favorites`,
          timer: 2000,
          showConfirmButton: false,

          timerProgressBar: true,
          background: "#a855f7",
          color: "#f8fafc",
          iconColor: "#f8fafc",
        });
      } else {
        Swal.fire({
          toast: true,
          position: "bottom-left",
          icon: "success",
          title: "Removed from Favorites",
          text: `${title} has been removed from your favorites`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#a855f7",
          color: "#f8fafc",
          iconColor: "#f8fafc",
        });
      }
    },
    onError: () => {
      // Revert optimistic update on error
      setOptimisticFavorite(!optimisticFavorite);
      Swal.fire({
        toast: true,
        position: "bottom-left",
        icon: "error",
        title: "Error",
        text: `Could not ${
          optimisticFavorite ? "remove from" : "add to"
        } favorites`,
        timer: 3000,
        timerProgressBar: true,
        background: "#fef2f2",
        color: "#dc2626",
        iconColor: "#ef4444",
      });
    },
  });

  const handleToggleFavorite = () => {
    // Check if user is logged in
    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to add items to your favorites",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#3b82f6",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin?redirect=/pokemon", { replace: true });
        }
      });
      return;
    }

    toggleFavoriteMutation.mutate();
  };

  const itemInCart = isInCart(pokemon.id);

  const handleAddToCart = () => {
    if (isDonation) {
      Swal.fire({
        icon: "info",
        title: "Donation Item",
        text: "This is a donation item and cannot be added to cart",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    if (!itemInCart) {
      addItem(pokemon);
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${title} has been added to your cart`,
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Already in Cart",
        text: `${title} is already in your cart`,
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  const handleDonationClick = () => {
    if (isDonation) {
      sessionStorage.setItem("donationCard", JSON.stringify(pokemon));
      navigate("/donateCardReceiver");
    }
  };

  const handleViewDetails = () => {
    navigate(`/pokemon/${id}`, { state: { pokemon } });
  };

  const formattedPrice = price ? price.toLocaleString() : "N/A";
  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString()
    : "N/A";

  return (
    <div className="w-full h-full">
      <div
        className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${backgroundClass} h-full flex flex-col relative`}
      >
        {isDonation && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center shadow-lg">
              <Gift className="w-3 h-3 mr-1" />
              Donation
            </div>
          </div>
        )}

        {labelType && !isDonation && (
          <div className="absolute top-3 right-3 z-10">
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium shadow-lg ${
                labelType?.toLowerCase() === "premium"
                  ? "bg-blue-500 text-white"
                  : labelType?.toLowerCase() === "rare"
                  ? "bg-purple-500 text-white"
                  : labelType?.toLowerCase() === "limited"
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-500 text-white"
              }`}
            >
              {labelType}
            </div>
          </div>
        )}

        <div
          className="relative p-4 flex justify-center"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          <div
            className="relative h-60 w-full max-w-[240px] transition-all duration-500"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute w-full h-full backface-hidden transition-all duration-500"
              style={{
                backfaceVisibility: "hidden",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <img
                src={frontImageUrl || "/placeholder.svg?height=240&width=240"}
                alt={`${title} front`}
                className="object-contain h-full w-full rounded-lg shadow-sm"
              />
            </div>

            <div
              className="absolute w-full h-full backface-hidden transition-all duration-500"
              style={{
                backfaceVisibility: "hidden",
                transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
              }}
            >
              <img
                src={backImageUrl || "/placeholder.svg?height=240&width=240"}
                alt={`${title} back`}
                className="object-contain h-full w-full rounded-lg shadow-sm"
              />
            </div>
          </div>

          <div className="absolute bottom-0 text-xs text-center w-full text-gray-500 font-medium">
            {isFlipped ? "Back of card" : "Hover to flip"}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-t-2xl relative -mt-4 flex-grow flex flex-col border border-white/20">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-gray-800 capitalize truncate">
              {title}
            </h2>
            <button
              onClick={handleToggleFavorite}
              className="transition-transform hover:scale-110"
              disabled={toggleFavoriteMutation.isLoading}
              aria-label={
                optimisticFavorite
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
              title={
                !isAuthenticated
                  ? "Login to add favorites"
                  : optimisticFavorite
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              <Heart
                className={`w-6 h-6 transition-colors ${
                  optimisticFavorite && isAuthenticated
                    ? "text-red-500 fill-red-500"
                    : "text-gray-400 hover:text-red-300"
                } ${toggleFavoriteMutation.isLoading ? "animate-pulse" : ""}`}
              />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-3 truncate">
            {player} • {varietyPedigree}
          </p>

          {(grade || population) && (
            <div className="flex gap-2 mb-3">
              {grade && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Grade: {grade}
                </span>
              )}
              {population && (
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                  Pop: {population}
                </span>
              )}
            </div>
          )}

          <p className="text-sm text-gray-700 mb-4 line-clamp-2">
            {description}
          </p>

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
            {certificationNumber && (
              <div className="col-span-2">
                <span className="text-gray-600">Cert #:</span>
                <span className="font-medium ml-1">{certificationNumber}</span>
              </div>
            )}
          </div>

          <div className="mt-auto">
            <div className="flex justify-between items-center mb-3">
              <div
                className={`font-bold text-xl ${
                  isDonation ? "text-pink-600" : "text-green-700"
                }`}
              >
                {isDonation ? "Donation" : `$${formattedPrice}`}
              </div>
              <div className="text-xs text-gray-500">
                Updated: {formattedDate}
              </div>{" "}
            </div>

            <div className="space-y-2">
              <button
                onClick={isDonation ? handleDonationClick : handleAddToCart}
                disabled={!isDonation && itemInCart}
                className={`w-full py-2 font-medium rounded-md transition-all flex items-center justify-center ${
                  isDonation
                    ? "bg-pink-500 text-white hover:bg-pink-600 hover:shadow-md"
                    : itemInCart
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                }`}
              >
                {isDonation ? (
                  <>
                    <Gift className="w-4 h-4 mr-2" />
                    Receive Donation
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {itemInCart ? "In Cart" : "Add to Cart"}
                  </>
                )}
              </button>

              <button
                onClick={handleViewDetails}
                className="w-full py-2 bg-white text-blue-600 border border-blue-600 font-medium rounded-md hover:bg-blue-50 hover:shadow-md transition-all flex items-center justify-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                VIEW DETAILS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
