"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import bannerBg from "../../../assets/banner/hero.webp"

const Banner = () => {
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
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % cards.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isHovering])

  return (
    <div className="relative bg-black min-h-screen overflow-hidden text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bannerBg})` }}
      />
      <div className="absolute inset-0 bg-black/0"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-10 md:px-16 lg:px-20 py-20 min-h-screen flex flex-col md:flex-row items-center justify-center gap-12">
  {/* Text Content */}
  <motion.div
  className="w-full md:w-1/2 md:max-w-xl text-center md:text-left"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <h1 className="text-6xl sm:text-5xl md:text-7xl font-extrabold leading-tight text-white">
    <span className="text-amber-400">Gain</span>{" "}
    <span className="text-amber-500">Cards</span>
  </h1>
  <h2 className="text-lg sm:text-xl md:text-2xl text-amber-300 mt-5 font-semibold">
    Master Strategy. Collect Glory.
  </h2>
  <p className="text-gray-300 mt-4 mb-6 text-sm sm:text-base">
    Immerse yourself in tactical gameplay and stunning card art. Build your deck, challenge opponents, and rise to the top!
  </p>
  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
    <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full shadow-md transition-all duration-300 flex items-center gap-2">
      Sign Up Now <ChevronRight className="h-4 w-4" />
    </button>
    <button className="px-6 py-3 border border-amber-500 text-amber-500 hover:bg-amber-100/10 rounded-full transition-all">
      Learn More
    </button>
  </div>
</motion.div>


  {/* Card Display */}
  <motion.div
    className="w-full md:w-1/2"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
  >
    <div className="relative h-[400px] w-full max-w-[300px] mx-auto">
      {/* card map remains the same */}
      <div className="relative h-[400px] mx-auto">
            {cards.map((card, index) => {
              const glowColor =
                card.types[0] === "fire"
                  ? "rgba(239, 68, 68, 0.5)"
                  : card.types[0] === "grass"
                  ? "rgba(34, 197, 94, 0.5)"
                  : card.types[0] === "lightning"
                  ? "rgba(234, 179, 8, 0.5)"
                  : card.types[0] === "psychic"
                  ? "rgba(168, 85, 247, 0.5)"
                  : "rgba(255, 255, 255, 0.3)"

              return (
                <motion.div
  key={card.id}
  className="absolute w-[220px] h-[320px] rounded-xl overflow-hidden shadow-xl"
  style={{
    zIndex: index === activeCardIndex ? 10 : 5 - Math.abs(index - activeCardIndex),
    transformOrigin: "center bottom",
  }}
  animate={{
    rotateY: index === activeCardIndex ? 0 : index < activeCardIndex ? -5 : 5,
    x: index === activeCardIndex ? 0 : index < activeCardIndex ? -30 : 30,
    scale: index === activeCardIndex ? 1 : 0.9,
    opacity: index === activeCardIndex ? 1 : 0.6,
  }}
  transition={{ duration: 0.5 }}
>
  <div className="relative w-full h-full group cursor-pointer">
    <img src={card.image} alt={card.name} className="w-full h-full object-cover" />

    {/* Solid background overlay instead of gradient */}
    <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h3 className="text-white font-bold text-lg">{card.name}</h3>
      <p className="text-amber-300 text-sm">{card.rarity} • {card.collection}</p>
      <div className="flex items-center text-sm mt-1">
        <span className="text-amber-400">★ {card.reviews.rating}</span>
        <span className="text-gray-300 ml-1">({card.reviews.totalReviews})</span>
      </div>
    </div>

    {/* Glow on hover - dynamic by type */}
    <div
      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ boxShadow: `0 0 30px 5px ${glowColor}` }}
    />
  </div>
</motion.div>

              )
            })}
            {/* Dots */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCardIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeCardIndex ? "bg-amber-400 w-3" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
    </div>
  </motion.div>
</div>

    </div>
  )
}

export default Banner
