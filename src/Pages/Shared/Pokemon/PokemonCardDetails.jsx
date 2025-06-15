"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock,
  Heart,
  Shield,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getAllFavoritePokemon,
  getAllPokemonData,
  toggleFavoritePokemon,
} from "../../../api/pokemondata";
import { useAuth } from "../../../Context/AuthContext";
import { useShop } from "../../../Context/ShopContext";
import PokemonCard from "./PokemonCard";

const PokemonCardDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState("front");
  const { cartItems, setCartItems } = useShop();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const {
    title,
    description,
    price,
    frontImageUrl,
    backImageUrl,
    certificationNumber,
    labelType,
    hasReverseBarcode,
    year,
    brand,
    sport,
    cardNumber,
    isDonation,
    player,
    varietyPedigree,
    grade,
    population,
    vendorId,
    createdAt,
    updatedAt,
  } = state?.pokemon || {};

  // Check if item is already in cart
  const isInCart = cartItems.some((item) => item.id === state?.pokemon?.id);

  // Fetch favorites
  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites"],
    queryFn: getAllFavoritePokemon,
    enabled: !!isAuthenticated,
  });

  // Fetch all pokemon for similar cards
  const { data: allPokemon = [] } = useQuery({
    queryKey: ["allPokemon"],
    queryFn: getAllPokemonData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Check if current pokemon is in favorites
  const isFavorite = favorites.some((fav) => fav.id === id);
  const [optimisticFavorite, setOptimisticFavorite] = useState(isFavorite);

  // Update optimistic state when favorites data changes
  useEffect(() => {
    setOptimisticFavorite(isFavorite);
  }, [isFavorite]);

  const toggleFavoriteMutation = useMutation({
    mutationFn: () => toggleFavoritePokemon(id),
    onMutate: async () => {
      // Optimistically update UI
      setOptimisticFavorite(!optimisticFavorite);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
      
      // Show appropriate message based on the action
      const message = optimisticFavorite 
        ? "Added to Favorites!" 
        : "Removed from Favorites";
      const text = optimisticFavorite 
        ? `${title} has been added to your favorites`
        : `${title} has been removed from your favorites`;

      Swal.fire({
        toast: true,
        position: "bottom-left",
        icon: "success",
        title: message,
        text: text,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        background: "#a855f7",
        color: "#f8fafc",
        iconColor: "#f8fafc",
      });
    },
    onError: () => {
      // Revert optimistic update on error
      setOptimisticFavorite(!optimisticFavorite);
      Swal.fire({
        toast: true,
        position: "bottom-left",
        icon: "error",
        title: "Error",
        text: `Could not ${optimisticFavorite ? "remove from" : "add to"} favorites`,
        timer: 3000,
        timerProgressBar: true,
        background: "#fef2f2",
        color: "#dc2626",
        iconColor: "#ef4444",
      });
    },
  });

  const defaultFrontImage = "/placeholder.svg?height=400&width=560";
  const defaultBackImage = "/placeholder.svg?height=400&width=560";

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDonationClick = () => {
    if (isDonation) {
      sessionStorage.setItem("donationCard", JSON.stringify(state.pokemon));
      navigate("/donateCardReceiver");
    }
  };

  const handleAddToCart = () => {
    // Check if user is logged in
    if (!isAuthenticated) {
      Swal.fire({ 
        icon: "warning",
        title: "Login Required",
        text: "Please log in to add items to your cart",
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

    // Check if item is already in cart
    if (!isInCart) {
      setCartItems([...cartItems, state.pokemon]);
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${title} has been added to your cart`,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleAddToFavorites = () => {
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

  // Get similar cards from actual API data
  const getSimilarCards = () => {
    if (!allPokemon.length || !state?.pokemon) {
      return [];
    }

    const currentCard = state.pokemon;
    
    // Filter similar cards based on multiple criteria
    let similarCards = allPokemon.filter(card => {
      // Exclude the current card
      if (card.id === currentCard.id) return false;
      
      // For donation cards, show other donation cards
      if (currentCard.isDonation) {
        return card.isDonation;
      }
      
      // For non-donation cards, match by labelType first, then other criteria
      if (currentCard.labelType && card.labelType === currentCard.labelType) {
        return true;
      }
      
      // If no labelType match, try other similarities
      return (
        card.brand === currentCard.brand ||
        card.sport === currentCard.sport ||
        card.year === currentCard.year ||
        card.player === currentCard.player
      );
    });

    // Sort by relevance (prioritize labelType matches for non-donation cards)
    similarCards.sort((a, b) => {
      if (currentCard.isDonation) {
        // For donations, sort by creation date (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      
      // For regular cards, prioritize labelType matches
      const aLabelMatch = a.labelType === currentCard.labelType ? 1 : 0;
      const bLabelMatch = b.labelType === currentCard.labelType ? 1 : 0;
      
      if (aLabelMatch !== bLabelMatch) {
        return bLabelMatch - aLabelMatch;
      }
      
      // Then sort by brand match
      const aBrandMatch = a.brand === currentCard.brand ? 1 : 0;
      const bBrandMatch = b.brand === currentCard.brand ? 1 : 0;
      
      return bBrandMatch - aBrandMatch;
    });

    // Return up to 4 similar cards
    return similarCards.slice(0, 4);
  };

  const similarCards = getSimilarCards();

  // Get the section title based on what we're showing
  const getSectionTitle = () => {
    if (!state?.pokemon) return "Similar Cards";
    
    const currentCard = state.pokemon;
    
    if (currentCard.isDonation) {
      return "Other Donation Cards You May Like";
    }
    
    if (currentCard.labelType) {
      return `Similar ${currentCard.labelType} Cards You May Like`;
    }
    
    if (currentCard.brand) {
      return `More ${currentCard.brand} Cards You May Like`;
    }
    
    return "Similar Cards You May Like";
  };

  if (!state || !state.pokemon) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            No Pokémon Data Found
          </h2>
          <p className="text-gray-600 mb-4">
            The card you're looking for is not available.
          </p>
          <button
            onClick={() => navigate("/pokemon")}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center mx-auto"
          >
            <ArrowLeft size={18} className="mr-2" />
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm py-3">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-500 flex items-center">
            <button
              onClick={() => navigate("/")}
              className="hover:text-blue-500"
            >
              Home
            </button>
            <ChevronRight size={16} className="mx-2" />
            <button
              onClick={() => navigate("/pokemon")}
              className="hover:text-blue-500"
            >
              Pokémon Cards
            </button>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-800 font-medium">
              {title || "Card Details"}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Card Details */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2 p-6">
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-96">
                <img
                  src={
                    activeImage === "front"
                      ? frontImageUrl || defaultFrontImage
                      : backImageUrl || defaultBackImage
                  }
                  alt={`${title} ${activeImage}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex mt-4 gap-4 justify-center">
                <button
                  onClick={() => setActiveImage("front")}
                  className={`border-2 rounded-md p-1 w-24 h-24 flex items-center justify-center ${
                    activeImage === "front"
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={frontImageUrl || defaultFrontImage}
                    alt={`${title} front thumbnail`}
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
                <button
                  onClick={() => setActiveImage("back")}
                  className={`border-2 rounded-md p-1 w-24 h-24 flex items-center justify-center ${
                    activeImage === "back"
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={backImageUrl || defaultBackImage}
                    alt={`${title} back thumbnail`}
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8 bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  In Stock
                </span>
                {grade && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full ml-2">
                    Grade: {grade}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>

              {/* Price Section */}
              <div className="mb-6">
                {isDonation ? (
                  <span className="text-4xl font-bold text-pink-600">
                    Donation
                  </span>
                ) : (
                  <>
                    <span className="text-4xl font-bold text-gray-900">
                      ${price?.toFixed(2) || "N/A"}
                    </span>
                    
                  </>
                )}
              </div>

              <p className="text-gray-600 mb-6">{description}</p>

              {/* Card Information Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-sm">
                  <span className="text-gray-500">Year:</span>
                  <span className="text-gray-800 ml-2 font-medium">
                    {year || "N/A"}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Brand:</span>
                  <span className="text-gray-800 ml-2 font-medium">
                    {brand || "N/A"}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Card Number:</span>
                  <span className="text-gray-800 ml-2 font-medium">
                    {cardNumber || "N/A"}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Player:</span>
                  <span className="text-gray-800 ml-2 font-medium">
                    {player || "N/A"}
                  </span>
                </div>
                {population && (
                  <div className="text-sm">
                    <span className="text-gray-500">Population:</span>
                    <span className="text-gray-800 ml-2 font-medium">
                      {population}
                    </span>
                  </div>
                )}
                {certificationNumber && (
                  <div className="text-sm">
                    <span className="text-gray-500">Cert Number:</span>
                    <span className="text-gray-800 ml-2 font-medium">
                      {certificationNumber}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={isDonation ? handleDonationClick : handleAddToCart}
                  disabled={!isDonation && isInCart}
                  className={`font-medium py-3 px-6 rounded-lg flex-1 flex items-center justify-center transition-all ${
                    isDonation 
                      ? "bg-pink-500 hover:bg-pink-600 text-white"
                      : isInCart
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {!isDonation && isInCart ? (
                    <>
                      <Check size={20} className="mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} className="mr-2" />
                      {isDonation ? "Receive Donation" : "Add to Cart"}
                    </>
                  )}
                </button>
                <button
                  onClick={handleAddToFavorites}
                  disabled={toggleFavoriteMutation.isLoading}
                  className={`border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center ${
                    toggleFavoriteMutation.isLoading ? "opacity-50" : ""
                  }`}
                >
                  <Heart
                    size={20}
                    className={
                      optimisticFavorite
                        ? "text-red-500 fill-red-500"
                        : "text-gray-700"
                    }
                  />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 border-t pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-2 rounded-full mb-2">
                    <Shield size={20} className="text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600">
                    Authenticity Guaranteed
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-2 rounded-full mb-2">
                    <Check size={20} className="text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600">Quality Assured</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-2 rounded-full mb-2">
                    <Clock size={20} className="text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white rounded-xl shadow-md mt-8 p-8">
          <h2 className="text-2xl font-bold mb-6">Additional Details</h2>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {labelType && (
              <div className="border-b pb-3">
                <h3 className="text-sm text-gray-500">Label Type</h3>
                <p className="text-gray-800">{labelType}</p>
              </div>
            )}
            {hasReverseBarcode !== undefined && (
              <div className="border-b pb-3">
                <h3 className="text-sm text-gray-500">Reverse Barcode</h3>
                <p className="text-gray-800">
                  {hasReverseBarcode ? "Yes" : "No"}
                </p>
              </div>
            )}
            {varietyPedigree && (
              <div className="border-b pb-3">
                <h3 className="text-sm text-gray-500">Variety/Pedigree</h3>
                <p className="text-gray-800">{varietyPedigree}</p>
              </div>
            )}
            {sport && (
              <div className="border-b pb-3">
                <h3 className="text-sm text-gray-500">Sport</h3>
                <p className="text-gray-800">{sport}</p>
              </div>
            )}
            {vendorId && (
              <div className="border-b pb-3">
                <h3 className="text-sm text-gray-500">Vendor ID</h3>
                <p className="text-gray-800">{vendorId}</p>
              </div>
            )}
            {createdAt && (
              <div className="border-b pb-3">
                <h3 className="text-sm text-gray-500">Listed On</h3>
                <p className="text-gray-800">{formatDate(createdAt)}</p>
              </div>
            )}
            {updatedAt && (
              <div className="border-b pb-3">
                <h3 className="text-sm text-gray-500">Last Updated</h3>
                <p className="text-gray-800">{formatDate(updatedAt)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Similar Cards Section - Now using real API data */}
        {similarCards.length > 0 ? (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              {getSectionTitle()}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarCards.map((card) => (
                <div key={card.id} className="h-full">
                  <PokemonCard pokemon={card} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-500 mb-2">
                No Similar Cards Available
              </h2>
              <p className="text-gray-400">
                We couldn't find any similar cards to show you at this time.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCardDetails;