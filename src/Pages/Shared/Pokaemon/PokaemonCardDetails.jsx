import { useParams } from "react-router-dom"; // Ensure you're using useParams
import { useEffect, useState } from "react";

const PokaemonCardDetails = () => {
  const { id } = useParams(); // Get the id from the URL
  const [pokaemonData, setPokaemonData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchPokaemonDetails = async () => {
      try {
        setLoading(true);
        // Fetch the specific Pokémon details
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        const data = await response.json();
        console.log("Fetched Pokémon data: ", data); // Log the data to check
        setPokaemonData(data);
      } catch (error) {
        console.error("Error fetching Pokémon data: ", error);
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchPokaemonDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pokaemonData) {
    return <div>No Pokémon data found</div>;
  }

  return (
    <div>
      <h1>{pokaemonData.name}</h1>
      <img src={pokaemonData.sprites.front_default} alt={pokaemonData.name} />
      {/* Render other details like types, stats, etc. */}
      <div>
        <h2>Types:</h2>
        <ul>
          {pokaemonData.types.map((typeInfo) => (
            <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Stats:</h2>
        <ul>
          {pokaemonData.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokaemonCardDetails;
