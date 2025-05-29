import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Filter, SortAsc, Grid, List, Gift, Star } from 'lucide-react';
import { getAllPokemonData } from '../../../api/pokemondata';
import PokemonCard from './PokaemonCard';

const Pokemon = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('all'); // all, donation, sale
  const [sortBy, setSortBy] = useState('recent'); // recent, price-low, price-high, name
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  // Use React Query for data fetching
  const { data: pokemons = [], isLoading, isError } = useQuery({
    queryKey: ['pokemons'],
    queryFn: getAllPokemonData,
  });
  console.log(pokemons)

  // Filter and sort pokemons
  const processedPokemons = React.useMemo(() => {
    let filtered = [...pokemons];

    // Apply filters
    if (filter === 'donation') {
      filtered = filtered.filter(pokemon => pokemon.isDonation);
    } else if (filter === 'sale') {
      filtered = filtered.filter(pokemon => !pokemon.isDonation);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'name':
          return a.title.localeCompare(b.title);
        case 'recent':
        default:
          return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });

    return filtered;
  }, [pokemons, filter, sortBy]);

  // Get counts for different categories
  const donationCount = pokemons.filter(p => p.isDonation).length;
  const saleCount = pokemons.filter(p => !p.isDonation).length;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-xl text-gray-700">Loading Pokemon cards...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center mt-10 bg-red-50 p-8 rounded-lg max-w-lg mx-auto">
        <div className="text-red-600 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-red-700 mb-2">Oops! Something went wrong</h2>
        <p className="text-red-600 mb-4">Failed to load Pokemon cards</p>
        <button
          onClick={() => queryClient.invalidateQueries(['pokemons'])}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg max-w-lg mx-auto mt-10">
        <div className="text-gray-400 mb-4">
          <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          No Pokemon cards found
        </h2>
        <p className="text-gray-600 mb-6">
          There are currently no Pokemon cards available in the collection.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Pokemon Collection</h1>
            <p className="text-blue-100">
              Discover amazing Pokemon cards and donations
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">{pokemons.length}</div>
              <div className="text-sm text-blue-100">Total Cards</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-300">{saleCount}</div>
              <div className="text-sm text-blue-100">For Sale</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-pink-300">{donationCount}</div>
              <div className="text-sm text-blue-100">Donations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-1" />
              All Cards
            </button>
            <button
              onClick={() => setFilter('sale')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'sale'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Star className="w-4 h-4 inline mr-1" />
              For Sale ({saleCount})
            </button>
            <button
              onClick={() => setFilter('donation')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'donation'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Gift className="w-4 h-4 inline mr-1" />
              Donations ({donationCount})
            </button>
          </div>

          {/* Sort and View Controls */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="recent">Recently Updated</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing {processedPokemons.length} of {pokemons.length} cards
          {filter !== 'all' && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
              {filter === 'donation' ? 'Donations' : 'For Sale'}
            </span>
          )}
        </p>
      </div>

      {/* Cards Grid/List */}
      {processedPokemons.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-gray-400 mb-4">
            <Filter className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No cards found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filters to see more results.
          </p>
        </div>
      ) : (
        <div className={`${
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
            : 'space-y-4'
        }`}>
          {processedPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={false}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pokemon;