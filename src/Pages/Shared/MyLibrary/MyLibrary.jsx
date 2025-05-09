import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import {
  getAllFavoritePokemon,
  getAllPokemonData,
} from "../../../api/pokemondata";
import PokemonCard from "../Pokaemon/PokaemonCard";

const MyLibrary = () => {
  // Fetch all Pokemon data
  const { data: allPokemons = [] } = useQuery({
    queryKey: ["pokemons"],
    queryFn: getAllPokemonData,
  });

  // Fetch favorite Pokemon data
  const {
    data: favorites = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: getAllFavoritePokemon,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Pokémon Library</h1>
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading your favorite Pokémon...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Pokémon Library</h1>
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Error loading favorites
          </h2>
          <p className="text-gray-600 mb-6">
            There was a problem loading your favorite Pokémon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Pokémon Library</h1>
        {favorites.length > 0 && (
          <p className="text-gray-600">{favorites.length} favorites</p>
        )}
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your library is empty
          </h2>
          <p className="text-gray-600 mb-6">
            You haven't added any Pokémon to your favorites yet.
          </p>
          <a
            href="/pokemon"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Browse Pokémon
          </a>
        </div>
      )}

      {/* Pokemon Grid */}
      {favorites.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLibrary;