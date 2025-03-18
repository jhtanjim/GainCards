"use client"
import { Heart, Activity, Shield, Zap, ShoppingCart } from "lucide-react"
import { useShop } from "../../../Compnent/ShopContext"
import { Link } from "react-router-dom"
// import Image from "next/image"

const PokaemonCard = ({ pokaemonData, typeIcons, typeColors }) => {
  const { addToCart, toggleFavorite, favorites } = useShop()

  // Check if this pokemon is in favorites
  const isFavorite = favorites.some((fav) => fav.id === pokaemonData.id)

  // Get primary type for background color
  const primaryType = pokaemonData.types[0]?.type.name || "normal"
  const backgroundClass = typeColors[primaryType] || "bg-gray-100"

  // Format stats for display
  const getStatValue = (statName) => {
    const stat = pokaemonData.stats.find((s) => s.stat.name === statName)
    return stat ? stat.base_stat : 0
  }

  // Calculate total stats
  const totalStats = pokaemonData.stats.reduce((sum, stat) => sum + stat.base_stat, 0)

  // Format Pokémon ID with leading zeros
  const formattedId = `#${String(pokaemonData.id).padStart(3, "0")}`

  const handleAddToCart = (e) => {
    e.preventDefault() // Prevent navigation when clicking the button
    addToCart({
      id: pokaemonData.id,
      name: pokaemonData.name,
      price: pokaemonData.price,
      image:
        pokaemonData.image ||
        pokaemonData.sprites.other["official-artwork"].front_default ||
        pokaemonData.sprites.front_default,
    })
  }

  const handleToggleFavorite = (e) => {
    e.preventDefault() // Prevent navigation when clicking the button
    toggleFavorite({
      id: pokaemonData.id,
      name: pokaemonData.name,
      image:
        pokaemonData.image ||
        pokaemonData.sprites.other["official-artwork"].front_default ||
        pokaemonData.sprites.front_default,
    })
  }

  return (
    <Link to={`/pokemon/${pokaemonData.id}`} className="block">
      <div
        className={`rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 ${backgroundClass}`}
      >
        {/* Header with image */}
        <div className="relative p-4 flex justify-center">
          <span className="absolute top-2 right-2 text-sm font-mono text-gray-500 font-semibold">{formattedId}</span>
          <div className="relative h-60 w-36">
            <img
              src={
                pokaemonData.image ||
                pokaemonData.sprites.other["official-artwork"].front_default ||
                pokaemonData.sprites.front_default ||
                "/placeholder.svg?height=144&width=144"
              }
              alt={pokaemonData.name}
              className="object-contain z-10"
              fill
              sizes="144px"
              priority
            />
          </div>
          <div className="absolute opacity-10 right-0 bottom-0">
            <svg viewBox="0 0 20 20" className="h-32 w-32 fill-current">
              <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1 4a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-4 rounded-t-2xl relative -mt-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800 capitalize">{pokaemonData.name}</h2>
            <button onClick={handleToggleFavorite} className="focus:outline-none" aria-label="Add to favorites">
              <Heart className={`w-6 h-6 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
            </button>
          </div>

          {/* Types */}
          <div className="flex gap-2 mb-4">
            {pokaemonData.types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className="flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize bg-gray-100"
              >
                {typeIcons[typeInfo.type.name]}
                <span className="ml-1">{typeInfo.type.name}</span>
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid lg:grid-cols-2 gap-3 mb-3">
            <div className="flex items-center">
              <Heart className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-sm font-medium">HP: {getStatValue("hp")}</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">Speed: {getStatValue("speed")}</span>
            </div>
            <div className="flex items-center">
              <Activity className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-sm font-medium">Attack: {getStatValue("attack")}</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm font-medium">Defense: {getStatValue("defense")}</span>
            </div>
          </div>

          {/* Total power bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Total Power</span>
              <span>{totalStats}/600</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${Math.min(100, (totalStats / 600) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Price and weight */}
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Weight:</span> {pokaemonData.weight / 10}kg
            </div>
            <div className="font-semibold text-green-600">${pokaemonData.price}</div>
          </div>

          {/* Reviews */}
          <div className="mt-2 flex items-center text-sm">
            <div className="flex text-yellow-400">
              {"★".repeat(Math.floor(pokaemonData.reviews?.rating || 0))}
              {"☆".repeat(5 - Math.floor(pokaemonData.reviews?.rating || 0))}
            </div>
            <span className="ml-1 text-gray-500">({pokaemonData.reviews?.totalReviews || 0} reviews)</span>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

export default PokaemonCard

