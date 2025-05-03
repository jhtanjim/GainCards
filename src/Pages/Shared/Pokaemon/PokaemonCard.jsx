import React, { useState } from 'react';
import { ShoppingCart, Heart, Edit, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon, handleDelete }) => {
  // State for card interactions
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Destructure all pokemon card properties
  const {
    id, title, description, price, frontImageUrl, backImageUrl,
    certificationNumber, labelType, hasReverseBarcode, year, brand,
    sport, cardNumber, player, varietyPedigree, grade, population,
    vendorId, createdAt, updatedAt
  } = pokemon;
  
  // Format vendor ID for display
  const formattedId = vendorId || "N/A";
  
  // Set background color based on card label type
  const getBackgroundClass = () => {
    if (!labelType) return 'bg-gray-50';
    
    switch(labelType.toLowerCase()) {
      case 'premium': return 'bg-blue-50';
      case 'rare': return 'bg-purple-50';
      case 'limited': return 'bg-yellow-50';
      default: return 'bg-gray-50';
    }
  };
  
  const backgroundClass = getBackgroundClass();
  
  // Event handlers
  const handleToggleFavorite = () => setIsFavorite(!isFavorite);
  const handleAddToCart = () => console.log('Added to cart:', { ...pokemon, quantity });
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  
  // Handle delete with confirmation
  const confirmAndDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      handleDelete.mutate(id);
    }
  };

  // Format price with commas for thousands
  const formattedPrice = price ? price.toLocaleString() : 'N/A';
  
  // Format update date
  const formattedDate = updatedAt ? new Date(updatedAt).toLocaleDateString() : 'N/A';

  // Is the card currently being deleted?
  const isDeleting = handleDelete.isLoading && handleDelete.variables === id;

  return (
    <div className="block">
      <div
        className={`rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 ${backgroundClass}`}
      >
        {/* Card image section with flip effect */}
        <div 
          className="relative p-4 flex justify-center perspective"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          {/* Card image container with 3D flip effect */}
          <div className="relative h-60 w-60 transition-all duration-500" style={{ transformStyle: 'preserve-3d' }}>
            {/* Front image */}
            <div 
              className="absolute w-full h-full backface-hidden transition-all duration-500"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
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
                backfaceVisibility: 'hidden',
                transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)'
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
          
          {/* Edit and Delete buttons */}
          <div className="absolute top-2 left-2 flex space-x-2 z-10">
            <Link to={`/pokemonCardUpdate/${id}`} state={{ pokemon }}>
              <button className="bg-white p-2 rounded-full shadow-md hover:bg-blue-50">
                <Edit className="w-4 h-4 text-blue-600" />
              </button>
            </Link>

            <button 
              onClick={confirmAndDelete} 
              disabled={isDeleting}
              className={`bg-white p-2 rounded-full shadow-md ${isDeleting ? 'bg-gray-200' : 'hover:bg-red-50'} transition-colors`}
              aria-label="Delete card"
            >
              <Trash2 className={`w-4 h-4 ${isDeleting ? 'text-gray-400' : 'text-red-600'}`} />
            </button>
          </div>
          
          {/* Flip indicator text */}
          <div className="absolute bottom-0 text-xs text-center w-full text-gray-500">
            {isFlipped ? 'Back of card' : 'Hover to see back'}
          </div>
        </div>

        {/* Card Info Section */}
        <div className="bg-white/50 p-4 rounded-t-2xl relative -mt-4">
          {/* Title and Grade Section */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800 capitalize">{title}</h2>
            <div className="flex items-center">
              <span className="text-sm font-semibold bg-blue-100 text-blue-800 py-1 px-2 rounded-md mr-2">
              </span>
              <button 
                onClick={handleToggleFavorite} 
                className="focus:outline-none" 
                aria-label="Add to favorites"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
              </button>
            </div>
          </div>

          {/* Player & Variety Info */}
          <p className="text-sm text-gray-600 mb-3">
            {player} • {varietyPedigree}
          </p>

          {/* Card Description */}
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">{description}</p>

          {/* Card Details Grid - First Row */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
            <div>
              <span className="text-gray-600">Card #:</span> 
              <span className="font-medium ml-1">{cardNumber}</span>
            </div>
            <div>
              <span className="text-gray-600">Year:</span> 
              <span className="font-medium ml-1">{year}</span>
            </div>
            <div>
              <span className="text-gray-600">Population:</span> 
              <span className="font-medium ml-1">{population}</span>
            </div>
            <div>
              <span className="text-gray-600">Cert#:</span> 
              <span className="font-medium ml-1">{certificationNumber}</span>
            </div>
          </div>

          {/* Card Details Grid - Second Row */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
            <div>
              <span className="text-gray-600">Brand:</span> 
              <span className="font-medium ml-1">{brand}</span>
            </div>
            <div>
              <span className="text-gray-600">Sport:</span> 
              <span className="font-medium ml-1">{sport}</span>
            </div>
            <div>
              <span className="text-gray-600">Barcode:</span> 
              <span className="font-medium ml-1">{hasReverseBarcode ? "Yes" : "No"}</span>
            </div>
            <div>
              <span className="text-gray-600">Label:</span> 
              <span className="font-medium ml-1">{labelType}</span>
            </div>
          </div>

          {/* Price and Update Date Section */}
          <div className="flex justify-between items-center mt-4">
            <div className="font-bold text-xl text-green-700">${formattedPrice}</div>
            <div className="text-xs text-gray-500">
              Updated: {formattedDate}
            </div>
          </div>

          {/* Quantity Control Section */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button 
                onClick={decreaseQuantity}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-1 text-center min-w-[40px]">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
          
          {/* View Details Button */}
          <Link to={`/pokemon/${id}`} state={{ pokemon }}>
            <button className="mt-2 w-full py-2 bg-white text-blue-600 border border-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors">
              VIEW DETAILS
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;