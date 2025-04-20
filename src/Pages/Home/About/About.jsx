import React from 'react'
import backgroundImage from "../../../assets/aboutBg/aboutBg.png"
import { Info, BookOpen, Users, ChevronRight } from 'lucide-react';
import { Clock } from 'lucide-react'

const About = () => {
  // Combine the images into a proper URL array since the provided URLs were jumbled
  const backgroundImages = [
    "https://i.pinimg.com/736x/cb/a5/24/cba5241c4db2faa1cc1cd7c092ade9a2.jpg",
    "https://i.pinimg.com/736x/96/5a/3e/965a3e4b2bb8cf540826439520766052.jpg",
    "https://i.pinimg.com/736x/0f/cc/5e/0fcc5e2344717cd657051a59348ce566.jpg"
  ];

  return (


 
<div className="relative min-h-screen text-white">
<div className="relative min-h-screen">
      {/* Dark textured background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 py-12">
        {/* What's Gain Cards Section */}
        <section className="mb-24">
          <div className="max-w-screen-xl mx-auto px-8 lg:px-6">
            <div className="flex justify-center mb-12">
              <h2 className="text-5xl font-bold text-yellow-400 relative"
                style={{ fontFamily: "PokemonSolid" }}>
                What's Gain Cards?
                {/* Decorative elements */}
                <span className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-10 h-1 bg-yellow-500"></span>
                <span className="absolute -right-12 top-1/2 transform -translate-y-1/2 w-10 h-1 bg-yellow-500"></span>
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
              {/* Left cards display */}
              <div className="lg:w-1/3 flex justify-center">
                <div className="relative perspective-card-container">
                  {/* Main visible card */}
                  <div className="card-glow relative transform rotate-3 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-50 rounded-lg blur-sm"></div>
                    <img
                      src="https://i.pinimg.com/736x/cb/a5/24/cba5241c4db2faa1cc1cd7c092ade9a2.jpg"
                      alt="Pikachu card"
                      className="relative z-10 rounded-lg border-2 border-yellow-400 w-64"
                    />
                  </div>
                  
                  {/* Background cards (stacked) */}
                  <div className="absolute -top-4 -right-8 transform -rotate-12 z-0 opacity-70 shadow-lg w-56">
                    <img
                      src="https://i.pinimg.com/736x/96/5a/3e/965a3e4b2bb8cf540826439520766052.jpg"
                      alt="Card background"
                      className="rounded-lg border-2 border-red-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Center text content */}
              <div className="lg:w-1/3">
                <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-xl border border-yellow-600/30">
                  <p className="text-gray-200 mb-6 text-lg leading-relaxed">
                    Gain Cards is the premier destination for Pokémon card enthusiasts. Our platform offers a comprehensive
                    collection of Pokémon cards spanning all generations, from the classic Base Set to the latest expansions.
                  </p>
                  <p className="text-gray-200 mb-6 text-lg leading-relaxed">
                    Whether you're a seasoned collector looking for rare finds or just starting your Pokémon journey,
                    our platform provides tools to discover, organize, and trade your favorite cards.
                  </p>
                  <div className="text-center mt-8">
                    <button className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold transition-colors border border-yellow-500 py-2 px-4 rounded-md hover:bg-yellow-500/10">
                      <Info size={16} /> 
                      Learn more about our story 
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Right cards display */}
              <div className="lg:w-1/3 flex justify-center">
                <div className="relative perspective-card-container">
                  {/* Main visible card */}
                  <div className="card-glow relative transform -rotate-3 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-50 rounded-lg blur-sm"></div>
                    <img
                      src="https://i.pinimg.com/736x/0f/cc/5e/0fcc5e2344717cd657051a59348ce566.jpg"
                      alt="Gengar card"
                      className="relative z-10 rounded-lg border-2 border-purple-400 w-64"
                    />
                  </div>
                  
                  {/* Background cards (stacked) */}
                  <div className="absolute -top-4 -left-8 transform rotate-12 z-0 opacity-70 shadow-lg w-56">
                    <img
                      src="https://images.pokemontcg.io/swsh1/1.png"
                      alt="Card background"
                      className="rounded-lg border-2 border-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Play Section */}
        <section className="mb-24 relative">
          {/* Decorative gear */}
          <div className="absolute top-0 right-16 w-24 h-24 opacity-20">
            <svg viewBox="0 0 100 100" className="text-yellow-500 fill-current w-full h-full animate-spin-slow">
              <path d="M97.6,55.7V44.3l-13.2-2.4c-0.8-2.7-1.8-5.3-3.1-7.7l7.6-11.3l-8-8L69.5,22.5c-2.4-1.3-5-2.3-7.7-3.1L59.4,6.2H48.1l-2.4,13.2c-2.7,0.8-5.3,1.8-7.7,3.1L26.6,15l-8,8l7.6,11.3c-1.3,2.4-2.3,5-3.1,7.7L10,44.3V55.7l13.2,2.4c0.8,2.7,1.8,5.3,3.1,7.7L18.6,77.1l8,8l11.3-7.6c2.4,1.3,5,2.3,7.7,3.1l2.4,13.2h11.3l2.4-13.2c2.7-0.8,5.3-1.8,7.7-3.1l11.3,7.6l8-8l-7.6-11.3c1.3-2.4,2.3-5,3.1-7.7L97.6,55.7z M50,65.6c-8.5,0-15.3-6.9-15.3-15.3s6.9-15.3,15.3-15.3s15.3,6.9,15.3,15.3S58.5,65.6,50,65.6z"/>
            </svg>
          </div>
          {/* Decorative gear */}
          <div className="absolute bottom-16 left-12 w-16 h-16 opacity-20">
            <svg viewBox="0 0 100 100" className="text-yellow-500 fill-current w-full h-full animate-spin-slow-reverse">
              <path d="M97.6,55.7V44.3l-13.2-2.4c-0.8-2.7-1.8-5.3-3.1-7.7l7.6-11.3l-8-8L69.5,22.5c-2.4-1.3-5-2.3-7.7-3.1L59.4,6.2H48.1l-2.4,13.2c-2.7,0.8-5.3,1.8-7.7,3.1L26.6,15l-8,8l7.6,11.3c-1.3,2.4-2.3,5-3.1,7.7L10,44.3V55.7l13.2,2.4c0.8,2.7,1.8,5.3,3.1,7.7L18.6,77.1l8,8l11.3-7.6c2.4,1.3,5,2.3,7.7,3.1l2.4,13.2h11.3l2.4-13.2c2.7-0.8,5.3-1.8,7.7-3.1l11.3,7.6l8-8l-7.6-11.3c1.3-2.4,2.3-5,3.1-7.7L97.6,55.7z M50,65.6c-8.5,0-15.3-6.9-15.3-15.3s6.9-15.3,15.3-15.3s15.3,6.9,15.3,15.3S58.5,65.6,50,65.6z"/>
            </svg>
          </div>

          <div className="max-w-screen-xl mx-auto px-8 lg:px-6">
            <div className="flex justify-center mb-12">
              <h2 className="text-5xl font-bold text-yellow-400 relative"
                style={{ fontFamily: "PokemonSolid" }}>
                How to Play?
                {/* Decorative elements */}
                <span className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-10 h-1 bg-yellow-500"></span>
                <span className="absolute -right-12 top-1/2 transform -translate-y-1/2 w-10 h-1 bg-yellow-500"></span>
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
              {/* Character image */}
              <div className="lg:w-1/3 hidden lg:block">
                <img
                  src="https://i.pinimg.com/736x/d7/97/c3/d797c314abffff57583671c28cb473ac.jpg"
                  alt="Pokémon trainer character"
                  className="max-w-full h-auto opacity-90"
                />
              </div>

              {/* Center text content */}
              <div className="lg:w-1/3">
                <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg shadow-xl border border-yellow-600/30">
                  <p className="text-gray-200 mb-6 text-lg leading-relaxed">
                    New to Pokémon cards? Our comprehensive guide will help you understand the basics of deck-building, 
                    card types, and battle strategies. Learn how to identify valuable cards, understand card rarities, 
                    and build competitive decks.
                  </p>
                  <p className="text-gray-200 mb-6 text-lg leading-relaxed">
                    Our experienced community members regularly publish tips and tricks to help you master the game. 
                    From beginner tutorials to advanced strategies, we have resources for players at all levels.
                  </p>
                  <div className="text-center mt-8">
                    <button className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-md transition-colors">
                      <BookOpen size={18} />
                      View our game guides
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Video section */}
              <div className="lg:w-1/3">
                <div className="relative">
                  {/* Video frame with glow */}
                  <div className="card-glow relative shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-40 rounded-lg blur-md"></div>
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg relative z-10 border border-yellow-500/30">
                      <div className="relative aspect-video">
                        <img 
                          src="https://i.pinimg.com/736x/cf/96/22/cf9622ee0caa6c4ee3987b3892789808.jpg" 
                          alt="How to play Pokémon card game" 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <button 
                            className="w-16 h-16 bg-yellow-500 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                            aria-label="Play tutorial video"
                          >
                            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-gray-900 ml-1"></div>
                          </button>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center bg-gray-900 border-t border-gray-700">
                        <span className="text-sm text-yellow-300 font-medium">Beginner's Guide to Pokémon TCG</span>
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Clock size={14} /> 12:34
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Community Section */}
        <section className="relative">
          <div className="max-w-screen-xl mx-auto px-8 lg:px-6">
            <div className="relative rounded-lg p-8 overflow-hidden">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20"></div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <h2 className="text-5xl font-bold text-yellow-400 mb-8" 
                  style={{ fontFamily: "PokemonSolid" }}>
                  Join Our Community
                </h2>
                <p className="text-gray-200 max-w-2xl mx-auto mb-10 text-lg">
                  Connect with thousands of Pokémon card enthusiasts, trade cards, participate in discussions, 
                  and stay updated on the latest releases and events.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-bold py-3 px-10 rounded-md transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-yellow-500/30 flex items-center justify-center gap-2">
                    <Users size={18} />
                    Sign Up Now
                  </button>
                  <button className="bg-transparent border-2 border-yellow-500 hover:border-yellow-400 text-yellow-400 hover:text-yellow-300 font-bold py-3 px-10 rounded-md transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                    <Info size={18} />
                    Learn More
                  </button>
                </div>
                
                {/* Decorative Map Element */}
                <div className="mt-16 relative">
                  <div className="card-glow relative shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-teal-500/30 opacity-50 rounded-lg blur-md"></div>
                    <img 
                      src="/api/placeholder/800/400" 
                      alt="Pokémon world map" 
                      className="relative z-10 w-full h-auto rounded-lg border border-yellow-500/30 shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  {/* Background layer with reduced opacity */}
  <div 
    className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  ></div>

  {/* Main content layer */}
  <div className="relative z-10">
    <div>
    <section className="relative h-96 overflow-hidden">
        <img 
          src={backgroundImages[0]} 
          alt="Pokemon background" 
          className="absolute w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Gain Cards
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white drop-shadow-md">
              Your premier destination for Pokémon card collectors
            </p>
          </div>
        </div>
      </section>

      {/* What's Gain Cards Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-400 mb-2">What's Gain Cards?</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300">
                Gain Cards is the premier destination for Pokémon card enthusiasts. Our platform offers a comprehensive 
                collection of Pokémon cards spanning all generations, from the classic Base Set to the latest expansions.
              </p>
              <p className="text-lg text-gray-300">
                Whether you're a seasoned collector looking for rare finds or just starting your Pokémon journey,
                our platform provides tools to discover, organize, and trade your favorite cards.
              </p>
              <button className="mt-6 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                <Info size={18} /> 
                Learn more about our story 
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="relative">
              <div className="relative z-10 transform hover:scale-105 transition duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 rounded-lg blur opacity-75"></div>
                <img 
                  src="https://images.pokemontcg.io/smp/SM212.png" 
                  alt="Pikachu card" 
                  className="relative z-10 rounded-lg shadow-2xl w-full max-w-md mx-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-2/3 h-full z-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-500 to-red-400 rounded-lg blur opacity-75"></div>
                <img 
                  src="https://images.pokemontcg.io/sm9/53.png" 
                  alt="Gengar card" 
                  className="relative shadow-xl rounded-lg rotate-6 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-16 px-4 ">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-400 mb-2">How to Play?</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={backgroundImages[1]} 
                alt="Pokemon gameplay" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <button className="w-16 h-16 bg-yellow-500 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-gray-900 ml-1"></div>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-300">
                New to Pokémon cards? Our comprehensive guide will help you understand the basics of deck-building, 
                card types, and battle strategies. Learn how to identify valuable cards, understand card rarities, 
                and build competitive decks.
              </p>
              <p className="text-lg text-gray-300">
                Our experienced community members regularly publish tips and tricks to help you master the game. 
                From beginner tutorials to advanced strategies, we have resources for players at all levels.
              </p>
              <button className="mt-4 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-md transition-colors">
                <BookOpen size={18} />
                View our game guides
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Join Community Section */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={backgroundImages[2]} 
            alt="Pokemon background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-400 mb-2">Join Our Community</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
          </div>

          <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg border border-yellow-500/20 shadow-lg backdrop-blur-sm">
            <p className="text-lg text-gray-200 text-center mb-8">
              Connect with thousands of Pokémon card enthusiasts, trade cards, participate in discussions, 
              and stay updated on the latest releases and events.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={24} className="text-gray-900" />
                </div>
                <h3 className="text-xl font-bold mb-2">10,000+</h3>
                <p className="text-gray-400">Active Collectors</p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">250,000+</h3>
                <p className="text-gray-400">Cards Traded</p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">5,000+</h3>
                <p className="text-gray-400">Rare Collections</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-yellow-500/30 flex items-center justify-center gap-2">
                <Users size={18} />
                Sign Up Now
              </button>
              <button className="bg-transparent border-2 border-yellow-500 hover:border-yellow-400 text-yellow-400 hover:text-yellow-300 font-bold py-3 px-8 rounded-md transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <Info size={18} />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Gain Cards. All Rights Reserved.</p>
          <p className="mt-2">Pokémon and Pokémon character names are trademarks of Nintendo.</p>
        </div>
      </footer>
    </div>
    </div>
    </div>
  );
};

export default About;