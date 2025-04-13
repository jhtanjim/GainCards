import React from 'react';
import { StarIcon } from 'lucide-react';

const About = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-20" style={{backgroundImage: "url('https://images.pexels.com/photos/11854580/pexels-photo-11854580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", backgroundSize: "cover", backgroundPosition: "center"}}>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left side with cards */}
          <div className="flex-1 relative perspective-1000">
            {cards.map((card, index) => (
              <div 
                key={card.id}
                className="absolute shadow-xl rounded-lg transform transition-all duration-300"
                style={{
                  transform: `translateX(${index * 30}px) translateZ(${-index * 10}px) rotateY(${-5 + index * 2}deg)`,
                  zIndex: cards.length - index
                }}
              >
                <img 
                  src={card.image} 
                  alt={card.name} 
                  className="w-64 h-auto rounded-lg" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-sm rounded-b-lg">
                  <div className="flex justify-between items-center">
                    <span>{card.name}</span>
                    <span className="text-yellow-400">${card.price}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          size={12} 
                          className={`${i < Math.floor(card.reviews.rating) ? 'text-yellow-400' : 'text-gray-400'} ${i === Math.floor(card.reviews.rating) && card.reviews.rating % 1 > 0 ? 'fill-yellow-400' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-xs">{card.reviews.totalReviews} reviews</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right side with text */}
          <div className="flex-1 text-white">
            <h1 className="text-5xl font-bold mb-6 text-yellow-300">What's PokéCollect?</h1>
            <p className="text-xl mb-4">
              PokéCollect is a blend of Collectible Card Game and Digital Collection platform for Pokémon enthusiasts.
            </p>
            <p className="text-lg mb-6">
              It's currently available for PC, Mac, and mobile devices, allowing collectors to buy, trade, and showcase their rare Pokémon cards.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg flex items-center transition-all">
              <span className="mr-2">LEARN MORE ABOUT THE GAME</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

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
];