"use client"
import { useState, useEffect } from "react"
import bannerBg from "../../../assets/banner/hero.webp"
import { Link } from "react-router-dom"
import useUserRole from "../../../Hooks/useUserRole"

const Banner = () => {
  const [currentCard, setCurrentCard] = useState(0)
  const {  isVendor,isAdmin } = useUserRole();

  const cardImages = [
    "https://i.pinimg.com/736x/0d/72/4f/0d724feed9c556e7e1d2fd7d291e7cd6.jpg",
    "https://i.pinimg.com/736x/f3/d1/9c/f3d19c38c17a56879685781fc0a7c001.jpg",
    "https://i.pinimg.com/736x/8c/90/cb/8c90cb92f0b22448bc640d63ccff94dd.jpg"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cardImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative bg-black min-h-screen overflow-hidden text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${bannerBg})` }}
      />

      {/* Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-16 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  Buy. Sell. Donate.
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-200">
                Catch 'Em All – Together.
              </h2>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Join the ultimate Pokémon card marketplace. Discover rare finds, sell your collection with ease, or spread the love by donating to fellow collectors.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
             <Link to="/pokemon"> <button className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-blue-700 hover:to-purple-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg">
                Shop Now!
              </button></Link>



              {!isVendor && !isAdmin && (
              <Link to={"/vendorSignup"}>
              <button className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
                Sell your cards
              </button>
              </Link>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[28rem]">
              {cardImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 transform ${
                    index === currentCard
                      ? "rotate-0 scale-110 z-30"
                      : index === (currentCard + 1) % 3
                      ? "rotate-6 scale-100 z-20 translate-x-4 translate-y-2"
                      : "rotate-12 scale-90 z-10 translate-x-8 translate-y-4"
                  }`}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl hover:shadow-yellow-500/25 transition-shadow duration-300">
                    <img
                      src={image}
                      alt={`Pokemon Card ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent rounded-xl blur-xl scale-110 animate-pulse" />
            </div>

            {/* Indicators */}
            <div className="absolute bottom-2 sm:bottom-4 flex space-x-2">
              {cardImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCard(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentCard
                      ? "bg-yellow-400 scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  )
}

export default Banner
