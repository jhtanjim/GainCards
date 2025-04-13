"use client"

import { useState, useEffect } from "react"

const Banner = () => {
  // Type colors - bolder palette for eye-catching design (kept for type badges)
  const typeColors = {
    normal: "bg-gray-200",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-300",
    fighting: "bg-red-600",
    poison: "bg-purple-500",
    ground: "bg-amber-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-amber-500",
    ghost: "bg-indigo-500",
    dragon: "bg-violet-500",
    dark: "bg-gray-700",
    steel: "bg-slate-400",
    fairy: "bg-pink-400",
    lightning: "bg-yellow-400",
  }

  // Type icons using emojis
  const typeIcons = {
    normal: "⚪",
    fire: "🔥",
    water: "💧",
    electric: "⚡",
    grass: "🌿",
    ice: "❄️",
    fighting: "👊",
    poison: "☠️",
    ground: "🌋",
    flying: "🕊️",
    psychic: "🔮",
    bug: "🐛",
    rock: "🪨",
    ghost: "👻",
    dragon: "🐉",
    dark: "🌑",
    steel: "⚙️",
    fairy: "✨",
    lightning: "⚡",
  }

  // Type accent colors
  const typeAccentColors = {
    normal: "bg-gray-300",
    fire: "bg-orange-500",
    water: "bg-blue-600",
    electric: "bg-yellow-500",
    grass: "bg-green-600",
    ice: "bg-blue-400",
    fighting: "bg-red-700",
    poison: "bg-purple-600",
    ground: "bg-amber-700",
    flying: "bg-indigo-500",
    psychic: "bg-pink-600",
    bug: "bg-lime-600",
    rock: "bg-amber-600",
    ghost: "bg-indigo-600",
    dragon: "bg-violet-600",
    dark: "bg-gray-800",
    steel: "bg-slate-500",
    fairy: "bg-pink-500",
    lightning: "bg-yellow-500",
  }

  // Type text colors
  const typeTextColors = {
    normal: "text-gray-700",
    fire: "text-white",
    water: "text-white",
    electric: "text-gray-800",
    grass: "text-white",
    ice: "text-gray-800",
    fighting: "text-white",
    poison: "text-white",
    ground: "text-white",
    flying: "text-white",
    psychic: "text-white",
    bug: "text-white",
    rock: "text-white",
    ghost: "text-white",
    dragon: "text-white",
    dark: "text-white",
    steel: "text-white",
    fairy: "text-white",
    lightning: "text-gray-800",
  }

  // Featured card data
  const cards = [
    {
      id: "xy7-54",
      name: "Pikachu",
      hp: "60",
      types: ["lightning"],
      attacks: [
        {
          name: "Thunder Shock",
          cost: ["lightning"],
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
      rarity: "Rare",
      collection: "Vivid Voltage",
    },
    {
      id: "xy7-55",
      name: "Charizard",
      hp: "150",
      types: ["fire"],
      attacks: [
        {
          name: "Fire Spin",
          cost: ["fire", "fire"],
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
      rarity: "Ultra Rare",
      collection: "Shining Legends",
    },
    {
      id: "xy7-56",
      name: "Gengar",
      hp: "130",
      types: ["psychic"],
      attacks: [
        {
          name: "Shadow Ball",
          cost: ["psychic", "psychic"],
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
      rarity: "Holo Rare",
      collection: "Team Up",
    },
    {
      id: "swsh3-19",
      name: "Bulbasaur",
      hp: "50",
      types: ["grass"],
      attacks: [
        {
          name: "Vine Whip",
          cost: ["grass"],
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
      rarity: "Common",
      collection: "Sword & Shield",
    },
  ]

  // State for current slide
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-slide effect
  useEffect(() => {
    if (!isHovering) {
      const timer = setTimeout(() => {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % cards.length)
          setIsAnimating(false)
        }, 300)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [currentSlide, isHovering, cards.length])

  // Current card data
  const currentCard = cards[currentSlide]
  const currentType = currentCard.types[0].toLowerCase()

  // Background image URL
  const backgroundImageUrl = "https://images.pexels.com/photos/20131195/pexels-photo-20131195/free-photo-of-iphone-with-the-game-yu-gi-oh-duel-links-playing-on-the-display-an-ipad-playing-yu-gi-oh-card-game-the-chronicles-yu-gi-oh-card-game-25th-anniversary-jovan-vasiljevic-photography.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

  // Function to handle slide change
  const changeSlide = (index) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div
      className="relative w-full h-[670px] overflow-hidden rounded-xl shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-out scale-110"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${isHovering ? '1.05' : '1'})`,
        }}
      ></div>

      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-500 opacity-20 blur-xl"></div>
        
        {/* Animated particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${3 + Math.random() * 3}s infinite`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className={`relative z-10 p-8 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Left side: Card image with spotlight effect */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative transform transition-all duration-500 hover:rotate-3 hover:scale-105">
              {/* Card glow effect */}
              <div className={`absolute -inset-4 rounded-xl ${typeColors[currentType]} opacity-40 blur-xl`}></div>
              
              {/* Card spotlight effect */}
              <div className="absolute -inset-2 rounded-full bg-white opacity-40 blur-xl"></div>

              {/* Card */}
              <div className="relative">
                <img
                  src={currentCard.image || "/placeholder.svg?height=400&width=300"}
                  alt={currentCard.name}
                  className="w-64 h-80 object-contain rounded-lg shadow-xl transform transition-transform duration-500 hover:scale-105"
                  style={{
                    boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3), 0 0 15px 2px ${getTypeColor(currentType)}`,
                  }}
                />

                {/* Holographic effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/20 rounded-lg opacity-50"></div>

                {/* Type badge */}
                <div
                  className={`absolute top-3 right-3 ${typeAccentColors[currentType]} px-3 py-1 rounded-full flex items-center shadow-lg transform transition-transform duration-300 hover:scale-110`}
                >
                  <span className="mr-1">{typeIcons[currentType]}</span>
                  <span className={`font-bold ${typeTextColors[currentType]}`}>{currentType}</span>
                </div>

                {/* Featured badge */}
                <div className="absolute -top-3 -left-3 bg-white text-black font-bold px-3 py-1 rounded-full shadow-lg border-2 border-yellow-400 flex items-center">
                  <span className="mr-1">⭐</span>
                  <span>Featured</span>
                </div>
                
                {/* Rarity badge */}
                <div className="absolute bottom-3 left-3 bg-black/70 text-white font-medium px-3 py-1 rounded-full shadow-md border border-white/20 flex items-center text-xs">
                  <span className="mr-1">💎</span>
                  <span>{currentCard.rarity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Card info */}
          <div className="md:w-1/2">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-white/90 shadow-md flex items-center font-bold text-sm">
                <span className="mr-1">⚔️</span>
                <span>HP {currentCard.hp}</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/90 shadow-md flex items-center font-bold text-sm">
                <span className="mr-1">⭐</span>
                <span>
                  {currentCard.reviews.rating.toFixed(1)} ({currentCard.reviews.totalReviews})
                </span>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/90 shadow-md flex items-center font-bold text-sm">
                <span className="mr-1">📚</span>
                <span>{currentCard.collection}</span>
              </div>
            </div>

            <h2 className="text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-yellow-200">
                {currentCard.name}
              </span>
            </h2>

            {/* Attack info */}
            <div className="mb-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/20 transform transition-all duration-300 hover:translate-y-[-4px]">
              <div className="flex items-center mb-2">
                <div className="flex items-center space-x-1">
                  {[...Array(currentCard.attacks[0].cost.length)].map((_, i) => (
                    <span key={i} className="text-xl">{typeIcons[currentType]}</span>
                  ))}
                </div>
                <span className="font-bold text-lg ml-2">{currentCard.attacks[0].name}</span>
                <span
                  className={`ml-auto font-extrabold text-lg px-2 py-1 rounded ${typeAccentColors[currentType]} ${typeTextColors[currentType]}`}
                >
                  {currentCard.attacks[0].damage}
                </span>
              </div>
              <p className="text-gray-700">{currentCard.attacks[0].text}</p>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center mb-4">
              <div className="mr-6">
                <div className="text-sm font-medium text-white text-opacity-90">Price</div>
                <div className="text-4xl font-extrabold text-white drop-shadow-lg">
                  <span className="text-yellow-400">$</span>
                  <span>{currentCard.price.toFixed(2)}</span>
                </div>
              </div>
              <button className="relative overflow-hidden bg-white text-black font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105 hover:translate-y-[-2px] border-2 border-yellow-400 group">
                {/* Button shine effect */}
                <div className="absolute inset-0 w-full h-full translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
                <span className="mr-2">🛒</span>
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Limited time offer badge */}
            <div className="mt-2 inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-4 py-2 rounded-lg shadow-md animate-pulse transform hover:scale-105 transition-transform duration-300">
              <span className="mr-1">⏰</span>
              <span>Limited Time Offer!</span>
            </div>
            
            {/* Stock indicator */}
            <div className="mt-4">
              <div className="flex items-center text-white">
                <span className="mr-2">🔖 In Stock</span>
                <div className="h-2 bg-gray-700 rounded-full w-24">
                  <div className="h-2 bg-green-500 rounded-full" style={{width: '70%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-3 bg-black/80 backdrop-blur-sm">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => changeSlide(index)}
            className={`mx-2 transition-all duration-300 ${
              currentSlide === index
                ? `text-2xl text-white ${typeColors[card.types[0].toLowerCase()]} p-1 rounded-full shadow-md transform scale-125`
                : "text-xl text-white opacity-60 hover:opacity-100 hover:scale-110 transform transition-transform"
            }`}
            aria-label={`View ${card.name}`}
          >
            {typeIcons[card.types[0].toLowerCase()]}
          </button>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white transition-colors z-20 hover:scale-110 transition-transform"
        onClick={() => changeSlide((currentSlide - 1 + cards.length) % cards.length)}
        aria-label="Previous card"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white transition-colors z-20 hover:scale-110 transition-transform"
        onClick={() => changeSlide((currentSlide + 1) % cards.length)}
        aria-label="Next card"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Keyframes for twinkling stars */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.7); }
          50% { opacity: 0.7; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

// Helper function to get color for card glow
function getTypeColor(type) {
  const colorMap = {
    normal: 'rgba(168, 168, 120, 0.5)',
    fire: 'rgba(240, 128, 48, 0.5)', 
    water: 'rgba(104, 144, 240, 0.5)',
    electric: 'rgba(248, 208, 48, 0.5)',
    grass: 'rgba(120, 200, 80, 0.5)',
    ice: 'rgba(152, 216, 216, 0.5)',
    fighting: 'rgba(192, 48, 40, 0.5)',
    poison: 'rgba(160, 64, 160, 0.5)',
    ground: 'rgba(224, 192, 104, 0.5)',
    flying: 'rgba(168, 144, 240, 0.5)',
    psychic: 'rgba(248, 88, 136, 0.5)',
    bug: 'rgba(168, 184, 32, 0.5)',
    rock: 'rgba(184, 160, 56, 0.5)',
    ghost: 'rgba(112, 88, 152, 0.5)',
    dragon: 'rgba(112, 56, 248, 0.5)',
    dark: 'rgba(112, 88, 72, 0.5)',
    steel: 'rgba(184, 184, 208, 0.5)',
    fairy: 'rgba(238, 153, 172, 0.5)',
    lightning: 'rgba(248, 208, 48, 0.5)',
  }
  return colorMap[type] || 'rgba(255, 255, 255, 0.5)'
}

export default Banner