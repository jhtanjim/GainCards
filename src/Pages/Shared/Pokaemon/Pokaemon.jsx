import React, { useState } from 'react'; 
import { useQuery, useQueryClient } from '@tanstack/react-query'; 
import { getAllPokemonData, deletePokemon } from '../../../api/pokemondata'; 
import { useAuth } from '../../../Context/AuthContext'; 
import PokaemonCard from './PokaemonCard'; // Make sure this matches your file name exactly

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {pokemons.map((pokemon) => (         
        <PokaemonCard           
          key={pokemon.id}           
          pokemon={pokemon}           
    
    
        />       
      ))}     
    </div>   
  ); 
};  

export default Pokaemon;