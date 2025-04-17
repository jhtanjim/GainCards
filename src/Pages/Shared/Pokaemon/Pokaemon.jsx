"use client"
import { useState } from "react"
import { Search, Loader, Home, RefreshCw } from "lucide-react"
import PokaemonCard from "./PokaemonCard.jsx"
const Pokaemon = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")

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
    lightning: "⚡", // Added for compatibility with your JSON
  }

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
  }

  // Updated cards with real image URLs
  const cards = [
    {
      id: "xy7-54",
      name: "Pikachu",
      hp: "60",
      types: ["Lightning"],
      attacks: [
        {
          name: "Thunder Shock",
          cost: ["Lightning"],
          damage: "20",
          text: "Flip a coin. If heads, the opponent's Active Pokémon is now Paralyzed.",
        },
      ],
      price: 5.99,
      reviews: {
        rating: 4.5,
        totalReviews: 120,
      },
      image: "https://www.pojo.com/wp-content/uploads/2021/01/Pikachu-V-vv043.jpg",
    },
    {
      id: "xy7-55",
      name: "Charizard",
      hp: "150",
      types: ["Fire"],
      attacks: [
        {
          name: "Fire Spin",
          cost: ["Fire", "Fire"],
          damage: "130",
          text: "Discard 2 Energy attached to this Pokémon.",
        },
      ],
      price: 89.99,
      reviews: {
        rating: 4.9,
        totalReviews: 320,
      },
      image: "https://images.pokemontcg.io/smp/SM212.png",
    },
    {
      id: "xy7-56",
      name: "Gengar",
      hp: "130",
      types: ["Psychic"],
      attacks: [
        {
          name: "Shadow Ball",
          cost: ["Psychic", "Colorless"],
          damage: "70",
          text: "Discard an Energy attached to this Pokémon.",
        },
      ],
      price: 35.99,
      reviews: {
        rating: 4.7,
        totalReviews: 210,
      },
      image: "https://images.pokemontcg.io/sm9/53.png",
    },
    {
      id: "swsh3-19",
      name: "Bulbasaur",
      hp: "50",
      types: ["Grass"],
      attacks: [
        {
          name: "Vine Whip",
          cost: ["Grass"],
          damage: "30",
          text: "Simple attack with vines.",
        },
      ],
      price: 3.49,
      reviews: {
        rating: 4.2,
        totalReviews: 95,
      },
      image: "https://images.pokemontcg.io/swsh1/1.png",
    },
  ]

  // Format card data to match the expected structure in PokaemonCard
  const formattedCards = cards.map((card) => ({
    id: card.id,
    name: card.name,
    height: 7, // Default values since these weren't in the original data
    weight: 60,
    types: card.types.map((type) => ({ type: { name: type.toLowerCase() } })),
    stats: [
      { stat: { name: "hp" }, base_stat: Number.parseInt(card.hp) },
      { stat: { name: "attack" }, base_stat: Number.parseInt(card.attacks[0].damage) || 50 },
      { stat: { name: "defense" }, base_stat: 40 }, // Default value
      { stat: { name: "speed" }, base_stat: 45 }, // Default value
    ],
    sprites: {
      front_default: "/placeholder.svg?height=120&width=120",
      other: {
        "official-artwork": {
          front_default: "/placeholder.svg?height=240&width=240",
        },
      },
    },
    price: card.price,
    reviews: card.reviews,
    image: card.image, // Add the image property
  }))

  // Filter cards based on search term
  const handleSearchData = formattedCards.filter((card) => {
    const searchLower = search.toLowerCase()
    if (!searchLower) return true

    if (card.name.toLowerCase().includes(searchLower)) return true

    // Check if any type matches the search
    return card.types.some((typeInfo) => typeInfo.type.name.toLowerCase() === searchLower)
  })

  const handleRefresh = () => {
    setLoading(true)
    // Simulate loading
    setTimeout(() => {
      setLoading(false)
      setError(null)
    }, 1000)
  }

  const handleLoadMore = () => {
    // This would normally fetch more data
    alert("This would load more Pokémon cards!")
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <Loader className="w-12 h-12 text-blue-500 animate-spin" />
        <h1 className="mt-4 text-xl font-semibold text-gray-700">Loading Pokémon...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center  min-h-screen bg-slate-100">
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
    )
  }

  return (
    <div className="min-h-screen   py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Pokémon Card Shop</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover and collect your favorite Pokémon cards with detailed information about their types, abilities, and
            stats.
          </p>
        </div> */}

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
              {handleSearchData.map((pokaemon) => (
                <PokaemonCard key={pokaemon.id} pokaemonData={pokaemon} typeIcons={typeIcons} typeColors={typeColors} />
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
  )
}

export default Pokaemon

