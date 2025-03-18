"use client"

import { useState, useEffect } from "react"

const Banner = () => {
  // Type colors - bolder palette for eye-catching design
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
    },
  ]

  // State for current slide
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Auto-slide effect
  useEffect(() => {
    if (!isHovering) {
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % cards.length)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [currentSlide, isHovering, cards.length])

  // Current card data
  const currentCard = cards[currentSlide]
  const currentType = currentCard.types[0].toLowerCase()

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl shadow-xl ${typeColors[currentType]} transition-colors duration-300`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Diagonal pattern for background interest */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, white, white 10px, transparent 10px, transparent 20px)`,
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-6">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Left side: Card image with spotlight effect */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Spotlight effect */}
              <div className="absolute -inset-4 rounded-full bg-white opacity-50 blur-xl"></div>

              {/* Card */}
              <div className="relative">
                <img
                  src={currentCard.image || "/placeholder.svg?height=400&width=300"}
                  alt={currentCard.name}
                  className="w-64 h-80 object-contain rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                />

                {/* Type badge */}
                <div
                  className={`absolute top-3 right-3 ${typeAccentColors[currentType]} px-3 py-1 rounded-full flex items-center shadow-md`}
                >
                  <span className="mr-1">{typeIcons[currentType]}</span>
                  <span className={`font-bold ${typeTextColors[currentType]}`}>{currentType}</span>
                </div>

                {/* Featured badge */}
                <div className="absolute -top-2 -left-2 bg-white text-black font-bold px-3 py-1 rounded-full shadow-lg border-2 border-yellow-400 flex items-center">
                  <span className="mr-1">⭐</span>
                  <span>Featured</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Card info */}
          <div className="md:w-1/2">
            <div className="mb-4 flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-white shadow-md flex items-center font-bold text-sm">
                <span className="mr-1">⚔️</span>
                <span>HP {currentCard.hp}</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-white shadow-md flex items-center font-bold text-sm">
                <span className="mr-1">⭐</span>
                <span>
                  {currentCard.reviews.rating.toFixed(1)} ({currentCard.reviews.totalReviews})
                </span>
              </div>
            </div>

            <h2 className={`text-5xl font-extrabold mb-4 ${typeTextColors[currentType]} drop-shadow-sm`}>
              {currentCard.name}
            </h2>

            {/* Attack info */}
            <div className="mb-6 bg-white bg-opacity-90 rounded-lg p-4 shadow-md">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">{typeIcons[currentType]}</span>
                <span className="font-bold text-lg">{currentCard.attacks[0].name}</span>
                <span
                  className={`ml-auto font-extrabold text-lg px-2 py-1 rounded ${typeAccentColors[currentType]} ${typeTextColors[currentType]}`}
                >
                  {currentCard.attacks[0].damage}
                </span>
              </div>
              <p className="text-gray-700">{currentCard.attacks[0].text}</p>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center">
              <div className="mr-6">
                <div className="text-sm font-medium text-white text-opacity-90">Price</div>
                <div className="text-3xl font-extrabold text-white drop-shadow-sm">${currentCard.price.toFixed(2)}</div>
              </div>
              <button className="bg-white text-black font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105 border-2 border-yellow-400">
                <span className="mr-2">🛒</span>
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Limited time offer badge */}
            <div className="mt-4 inline-block bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg shadow-md animate-pulse">
              <span className="mr-1">⏰</span>
              <span>Limited Time Offer!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center p-3 bg-white bg-opacity-90">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`mx-2 transition-all duration-300 ${
              currentSlide === index
                ? `text-2xl ${typeTextColors[card.types[0].toLowerCase()]} ${typeColors[card.types[0].toLowerCase()]} p-1 rounded-full`
                : "text-xl opacity-60 hover:opacity-100"
            }`}
            aria-label={`View ${card.name}`}
          >
            {typeIcons[card.types[0].toLowerCase()]}
          </button>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-20"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length)}
        aria-label="Previous card"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-20"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % cards.length)}
        aria-label="Next card"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Banner






// "use client"

// import { useState, useEffect } from "react"

// const Banner = () => {
//   // Type colors provided
//   const typeColors = {
//     normal: "bg-gray-200",
//     fire: "bg-red-100",
//     water: "bg-blue-100",
//     electric: "bg-yellow-100",
//     grass: "bg-green-100",
//     ice: "bg-blue-50",
//     fighting: "bg-red-200",
//     poison: "bg-purple-100",
//     ground: "bg-yellow-200",
//     flying: "bg-indigo-100",
//     psychic: "bg-pink-100",
//     bug: "bg-lime-100",
//     rock: "bg-amber-100",
//     ghost: "bg-indigo-200",
//     dragon: "bg-violet-100",
//     dark: "bg-gray-300",
//     steel: "bg-slate-200",
//     fairy: "bg-pink-50",
//     lightning: "bg-yellow-100",
//   }

//   // Type icons using emojis
//   const typeIcons = {
//     normal: "⚪",
//     fire: "🔥",
//     water: "💧",
//     electric: "⚡",
//     grass: "🌿",
//     ice: "❄️",
//     fighting: "👊",
//     poison: "☠️",
//     ground: "🌋",
//     flying: "🕊️",
//     psychic: "🔮",
//     bug: "🐛",
//     rock: "🪨",
//     ghost: "👻",
//     dragon: "🐉",
//     dark: "🌑",
//     steel: "⚙️",
//     fairy: "✨",
//     lightning: "⚡",
//   }

//   // Type gradient backgrounds
//   const typeGradients = {
//     normal: "from-gray-200 to-gray-400",
//     fire: "from-red-400 to-orange-500",
//     water: "from-blue-400 to-blue-600",
//     electric: "from-yellow-300 to-yellow-500",
//     grass: "from-green-400 to-green-600",
//     ice: "from-blue-200 to-blue-400",
//     fighting: "from-red-500 to-red-700",
//     poison: "from-purple-400 to-purple-600",
//     ground: "from-yellow-600 to-yellow-800",
//     flying: "from-indigo-300 to-indigo-500",
//     psychic: "from-pink-400 to-purple-500",
//     bug: "from-lime-400 to-lime-600",
//     rock: "from-amber-500 to-amber-700",
//     ghost: "from-violet-400 to-violet-600",
//     dragon: "from-violet-500 to-blue-500",
//     dark: "from-gray-600 to-gray-800",
//     steel: "from-slate-400 to-slate-600",
//     fairy: "from-pink-300 to-pink-500",
//     lightning: "from-yellow-300 to-yellow-500",
//   }

//   // Type text colors
//   const typeTextColors = {
//     normal: "text-gray-700",
//     fire: "text-red-600",
//     water: "text-blue-600",
//     electric: "text-yellow-600",
//     grass: "text-green-600",
//     ice: "text-blue-500",
//     fighting: "text-red-700",
//     poison: "text-purple-600",
//     ground: "text-yellow-700",
//     flying: "text-indigo-600",
//     psychic: "text-pink-600",
//     bug: "text-lime-600",
//     rock: "text-amber-700",
//     ghost: "text-violet-600",
//     dragon: "text-violet-700",
//     dark: "text-gray-800",
//     steel: "text-slate-700",
//     fairy: "text-pink-600",
//     lightning: "text-yellow-600",
//   }

//   // Featured card data
//   const cards = [
//     {
//       id: "xy7-54",
//       name: "Pikachu",
//       hp: "60",
//       types: ["lightning"],
//       attacks: [
//         {
//           name: "Thunder Shock",
//           cost: ["lightning"],
//           damage: "20",
//           text: "Flip a coin. If heads, the opponent's Active Pokémon is now Paralyzed.",
//         },
//       ],
//       price: 5.99,
//       reviews: {
//         rating: 4.5,
//         totalReviews: 120,
//       },
//       image: "https://www.pojo.com/wp-content/uploads/2021/01/Pikachu-V-vv043.jpg",
//     },
//     {
//       id: "xy7-55",
//       name: "Charizard",
//       hp: "150",
//       types: ["fire"],
//       attacks: [
//         {
//           name: "Fire Spin",
//           cost: ["fire", "fire"],
//           damage: "130",
//           text: "Discard 2 Energy attached to this Pokémon.",
//         },
//       ],
//       price: 89.99,
//       reviews: {
//         rating: 4.9,
//         totalReviews: 320,
//       },
//       image: "https://images.pokemontcg.io/smp/SM212.png",
//     },
//     {
//       id: "xy7-56",
//       name: "Gengar",
//       hp: "130",
//       types: ["psychic"],
//       attacks: [
//         {
//           name: "Shadow Ball",
//           cost: ["psychic", "psychic"],
//           damage: "70",
//           text: "Discard an Energy attached to this Pokémon.",
//         },
//       ],
//       price: 35.99,
//       reviews: {
//         rating: 4.7,
//         totalReviews: 210,
//       },
//       image: "https://images.pokemontcg.io/sm9/53.png",
//     },
//     {
//       id: "swsh3-19",
//       name: "Bulbasaur",
//       hp: "50",
//       types: ["grass"],
//       attacks: [
//         {
//           name: "Vine Whip",
//           cost: ["grass"],
//           damage: "30",
//           text: "Simple attack with vines.",
//         },
//       ],
//       price: 3.49,
//       reviews: {
//         rating: 4.2,
//         totalReviews: 95,
//       },
//       image: "https://images.pokemontcg.io/swsh1/1.png",
//     },
//   ]

//   // State for current slide
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isHovering, setIsHovering] = useState(false)
//   const [isAnimating, setIsAnimating] = useState(false)

//   // Auto-slide effect
//   useEffect(() => {
//     if (!isHovering) {
//       const timer = setTimeout(() => {
//         setIsAnimating(true)
//         setTimeout(() => {
//           setCurrentSlide((prev) => (prev + 1) % cards.length)
//           setTimeout(() => {
//             setIsAnimating(false)
//           }, 300)
//         }, 300)
//       }, 3000)
//       return () => clearTimeout(timer)
//     }
//   }, [currentSlide, isHovering, cards.length])

//   // Current card data
//   const currentCard = cards[currentSlide]
//   const currentType = currentCard.types[0].toLowerCase()

//   return (
//     <div
//       className="relative w-full h-96 overflow-hidden rounded-xl shadow-2xl"
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       {/* Dynamic background based on card type */}
//       <div
//         className={`absolute inset-0 bg-gradient-to-br ${typeGradients[currentType]} transition-all duration-700`}
//       ></div>

//       {/* Background pattern */}
//       <div className="absolute inset-0 overflow-hidden opacity-10">
//         <div
//           className="absolute w-full h-full"
//           style={{
//             backgroundImage:
//               "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M30 0a30 30 0 1 1 0 60 30 30 0 0 1 0-60zm0 5a25 25 0 1 0 0 50 25 25 0 0 0 0-50zm0 20a5 5 0 1 1 0 10 5 5 0 0 1 0-10z'/%3E%3C/g%3E%3C/svg%3E\")",
//             backgroundSize: "100px 100px",
//           }}
//         ></div>
//       </div>

//       {/* Container for card and info */}
//       <div className="relative h-full z-10 flex items-center p-8">
//         <div
//           className={`w-full flex items-center justify-between transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}
//         >
//           {/* Left side: Card image with effects */}
//           <div className="w-1/2 pr-8 flex justify-center">
//             <div className="relative">
//               {/* Card glow effect */}
//               <div
//                 className="absolute inset-0 rounded-xl blur-xl"
//                 style={{
//                   background: `rgba(255, 255, 255, 0.6)`,
//                   transform: "scale(0.95)",
//                 }}
//               ></div>

//               {/* Card holographic effect */}
//               <div className="absolute inset-0 rounded-xl overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-tr from-white to-transparent opacity-20 animate-pulse"></div>
//               </div>

//               {/* Type icon background */}
//               <div className="absolute -top-8 -right-8 text-6xl opacity-20 blur-sm">{typeIcons[currentType]}</div>

//               {/* Actual card */}
//               <div className="relative transform transition-all duration-300 hover:scale-110">
//                 <img
//                   src={currentCard.image || "/placeholder.svg"}
//                   alt={currentCard.name}
//                   className="w-64 h-80 object-contain filter drop-shadow-2xl"
//                 />
//                 <div
//                   className={`absolute top-2 right-2 ${typeColors[currentType]} px-3 py-1 rounded-full flex items-center`}
//                 >
//                   <span className="mr-1">{typeIcons[currentType]}</span>
//                   <span className={`font-bold ${typeTextColors[currentType]}`}>{currentType}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right side: Card info */}
//           <div className="w-1/2 pl-8 text-white">
//             <div className="mb-4 flex items-center">
//               <div className="px-3 py-1 rounded-full bg-white flex items-center font-bold text-sm mr-3">
//                 <span className="mr-1">⚔️</span>
//                 <span className="text-black">HP {currentCard.hp}</span>
//               </div>
//               <div className="px-3 py-1 rounded-full bg-white flex items-center font-bold text-sm">
//                 <span className="mr-1">⭐</span>
//                 <span className="text-black">{currentCard.reviews.rating.toFixed(1)}</span>
//               </div>
//             </div>

//             <h2 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">{currentCard.name}</h2>

//             {/* Attack info */}
//             <div className="mb-6 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
//               <div className="flex items-center mb-2">
//                 <span className="text-xl mr-2">{typeIcons[currentType]}</span>
//                 <span className="font-semibold text-lg text-white">{currentCard.attacks[0].name}</span>
//                 <span className="ml-auto font-bold text-lg text-yellow-300">{currentCard.attacks[0].damage}</span>
//               </div>
//               <p className="text-white text-opacity-90 text-sm">{currentCard.attacks[0].text}</p>
//             </div>

//             {/* Price and CTA */}
//             <div className="flex items-center">
//               <div className="mr-4">
//                 <div className="text-sm text-white text-opacity-70">Price</div>
//                 <div className="text-3xl font-bold text-white">${currentCard.price.toFixed(2)}</div>
//               </div>
//               <button className="bg-white flex items-center font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">
//                 <span className="mr-2">🛒</span>
//                 <span className="text-black">Add to Cart</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Featured banner */}
//       <div className="absolute top-0 left-4 z-30 transform -rotate-6">
//         <div className="bg-white py-1 px-4 rounded-lg shadow-md">
//           <span className="text-lg font-bold text-black">Featured</span>
//         </div>
//       </div>

//       {/* Custom navigation */}
//       <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
//         <div className="flex items-center bg-white bg-opacity-30 backdrop-blur-sm rounded-full px-4 py-2">
//           {cards.map((card, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setIsAnimating(true)
//                 setTimeout(() => {
//                   setCurrentSlide(index)
//                   setTimeout(() => {
//                     setIsAnimating(false)
//                   }, 300)
//                 }, 300)
//               }}
//               className={`mx-2 transition-all duration-300 ${
//                 currentSlide === index ? "opacity-100 scale-125" : "opacity-50 hover:opacity-80"
//               }`}
//             >
//               <div className="w-6 h-6 flex items-center justify-center">{typeIcons[card.types[0].toLowerCase()]}</div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Side navigation arrows */}
//       <button
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 z-20 hover:bg-opacity-30 transition-all"
//         onClick={() => {
//           setIsAnimating(true)
//           setTimeout(() => {
//             setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length)
//             setTimeout(() => {
//               setIsAnimating(false)
//             }, 300)
//           }, 300)
//         }}
//       >
//         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>
//       <button
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 z-20 hover:bg-opacity-30 transition-all"
//         onClick={() => {
//           setIsAnimating(true)
//           setTimeout(() => {
//             setCurrentSlide((prev) => (prev + 1) % cards.length)
//             setTimeout(() => {
//               setIsAnimating(false)
//             }, 300)
//           }, 300)
//         }}
//       >
//         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>
//     </div>
//   )
// }

// export default Banner





// import React, { useState, useEffect } from 'react';

// const Banner = () => {
//   // Featured card data
//   const cards = [
//     {
//       id: "xy7-54",
//       name: "Pikachu",
//       hp: "60",
//       types: ["Lightning"],
//       attacks: [
//         {
//           name: "Thunder Shock",
//           cost: ["Lightning"],
//           damage: "20",
//           text: "Flip a coin. If heads, the opponent's Active Pokémon is now Paralyzed.",
//         },
//       ],
//       price: 5.99,
//       reviews: {
//         rating: 4.5,
//         totalReviews: 120,
//       },
//       image: "https://www.pojo.com/wp-content/uploads/2021/01/Pikachu-V-vv043.jpg",
//       bgColor: "from-yellow-300 to-yellow-500",
//       glowColor: "rgba(255, 216, 0, 0.6)",
//     },
//     {
//       id: "xy7-55",
//       name: "Charizard",
//       hp: "150",
//       types: ["Fire"],
//       attacks: [
//         {
//           name: "Fire Spin",
//           cost: ["Fire", "Fire"],
//           damage: "130",
//           text: "Discard 2 Energy attached to this Pokémon.",
//         },
//       ],
//       price: 89.99,
//       reviews: {
//         rating: 4.9,
//         totalReviews: 320,
//       },
//       image: "https://images.pokemontcg.io/smp/SM212.png",
//       bgColor: "from-red-400 to-orange-500",
//       glowColor: "rgba(255, 59, 48, 0.6)",
//     },
//     {
//       id: "xy7-56",
//       name: "Gengar",
//       hp: "130",
//       types: ["Psychic"],
//       attacks: [
//         {
//           name: "Shadow Ball",
//           cost: ["Psychic", "Colorless"],
//           damage: "70",
//           text: "Discard an Energy attached to this Pokémon.",
//         },
//       ],
//       price: 35.99,
//       reviews: {
//         rating: 4.7,
//         totalReviews: 210,
//       },
//       image: "https://images.pokemontcg.io/sm9/53.png",
//       bgColor: "from-purple-400 to-purple-600",
//       glowColor: "rgba(138, 43, 226, 0.6)",
//     },
//     {
//       id: "swsh3-19",
//       name: "Bulbasaur",
//       hp: "50",
//       types: ["Grass"],
//       attacks: [
//         {
//           name: "Vine Whip",
//           cost: ["Grass"],
//           damage: "30",
//           text: "Simple attack with vines.",
//         },
//       ],
//       price: 3.49,
//       reviews: {
//         rating: 4.2,
//         totalReviews: 95,
//       },
//       image: "https://images.pokemontcg.io/swsh1/1.png",
//       bgColor: "from-green-400 to-green-600",
//       glowColor: "rgba(52, 199, 89, 0.6)",
//     },
//   ];

//   // State for current slide
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isHovering, setIsHovering] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);

//   // Auto-slide effect
//   useEffect(() => {
//     if (!isHovering) {
//       const timer = setTimeout(() => {
//         setIsAnimating(true);
//         setTimeout(() => {
//           setCurrentSlide((prev) => (prev + 1) % cards.length);
//           setTimeout(() => {
//             setIsAnimating(false);
//           }, 300);
//         }, 300);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [currentSlide, isHovering, cards.length]);

//   // Current card data
//   const currentCard = cards[currentSlide];

//   return (
//     <div 
//       className="relative w-full h-96 overflow-hidden rounded-xl"
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       {/* Dynamic background based on card type */}
//       <div className={`absolute inset-0 bg-gradient-to-br ${currentCard.bgColor} transition-all duration-700`}></div>
      
//       {/* Background pattern */}
//       <div className="absolute inset-0 overflow-hidden opacity-10">
//         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="pokeball" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
//               <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="2" fill="none" />
//               <circle cx="30" cy="30" r="15" stroke="white" strokeWidth="2" fill="none" />
//               <line x1="0" y1="30" x2="60" y2="30" stroke="white" strokeWidth="2" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#pokeball)" />
//         </svg>
//       </div>
      
//       {/* Energized particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(30)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full bg-white opacity-60 animate-float"
//             style={{
//               width: `${Math.random() * 6 + 2}px`,
//               height: `${Math.random() * 6 + 2}px`,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDuration: `${Math.random() * 8 + 5}s`,
//               animationDelay: `${Math.random() * 5}s`,
//             }}
//           ></div>
//         ))}
//       </div>
      
//       {/* Container for card and info */}
//       <div className="relative h-full z-10 flex items-center p-8">
//         <div className={`w-full flex items-center justify-between transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
//           {/* Left side: Card image with effects */}
//           <div className="w-1/2 pr-8 flex justify-center">
//             <div className="relative">
//               {/* Card glow effect */}
//               <div 
//                 className="absolute inset-0 rounded-xl blur-xl"
//                 style={{ 
//                   background: currentCard.glowColor,
//                   transform: 'scale(0.95)',
//                 }}
//               ></div>
              
//               {/* Card holographic effect */}
//               <div className="absolute inset-0 rounded-xl overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-tr from-white to-transparent opacity-20 animate-shine"></div>
//               </div>
              
//               {/* Actual card */}
//               <div className="relative transform transition-all duration-300 hover:scale-110 hover:rotate-3">
//                 <img 
//                   src={currentCard.image} 
//                   alt={currentCard.name} 
//                   className="w-64 h-80 object-contain filter drop-shadow-2xl"
//                 />
//               </div>
//             </div>
//           </div>
          
//           {/* Right side: Card info */}
//           <div className="w-1/2 pl-8 text-white">
//             <div className="mb-4 flex items-center">
//               <div className={`px-4 py-1 rounded-full bg-white text-black font-bold text-sm mr-3`}>
//                 {currentCard.types[0]} TYPE
//               </div>
//               <div className="px-4 py-1 rounded-full bg-white text-black font-bold text-sm">
//                 HP {currentCard.hp}
//               </div>
//             </div>
            
//             <h2 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">{currentCard.name}</h2>
            
//             <div className="flex items-center mb-6">
//               <div className="flex text-yellow-300 text-2xl">
//                 {"★".repeat(Math.floor(currentCard.reviews.rating))}
//                 {currentCard.reviews.rating % 1 >= 0.5 ? "½" : ""}
//               </div>
//               <span className="text-yellow-100 ml-2">({currentCard.reviews.totalReviews} reviews)</span>
//             </div>
            
//             {/* Attack info */}
//             <div className="mb-6 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
//               <div className="flex justify-between mb-2">
//                 <span className="font-semibold text-lg text-white">{currentCard.attacks[0].name}</span>
//                 <span className="font-bold text-lg text-yellow-300">{currentCard.attacks[0].damage}</span>
//               </div>
//               <p className="text-white text-opacity-90 text-sm">{currentCard.attacks[0].text}</p>
//             </div>
            
//             {/* Price and CTA */}
//             <div className="flex items-center">
//               <div className="mr-4">
//                 <div className="text-sm text-white text-opacity-70">Price</div>
//                 <div className="text-3xl font-bold text-white">${currentCard.price.toFixed(2)}</div>
//               </div>
//               <button className="bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Custom navigation */}
//       <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
//         <div className="flex items-center bg-white bg-opacity-30 backdrop-blur-sm rounded-full px-4 py-2">
//           {cards.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setIsAnimating(true);
//                 setTimeout(() => {
//                   setCurrentSlide(index);
//                   setTimeout(() => {
//                     setIsAnimating(false);
//                   }, 300);
//                 }, 300);
//               }}
//               className={`mx-1.5 transition-all duration-300 ${
//                 currentSlide === index 
//                   ? 'opacity-100 scale-125' 
//                   : 'opacity-50 hover:opacity-80'
//               }`}
//             >
//               <div className={`w-3 h-3 rounded-full bg-white`}></div>
//             </button>
//           ))}
//         </div>
//       </div>
      
//       {/* Side navigation arrows with card preview */}
//       <button 
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 z-20 hover:bg-opacity-30 transition-all group"
//         onClick={() => {
//           setIsAnimating(true);
//           setTimeout(() => {
//             setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length);
//             setTimeout(() => {
//               setIsAnimating(false);
//             }, 300);
//           }, 300);
//         }}
//       >
//         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//         <div className="absolute left-0 top-0 transform -translate-x-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
//           <div className="p-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg ml-2">
//             <img 
//               src={cards[(currentSlide - 1 + cards.length) % cards.length].image} 
//               alt="Previous" 
//               className="w-16 h-20 object-contain"
//             />
//           </div>
//         </div>
//       </button>
//       <button 
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 z-20 hover:bg-opacity-30 transition-all group"
//         onClick={() => {
//           setIsAnimating(true);
//           setTimeout(() => {
//             setCurrentSlide((prev) => (prev + 1) % cards.length);
//             setTimeout(() => {
//               setIsAnimating(false);
//             }, 300);
//           }, 300);
//         }}
//       >
//         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//         <div className="absolute right-0 top-0 transform translate-x-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
//           <div className="p-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg mr-2">
//             <img 
//               src={cards[(currentSlide + 1) % cards.length].image} 
//               alt="Next" 
//               className="w-16 h-20 object-contain"
//             />
//           </div>
//         </div>
//       </button>
      
//       {/* Hero text */}
//       <div className="absolute top-6 left-8 z-20">
//         <h1 className="text-white text-2xl font-bold drop-shadow-lg">
//           Featured Pokémon
//           <span className="block text-4xl mt-1">Collector's Edition</span>
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default Banner;
// import React, { useState, useEffect } from 'react';

// const Banner = () => {
//   // Featured card data
//   const cards = [
//     {
//       id: "xy7-54",
//       name: "Pikachu",
//       hp: "60",
//       types: ["Lightning"],
//       attacks: [
//         {
//           name: "Thunder Shock",
//           cost: ["Lightning"],
//           damage: "20",
//           text: "Flip a coin. If heads, the opponent's Active Pokémon is now Paralyzed.",
//         },
//       ],
//       price: 5.99,
//       reviews: {
//         rating: 4.5,
//         totalReviews: 120,
//       },
//       image: "https://www.pojo.com/wp-content/uploads/2021/01/Pikachu-V-vv043.jpg",
//     },
//     {
//       id: "xy7-55",
//       name: "Charizard",
//       hp: "150",
//       types: ["Fire"],
//       attacks: [
//         {
//           name: "Fire Spin",
//           cost: ["Fire", "Fire"],
//           damage: "130",
//           text: "Discard 2 Energy attached to this Pokémon.",
//         },
//       ],
//       price: 89.99,
//       reviews: {
//         rating: 4.9,
//         totalReviews: 320,
//       },
//       image: "https://images.pokemontcg.io/smp/SM212.png",
//     },
//     {
//       id: "xy7-56",
//       name: "Gengar",
//       hp: "130",
//       types: ["Psychic"],
//       attacks: [
//         {
//           name: "Shadow Ball",
//           cost: ["Psychic", "Colorless"],
//           damage: "70",
//           text: "Discard an Energy attached to this Pokémon.",
//         },
//       ],
//       price: 35.99,
//       reviews: {
//         rating: 4.7,
//         totalReviews: 210,
//       },
//       image: "https://images.pokemontcg.io/sm9/53.png",
//     },
//     {
//       id: "swsh3-19",
//       name: "Bulbasaur",
//       hp: "50",
//       types: ["Grass"],
//       attacks: [
//         {
//           name: "Vine Whip",
//           cost: ["Grass"],
//           damage: "30",
//           text: "Simple attack with vines.",
//         },
//       ],
//       price: 3.49,
//       reviews: {
//         rating: 4.2,
//         totalReviews: 95,
//       },
//       image: "https://images.pokemontcg.io/swsh1/1.png",
//     },
//   ];

//   // Type color mapping
//   const typeColors = {
//     Fire: "bg-red-600",
//     Lightning: "bg-yellow-500",
//     Psychic: "bg-purple-600",
//     Grass: "bg-green-500"
//   };

//   // Type border color mapping
//   const typeBorderColors = {
//     Fire: "border-red-600",
//     Lightning: "border-yellow-500",
//     Psychic: "border-purple-600",
//     Grass: "border-green-500"
//   };

//   // State for current slide
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isHovering, setIsHovering] = useState(false);

//   // Auto-slide effect
//   useEffect(() => {
//     if (!isHovering) {
//       const timer = setTimeout(() => {
//         setCurrentSlide((prev) => (prev + 1) % cards.length);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [currentSlide, isHovering, cards.length]);

//   return (
//     <div className="w-full relative overflow-hidden rounded-xl shadow-xl border border-gray-200" 
//          onMouseEnter={() => setIsHovering(true)}
//          onMouseLeave={() => setIsHovering(false)}>
//       {/* New background */}
//       <div className="absolute inset-0 bg-gray-100 overflow-hidden">
//         {/* Pattern overlay */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0" style={{
//             backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
//             backgroundSize: '60px 60px',
//           }}></div>
//         </div>
//       </div>
      
//       {/* Main banner container */}
//       <div className="relative p-6">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h2 className="text-gray-800 text-3xl font-bold tracking-tight">
//               Featured Pokémon Cards
//             </h2>
//             <p className="text-gray-600 text-lg">Exclusive deals on rare collectibles</p>
//           </div>
//           <button className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors transform hover:scale-105 shadow-lg">
//             See all deals
//           </button>
//         </div>

//         {/* Featured card showcase */}
//         <div className="relative h-96 overflow-hidden">
//           <div 
//             className="flex transition-transform duration-500 ease-in-out h-full" 
//             style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//           >
//             {cards.map((card) => (
//               <div 
//                 key={card.id} 
//                 className="min-w-full flex justify-between items-center px-4"
//               >
//                 {/* Left side - Card image */}
//                 <div className={`relative w-1/2 h-80 transform hover:scale-105 transition-all duration-300 
//                                border-8 ${typeBorderColors[card.types[0]]} rounded-2xl bg-white shadow-lg`}>
//                   <img 
//                     src={card.image} 
//                     alt={card.name} 
//                     className="w-full h-full object-contain p-2"
//                   />
//                   <div className={`absolute top-2 right-2 ${typeColors[card.types[0]]} text-white px-3 py-1 rounded-full text-sm font-bold`}>
//                     {card.types[0]}
//                   </div>
//                 </div>
                
//                 {/* Right side - Card info */}
//                 <div className="w-1/2 pl-10">
//                   <h3 className="text-gray-800 font-bold text-4xl mb-2">{card.name}</h3>
//                   <div className="flex items-center mb-3">
//                     <span className="text-gray-600 text-lg">HP</span>
//                     <span className="ml-2 px-3 py-1 bg-gray-800 text-white rounded-md font-bold">{card.hp}</span>
//                   </div>
                  
//                   <div className="flex items-center mb-4">
//                     <div className="flex text-yellow-500 text-xl">
//                       {"★".repeat(Math.floor(card.reviews.rating))}
//                       {card.reviews.rating % 1 >= 0.5 ? "½" : ""}
//                     </div>
//                     <span className="text-gray-500 ml-2">({card.reviews.totalReviews} reviews)</span>
//                   </div>
                  
//                   <div className="bg-gray-100 p-4 rounded-lg mb-4">
//                     <h4 className="font-bold text-gray-700 mb-1">Main Attack</h4>
//                     <div className="flex items-center">
//                       <span className={`inline-block w-6 h-6 rounded-full ${typeColors[card.types[0]]}`}></span>
//                       <span className="ml-2 font-medium">{card.attacks[0].name}</span>
//                     </div>
//                     <div className="flex justify-between mt-2">
//                       <span className="text-red-500 font-bold">{card.attacks[0].damage} damage</span>
//                       <span className="text-gray-600 text-sm italic">{card.attacks[0].text}</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center">
//                     <div className="text-green-600 font-bold text-3xl mr-4">${card.price.toFixed(2)}</div>
//                     <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors transform hover:scale-105 shadow-lg">
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         {/* Custom navigation dots */}
//         <div className="flex justify-center mt-6">
//           {cards.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`mx-1 w-3 h-3 rounded-full transition-all duration-300 ${
//                 currentSlide === index 
//                   ? 'bg-blue-600 w-8' 
//                   : 'bg-gray-300 hover:bg-gray-400'
//               }`}
//             ></button>
//           ))}
//         </div>
        
//         {/* Side navigation arrows */}
//         <button 
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all"
//           onClick={() => setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length)}
//         >
//           <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <button 
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all"
//           onClick={() => setCurrentSlide((prev) => (prev + 1) % cards.length)}
//         >
//           <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Banner;
// import React, { useState, useEffect } from 'react';

// const Banner = () => {
//   // Featured card data
//   const cards = [
//     {
//       id: "xy7-54",
//       name: "Pikachu",
//       hp: "60",
//       types: ["Lightning"],
//       attacks: [
//         {
//           name: "Thunder Shock",
//           cost: ["Lightning"],
//           damage: "20",
//           text: "Flip a coin. If heads, the opponent's Active Pokémon is now Paralyzed.",
//         },
//       ],
//       price: 5.99,
//       reviews: {
//         rating: 4.5,
//         totalReviews: 120,
//       },
//       image: "https://www.pojo.com/wp-content/uploads/2021/01/Pikachu-V-vv043.jpg",
//     },
//     {
//       id: "xy7-55",
//       name: "Charizard",
//       hp: "150",
//       types: ["Fire"],
//       attacks: [
//         {
//           name: "Fire Spin",
//           cost: ["Fire", "Fire"],
//           damage: "130",
//           text: "Discard 2 Energy attached to this Pokémon.",
//         },
//       ],
//       price: 89.99,
//       reviews: {
//         rating: 4.9,
//         totalReviews: 320,
//       },
//       image: "https://images.pokemontcg.io/smp/SM212.png",
//     },
//     {
//       id: "xy7-56",
//       name: "Gengar",
//       hp: "130",
//       types: ["Psychic"],
//       attacks: [
//         {
//           name: "Shadow Ball",
//           cost: ["Psychic", "Colorless"],
//           damage: "70",
//           text: "Discard an Energy attached to this Pokémon.",
//         },
//       ],
//       price: 35.99,
//       reviews: {
//         rating: 4.7,
//         totalReviews: 210,
//       },
//       image: "https://images.pokemontcg.io/sm9/53.png",
//     },
//     {
//       id: "swsh3-19",
//       name: "Bulbasaur",
//       hp: "50",
//       types: ["Grass"],
//       attacks: [
//         {
//           name: "Vine Whip",
//           cost: ["Grass"],
//           damage: "30",
//           text: "Simple attack with vines.",
//         },
//       ],
//       price: 3.49,
//       reviews: {
//         rating: 4.2,
//         totalReviews: 95,
//       },
//       image: "https://images.pokemontcg.io/swsh1/1.png",
//     },
//   ];

//   // Type color mapping
//   const typeColors = {
//     Fire: "bg-red-600",
//     Lightning: "bg-yellow-500",
//     Psychic: "bg-purple-600",
//     Grass: "bg-green-500"
//   };

//   // State for current slide
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isHovering, setIsHovering] = useState(false);

//   // Auto-slide effect
//   useEffect(() => {
//     if (!isHovering) {
//       const timer = setTimeout(() => {
//         setCurrentSlide((prev) => (prev + 1) % cards.length);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [currentSlide, isHovering, cards.length]);

//   return (
//     <div className="w-full relative overflow-hidden rounded-xl shadow-2xl" 
//          onMouseEnter={() => setIsHovering(true)}
//          onMouseLeave={() => setIsHovering(false)}>
//       {/* Animated background */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-800 to-pink-800 animate-gradient-x"></div>
      
//       {/* Sparkle effects */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-white rounded-full animate-pulse opacity-70"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${Math.random() * 5 + 2}s`,
//             }}
//           ></div>
//         ))}
//       </div>
      
//       {/* Main banner container */}
//       <div className="relative p-6 backdrop-filter backdrop-blur-sm">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h2 className="text-white text-3xl font-bold tracking-tight">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
//                 Featured Pokémon Cards
//               </span>
//             </h2>
//             <p className="text-gray-300 text-lg">Exclusive deals on rare collectibles</p>
//           </div>
//           <button className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors transform hover:scale-105 shadow-lg">
//             See all deals
//           </button>
//         </div>

//         {/* Featured card showcase */}
//         <div className="relative h-96 overflow-hidden">
//           <div 
//             className="flex transition-transform duration-500 ease-in-out h-full" 
//             style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//           >
//             {cards.map((card, index) => (
//               <div 
//                 key={card.id} 
//                 className="min-w-full flex justify-between items-center px-4"
//               >
//                 {/* Card image with glow effect */}
//                 <div className="relative w-1/2 h-80 transform -rotate-6 hover:rotate-0 transition-all duration-300">
//                   <div className="absolute inset-0 rounded-xl  "></div>
//                   <img 
//                     src={card.image} 
//                     alt={card.name} 
//                     className="relative w-full h-full object-contain rounded-xl z-10"
//                   />
//                 </div>
                
//                 {/* Card info */}
//                 <div className="w-1/2 pl-10">
//                   <div className={`inline-block ${typeColors[card.types[0]]} text-white px-4 py-1 rounded-full text-sm font-bold mb-2`}>
//                     {card.types[0]} Type
//                   </div>
                  
//                   <h3 className="text-white font-bold text-4xl mb-2">{card.name}</h3>
//                   <p className="text-gray-300 mb-4">HP {card.hp}</p>
                  
//                   <div className="flex items-center mb-4">
//                     <div className="flex text-yellow-400 text-xl">
//                       {"★".repeat(Math.floor(card.reviews.rating))}
//                       {card.reviews.rating % 1 >= 0.5 ? "½" : ""}
//                     </div>
//                     <span className="text-gray-400 ml-2">({card.reviews.totalReviews} reviews)</span>
//                   </div>
                  
//                   <p className="text-gray-300 mb-4">
//                     {card.attacks[0].name}: {card.attacks[0].damage} damage
//                   </p>
                  
//                   <div className="flex items-center">
//                     <div className="text-green-400 font-bold text-3xl mr-4">${card.price.toFixed(2)}</div>
//                     <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors transform hover:scale-105 shadow-lg">
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         {/* Custom navigation dots */}
//         <div className="flex justify-center mt-6">
//           {cards.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`mx-1 w-3 h-3 rounded-full transition-all duration-300 ${
//                 currentSlide === index 
//                   ? 'bg-white w-6' 
//                   : 'bg-gray-500 bg-opacity-50 hover:bg-gray-400'
//               }`}
//             ></button>
//           ))}
//         </div>
        
//         {/* Side navigation arrows */}
//         <button 
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
//           onClick={() => setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length)}
//         >
//           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <button 
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
//           onClick={() => setCurrentSlide((prev) => (prev + 1) % cards.length)}
//         >
//           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Banner;




