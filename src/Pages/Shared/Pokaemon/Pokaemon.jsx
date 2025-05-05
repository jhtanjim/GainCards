import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllPokemonData } from '../../../api/pokemondata';
import PokemonCard from './PokaemonCard';

const Pokemon = () => {
  // Use React Query for data fetching
  const { data: pokemons = [], isLoading, isError } = useQuery({
    queryKey: ['pokemons'],
    queryFn: getAllPokemonData,
  });

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
      <div className="text-center mt-10">
        <p className="text-red-500 text-xl">Failed to load Pokemon data</p>
        <button
          onClick={() => queryClient.invalidateQueries(['pokemons'])}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg max-w-lg mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          No Pokemon cards found
        </h2>
        <p className="text-gray-600 mb-6">
          There are currently no Pokemon cards available.
        </p>
      </div>
    );
  }

  // Render Pokemon cards grid
  return (
    <div className="container mx-auto ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pokemon Collection</h1>
        <p className="text-gray-600">{pokemons.length} cards</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Pokemon;