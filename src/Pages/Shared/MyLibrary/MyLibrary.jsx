import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getAllFavoritePokemon } from '../../../api/pokemondata';
import PokemonCard from '../Pokaemon/PokaemonCard';

const MyLibrary = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all favorite Pokémon when component mounts
  useEffect(() => {
    fetchFavorites();
  }, []);

  // Function to fetch favorites
  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const data = await getAllFavoritePokemon();
      setFavorites(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError('Failed to load your favorite Pokémon. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle favoriting/unfavoriting updates
  const handleFavoriteUpdate = (pokemonId, isFavorite) => {
    if (!isFavorite) {
      // Remove from favorites list when unfavorited
      setFavorites(favorites.filter(pokemon => pokemon.id !== pokemonId));
    }
    // No need for the else case in the MyLibrary component since we're only showing favorites
  };

  // Mock delete handler to satisfy PokemonCard props
  const handleDelete = {
    mutate: (id) => {
      console.log(`Would delete pokemon with ID: ${id}`);
      // You could implement actual delete logic here if needed
    },
    isLoading: false,
    variables: null
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Pokémon Library</h1>
        <button 
          onClick={fetchFavorites}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading your favorite Pokémon...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
          <button 
            onClick={fetchFavorites}
            className="mt-2 text-red-700 font-medium hover:text-red-800"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && favorites.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your library is empty</h2>
          <p className="text-gray-600 mb-6">You haven't added any Pokémon to your favorites yet.</p>
          <a 
            href="/pokemon"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Browse Pokémon
          </a>
        </div>
      )}

      {/* Pokemon Grid */}
      {!loading && !error && favorites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(pokemon => (
            <PokemonCard 
              key={pokemon.id} 
              pokemon={pokemon} 
              handleDelete={handleDelete}
              onFavoriteUpdate={handleFavoriteUpdate}
              initialFavorite={true} // Pass initialFavorite prop instead of isFavorite
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLibrary;