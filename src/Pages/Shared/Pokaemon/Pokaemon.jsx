import React, { useState } from 'react'; 
import { useQuery, useQueryClient } from '@tanstack/react-query'; 
import { getAllPokemonData, deletePokemon } from '../../../api/pokemondata'; 
import { useAuth } from '../../../Context/AuthContext'; 
import PokaemonCard from './PokaemonCard'; // Make sure this matches your file name exactly
import { useMutation } from '@tanstack/react-query';  

const Pokaemon = () => {   
  const [error, setError] = useState('');   
  const { user } = useAuth();   
  const queryClient = useQueryClient();    
  
  // Use React Query for data fetching
  const { data: pokemons, isLoading } = useQuery({     
    queryKey: ['pokemons'],      
    queryFn: getAllPokemonData,     
    onError: (err) => {       
      setError("Failed to load Pokemon data");       
      console.error("Error fetching Pokemon data:", err);     
    }   
  });    
  
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
      setError(`Failed to delete Pokemon: ${err.message || 'Unknown error'}`);
      
      // Clear error after 3 seconds
      setTimeout(() => setError(''), 3000);
    },
    onSuccess: (data, deletedId) => {
      console.log(`Successfully deleted Pokemon with ID: ${deletedId}`);
      
      // No need to manually update cache here since we did it in onMutate
      // Just invalidate the query to refetch fresh data
      queryClient.invalidateQueries(['pokemons']);
    }
  });    

  if (isLoading) return <div className="text-center text-xl mt-10">Loading...</div>;      
  
  if (error) return (     
    <div className="text-center mt-10">       
      <p className="text-red-500 text-xl">{error}</p>       
      <button          
        onClick={() => queryClient.invalidateQueries(['pokemons'])}         
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"       
      >         
        Retry       
      </button>     
    </div>   
  );    
  
  if (!pokemons || pokemons.length === 0) {     
    return (       
      <div className="text-center mt-10">         
        <p className="text-xl">No Pokemon cards found.</p>       
      </div>     
    );   
  }    
  
  return (     
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">       
      {pokemons.map((pokemon) => (         
        <PokaemonCard           
          key={pokemon.id}           
          pokemon={pokemon}           
          handleDelete={handleDelete}         
        />       
      ))}     
    </div>   
  ); 
};  

export default Pokaemon;