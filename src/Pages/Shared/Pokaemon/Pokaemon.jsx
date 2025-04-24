
"use client"
import { useState } from "react"
import { Search, Loader, Home, RefreshCw } from "lucide-react"
import PokaemonCard from "./PokaemonCard"
// Main Pokémon display componente
 const Pokaemon = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const typeIcons = {
    normal: "⚪",
    fire: "🔥",
    water: "💧",
    electric: "⚡",
    grass: "🌿",
    ice: "❄️",
    fighting: "👊",
    poison: "☠️",
    ground: "🌍",
    flying: "🦅",
    psychic: "🔮",
    bug: "🐛",
    rock: "🪨",
    ghost: "👻",
    dragon: "🐉",
    dark: "🌑",
    steel: "⚙️",
    fairy: "✨",
    lightning: "⚡",
  };

  const typeColors = {
    normal: "bg-gray-200",
    fire: "bg-red-100",
    water: "bg-blue-100",
    electric: "bg-yellow-100",
    grass: "bg-green-100",
    ice: "bg-blue-50",
    fighting: "bg-red-200",
    poison: "bg-purple-100",
    ground: "bg-yellow-200",
    flying: "bg-indigo-100",
    psychic: "bg-pink-100",
    bug: "bg-lime-100",
    rock: "bg-amber-100",
    ghost: "bg-indigo-200",
    dragon: "bg-violet-100",
    dark: "bg-gray-300",
    steel: "bg-slate-200",
    fairy: "bg-pink-50",
    lightning: "bg-yellow-100/70",
  };

  // Card data from the provided JSON
  const cards = [
    {
      "certificationNumber": "104928040",
      "labelType": "with fugitive ink technology",
      "reverseCertBarcode": true,
      "year": 2022,
      "brand": "POKEMON GO JAPANESE",
      "sport": "TGC Cards",
      "cardNumber": "xy7-54",
      "player": "PIKACHU",
      "varietyPedigree": "",
      "grade": "MINT 9",
      "population": 210,
      "psaAuctionPricesRealized": null,
      "currentPsaRegistrySets": [],
      "imageFrontUrl": "https://www.pojo.com/wp-content/uploads/2021/01/Pikachu-V-vv043.jpg",
      "imageBackUrl": "your-image-url-back",
      "reviews": {
        "rating": 4.5,
        "totalReviews": 120
      }
    },
    {
      "certificationNumber": "104928041",
      "labelType": "with fugitive ink technology",
      "reverseCertBarcode": true,
      "year": 2022,
      "brand": "POKEMON GO JAPANESE",
      "sport": "TGC Cards",
      "cardNumber": "xy7-55",
      "player": "CHARIZARD",
      "varietyPedigree": "",
      "grade": "MINT 9",
      "population": 136,
      "psaAuctionPricesRealized": null,
      "currentPsaRegistrySets": [],
      "imageFrontUrl": "https://images.pokemontcg.io/smp/SM212.png",
      "imageBackUrl": "your-image-url-back",
      "reviews": {
        "rating": 4.9,
        "totalReviews": 320
      }
    },
    {
      "certificationNumber": "104928042",
      "labelType": "with fugitive ink technology",
      "reverseCertBarcode": true,
      "year": 2022,
      "brand": "POKEMON GO JAPANESE",
      "sport": "TGC Cards",
      "cardNumber": "xy7-56",
      "player": "GENGAR",
      "varietyPedigree": "",
      "grade": "MINT 9",
      "population": 178,
      "psaAuctionPricesRealized": null,
      "currentPsaRegistrySets": [],
      "imageFrontUrl": "https://images.pokemontcg.io/sm9/53.png",
      "imageBackUrl": "your-image-url-back",
      "reviews": {
        "rating": 4.7,
        "totalReviews": 210
      }
    },
    {
      "certificationNumber": "104928043",
      "labelType": "with fugitive ink technology",
      "reverseCertBarcode": true,
      "year": 2022,
      "brand": "POKEMON GO JAPANESE",
      "sport": "TGC Cards",
      "cardNumber": "swsh3-19",
      "player": "BULBASAUR",
      "varietyPedigree": "",
      "grade": "MINT 9",
      "population": 154,
      "psaAuctionPricesRealized": null,
      "currentPsaRegistrySets": [],
      "imageFrontUrl": "https://images.pokemontcg.io/swsh1/1.png",
      "imageBackUrl": "your-image-url-back",
      "reviews": {
        "rating": 4.2,
        "totalReviews": 95
      }
    }
  ];

  // Mapping pokemon types based on their names
  const getPokemonTypes = (pokemonName) => {
    const typeMap = {
      "PIKACHU": ["electric"],
      "CHARIZARD": ["fire", "flying"],
      "GENGAR": ["ghost", "poison"],
      "BULBASAUR": ["grass", "poison"]
    };
    return typeMap[pokemonName] || ["normal"];
  };

  // Generate random stats for each Pokémon
  const generateStats = (pokemonName) => {
    const baseStats = {
      "PIKACHU": { hp: 35, attack: 55, defense: 40, speed: 90 },
      "CHARIZARD": { hp: 78, attack: 84, defense: 78, speed: 100 },
      "GENGAR": { hp: 60, attack: 65, defense: 60, speed: 110 },
      "BULBASAUR": { hp: 45, attack: 49, defense: 49, speed: 45 }
    };
    
    const stats = baseStats[pokemonName] || { hp: 50, attack: 50, defense: 50, speed: 50 };
    
    return [
      { stat: { name: "hp" }, base_stat: stats.hp },
      { stat: { name: "attack" }, base_stat: stats.attack },
      { stat: { name: "defense" }, base_stat: stats.defense },
      { stat: { name: "speed" }, base_stat: stats.speed }
    ];
  };

  // Generate price based on rarity/population
  const generatePrice = (population) => {
    const basePrice = 10;
    const rarityFactor = Math.max(1, 300 / population);
    return Math.round(basePrice * rarityFactor * 100) / 100;
  };

  // Format card data to match the expected structure in PokemonCard
  const formattedCards = cards.map((card, index) => {
    const types = getPokemonTypes(card.player);
    return {
      id: index + 1,
      name: card.player.toLowerCase(),
      height: 7,
      weight: 60,
      types: types.map(type => ({ type: { name: type } })),
      stats: generateStats(card.player),
      sprites: {
        front_default: card.imageFrontUrl,
        other: {
          "official-artwork": {
            front_default: card.imageFrontUrl
          }
        }
      },
      price: generatePrice(card.population),
      reviews: card.reviews,
      image: card.imageFrontUrl,
      // Additional fields from the JSON
      certificationNumber: card.certificationNumber,
      grade: card.grade,
      year: card.year,
      cardNumber: card.cardNumber,
      population: card.population
    };
  });

  // Mock shop functionality
  const addToCart = (pokemon) => {
    alert(`Added ${pokemon.name} to cart!`);
  };

  const toggleFavorite = (pokemon) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.some(fav => fav.id === pokemon.id)) {
        return prevFavorites.filter(fav => fav.id !== pokemon.id);
      } else {
        return [...prevFavorites, pokemon];
      }
    });
  };

  // Filter cards based on search term
  const handleSearchData = formattedCards.filter((card) => {
    const searchLower = search.toLowerCase();
    if (!searchLower) return true;

    if (card.name.toLowerCase().includes(searchLower)) return true;

    // Check if any type matches the search
    return card.types.some((typeInfo) => typeInfo.type.name.toLowerCase() === searchLower);
  });

  const handleRefresh = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      setError(null);
    }, 1000);
  };

  const handleLoadMore = () => {
    alert("This would load more Pokémon cards!");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <Loader className="w-12 h-12 text-blue-500 animate-spin" />
        <h1 className="mt-4 text-xl font-semibold text-gray-700">Loading Pokémon...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-xl font-bold text-red-500 mb-2">Error</h1>
          <p className="text-gray-700">{error.message}</p>
          <button
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center mx-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Pokémon Card Shop</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover and collect your favorite Pokémon cards with detailed information about their types, abilities, and stats.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Pokémon by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700 flex items-center hover:bg-gray-300 transition-colors"
              onClick={() => setSearch("")}
            >
              <Home className="w-4 h-4 mr-1" /> All
            </button>
            {Object.keys(typeIcons).map((type) => (
              <button
                key={type}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700 flex items-center hover:bg-gray-300 transition-colors capitalize"
                onClick={() => setSearch(type)}
              >
                <span className="mr-1">{typeIcons[type]}</span> {type}
              </button>
            ))}
          </div>
        </div>

        {handleSearchData.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700">No Pokémon found</h2>
            <p className="mt-2 text-gray-600">Try a different search term</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {handleSearchData.map((pokemon) => (
                <PokaemonCard
                  key={pokemon.id} 
                  pokaemonData={pokemon} 
                  typeIcons={typeIcons} 
                  typeColors={typeColors}
                  addToCart={addToCart}
                  toggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors shadow-md"
              >
                Load More Pokémon
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Pokaemon;
