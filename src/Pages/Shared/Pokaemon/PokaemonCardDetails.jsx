import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ArrowLeft, ChevronRight, Clock, Award, Check, Shield } from 'lucide-react';

const PokemonCardDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [activeImage, setActiveImage] = useState('front');

  if (!state || !state.pokemon) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">No Pokémon Data Found</h2>
          <p className="text-gray-600 mb-4">The card you're looking for is not available.</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center mx-auto">
            <ArrowLeft size={18} className="mr-2" />
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

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
    player,
    varietyPedigree,
    grade,
    population,
    vendorId,
    createdAt,
    updatedAt
  } = state.pokemon;

  // Fallback images if URLs are not provided
  const defaultFrontImage = "/api/placeholder/400/560";
  const defaultBackImage = "/api/placeholder/400/560";

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Navigation breadcrumb */}
      <div className="bg-white shadow-sm py-3">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-500 flex items-center">
            <a href="#" className="hover:text-blue-500">Home</a>
            <ChevronRight size={16} className="mx-2" />
            <a href="/pokemon" className="hover:text-blue-500">Pokémon Cards</a>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-800 font-medium">{title || 'Card Details'}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Left column - images */}
            <div className="md:w-1/2 p-6">
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-96">
                <img 
                  src={activeImage === 'front' ? (frontImageUrl || defaultFrontImage) : (backImageUrl || defaultBackImage)} 
                  alt={`${title} ${activeImage}`} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              <div className="flex mt-4 gap-4 justify-center">
                <button 
                  onClick={() => setActiveImage('front')}
                  className={`border-2 rounded-md p-1 w-24 h-24 flex items-center justify-center ${activeImage === 'front' ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  <img 
                    src={frontImageUrl || defaultFrontImage} 
                    alt={`${title} front thumbnail`} 
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
                <button 
                  onClick={() => setActiveImage('back')}
                  className={`border-2 rounded-md p-1 w-24 h-24 flex items-center justify-center ${activeImage === 'back' ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  <img 
                    src={backImageUrl || defaultBackImage} 
                    alt={`${title} back thumbnail`} 
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
              </div>
            </div>

            {/* Right column - details */}
            <div className="md:w-1/2 p-8 bg-white">
              <div className="flex items-center mb-2">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">In Stock</span>
                {grade && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full ml-2">Grade: {grade}</span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <span className="text-gray-500 ml-2 text-sm">4.0 (24 reviews)</span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">${price?.toFixed(2) || "N/A"}</span>
                {price && <span className="text-lg text-gray-500 line-through ml-2">${ (price * 1.2).toFixed(2)}</span>}
              </div>

              <p className="text-gray-600 mb-6">{description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-sm">
                  <span className="text-gray-500">Year:</span>
                  <span className="text-gray-800 ml-2 font-medium">{year || 'N/A'}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Brand:</span>
                  <span className="text-gray-800 ml-2 font-medium">{brand || 'N/A'}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Card Number:</span>
                  <span className="text-gray-800 ml-2 font-medium">{cardNumber || 'N/A'}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Player:</span>
                  <span className="text-gray-800 ml-2 font-medium">{player || 'N/A'}</span>
                </div>
                {population && (
                  <div className="text-sm">
                    <span className="text-gray-500">Population:</span>
                    <span className="text-gray-800 ml-2 font-medium">{population}</span>
                  </div>
                )}
                {certificationNumber && (
                  <div className="text-sm">
                    <span className="text-gray-500">Cert Number:</span>
                    <span className="text-gray-800 ml-2 font-medium">{certificationNumber}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mb-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex-1 flex items-center justify-center">
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
                <button className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center">
                  <Heart size={20} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 border-t pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-2 rounded-full mb-2">
                    <Shield size={20} className="text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600">Authenticity Guaranteed</span>
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

        {/* Additional card details */}
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
                <p className="text-gray-800">{hasReverseBarcode ? 'Yes' : 'No'}</p>
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

        {/* Similar products - just for visual design */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Cards You May Like</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={`/api/placeholder/240/320`} 
                    alt={`Similar card ${item}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">Pokémon Card #{item}</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(16)</span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="font-bold text-gray-900">${(Math.random() * 100 + 50).toFixed(2)}</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCardDetails;