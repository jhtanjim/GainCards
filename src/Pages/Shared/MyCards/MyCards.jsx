import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllPokemonData, deletePokemon } from '../../../api/pokemondata';
import { useAuth } from '../../../Context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import SingleCard from './SingleCard';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

const MyCards = () => {
  const [error, setError] = useState('');
  const [favoritePokemonIds, setFavoritePokemonIds] = useState([]);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Use React Query for data fetching
  const { data: pokemons, isLoading } = useQuery({
    queryKey: ['pokemons'],
    queryFn: getAllPokemonData,
    onError: (err) => {
      setError("Failed to load Pokemon data");
      console.error("Error fetching Pokemon data:", err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to load Pokemon data. Please try again later.',
      });
    }
  });
  
  // Filter pokemon by user ID (using vendorId instead of userId)
  const userPokemons = React.useMemo(() => {
    if (!pokemons || !user) return [];
    
    // Use vendorId instead of userId to match with the user's id
    return pokemons.filter(pokemon => pokemon.vendorId === user.id);
  }, [pokemons, user]);
  
  // Handle deletion with proper error handling
  const handleDelete = useMutation({
    mutationFn: (id) => deletePokemon(id),
    onMutate: async (deletedId) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries(['pokemons']);
      
      // Save the current state
      const previousPokemons = queryClient.getQueryData(['pokemons']);
      
      // Optimistically update the UI
      queryClient.setQueryData(['pokemons'], (old) =>
        old?.filter((pokemon) => pokemon.id !== deletedId)
      );
      
      return { previousPokemons };
    },
    onError: (err, deletedId, context) => {
      // If deletion fails, rollback to the previous state
      queryClient.setQueryData(['pokemons'], context.previousPokemons);
      
      // Display error to user
      console.error(`Error deleting Pokemon with ID ${deletedId}:`, err);
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: `Failed to delete Pokemon: ${err.message || 'Unknown error'}`,
      });
    },
    onSuccess: (data, deletedId) => {
      console.log(`Successfully deleted Pokemon with ID: ${deletedId}`);
      
      // Invalidate the query to refetch fresh data
      queryClient.invalidateQueries(['pokemons']);
    }
  });

  // Handle favorite update
  const handleFavoriteUpdate = (id, isFavorite) => {
    if (isFavorite) {
      setFavoritePokemonIds(prev => [...prev, id]);
    } else {
      setFavoritePokemonIds(prev => prev.filter(pokemonId => pokemonId !== id));
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-xl text-gray-700">Loading your cards...</p>
        </div>
      </div>
    );
  }

  // Render no cards message with nice UI
  if (!userPokemons || userPokemons.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Cards Found</h2>
        <p className="text-gray-600 mb-6">You don't have any Pokemon cards yet. Start adding your collection!</p>
        <Link to="/pokemonCardUpload">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Add Your First Card
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Collection</h1>
        <p className="text-gray-600">{userPokemons.length} cards</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userPokemons.map((pokemon) => (
          <SingleCard
            key={pokemon.id}
            pokemon={pokemon}
            handleDelete={handleDelete}
            initialFavorite={favoritePokemonIds.includes(pokemon.id)}
            onFavoriteUpdate={handleFavoriteUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCards;