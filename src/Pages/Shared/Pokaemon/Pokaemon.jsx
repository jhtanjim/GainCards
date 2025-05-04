import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  getAllFavoritePokemon,
  getAllPokemonData,
} from "../../../api/pokemondata";
import PokaemonCard from "./PokaemonCard";

const Pokaemon = () => {
  const queryClient = useQueryClient();

  const {
    data: pokemons,
    isError: isPokemonError,
    error: pokemonError,
    isLoading: isPokemonLoading,
  } = useQuery({
    queryKey: ["pokemons"],
    queryFn: getAllPokemonData,
  });

  const {
    data: favorites,
    isError: isFavError,
    isLoading: isFavLoading,
  } = useQuery({
    queryKey: ["pokemons", "favoriteList"],
    queryFn: getAllFavoritePokemon,
  });

  const isLoading = isPokemonLoading || isFavLoading;
  const isError = isPokemonError || isFavError;

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg text-gray-600">Loading Pokémon...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 text-xl">
          {pokemonError?.message || "Error fetching data."}
        </p>
        <button
          onClick={() => {
            queryClient.invalidateQueries(["pokemons"]);
            queryClient.invalidateQueries(["pokemons", "favoriteList"]);
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl">No Pokémon cards found.</p>
      </div>
    );
  }

  const favoriteIds = new Set(favorites?.map((fav) => fav.id));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {pokemons.map((pokemon) => (
        <PokaemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={favoriteIds.has(pokemon.id)}
        />
      ))}
    </div>
  );
};

export default Pokaemon;
