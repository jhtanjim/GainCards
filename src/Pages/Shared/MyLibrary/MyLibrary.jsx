"use client"
import { Heart, ExternalLink, Search, X } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useShop } from "../../../Compnent/ShopContext"

const MyLibrary = () => {
  const { favorites, toggleFavorite } = useShop()
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredFavorites = searchQuery
    ? favorites.filter(fav => fav.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : favorites

  if (favorites.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="bg-pink-100 p-6 rounded-full mb-6">
          <Heart className="w-20 h-20 text-pink-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your library is empty</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          You haven't added any cards to your favorites yet. Find some amazing cards to add to your collection!
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <Heart className="w-5 h-5" />
          Browse Cards
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Library</h1>
          <p className="text-gray-600 mt-1">Your collection of favorite cards</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search in favorites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {searchQuery ? (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          ) : (
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      {filteredFavorites.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">No cards found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFavorites.map((favorite) => (
            <div key={favorite.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="p-4 flex justify-center bg-gray-50 relative">
                <button 
                  onClick={() => toggleFavorite(favorite)}
                  className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm hover:bg-pink-50 transition-colors"
                >
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                </button>
                <img
                  src={favorite.image || "/placeholder.svg"}
                  alt={favorite.name}
                  className="h-36 w-36 object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 capitalize text-center mb-2">{favorite.name}</h3>
                <div className="flex justify-center">
                  <Link
                    to={`/card/${favorite.id}`}
                    className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    View Details
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyLibrary