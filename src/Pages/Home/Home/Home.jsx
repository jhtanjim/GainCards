import React from 'react'
import Pokaemon from '../../Shared/Pokaemon/Pokaemon'
import Banner from '../Banner/Banner'
import Banner1 from '../Banner/Banner1'
import About from '../About/About'

const Home = () => {
  return (
    <div className=''>
      <Banner className="bg-black" />
      <Banner1/>
      <About/>
      <Pokaemon/>
    </div>
  )
}

export default Home
// import { Heart, Activity } from "lucide-react"

// const typeIcons = {
//   normal: "⚪",
//   fire: "🔥",
//   water: "💧",
//   electric: "⚡",
//   grass: "🌿",
//   ice: "❄️",
//   fighting: "👊",
//   poison: "☠️",
//   ground: "🌍",
//   flying: "🦅",
//   psychic: "🔮",
//   bug: "🐛",
//   rock: "🪨",
//   ghost: "👻",
//   dragon: "🐉",
//   dark: "🌑",
//   steel: "⚙️",
//   fairy: "✨",
//   lightning: "⚡", // Added for compatibility with your JSON
// }

// const typeColors = {
//   normal: "bg-gray-200",
//   fire: "bg-red-100",
//   water: "bg-blue-100",
//   electric: "bg-yellow-100",
//   grass: "bg-green-100",
//   ice: "bg-blue-50",
//   fighting: "bg-red-200",
//   poison: "bg-purple-100",
//   ground: "bg-yellow-200",
//   flying: "bg-indigo-100",
//   psychic: "bg-pink-100",
//   bug: "bg-lime-100",
//   rock: "bg-amber-100",
//   ghost: "bg-indigo-200",
//   dragon: "bg-violet-100",
//   dark: "bg-gray-300",
//   steel: "bg-slate-200",
//   fairy: "bg-pink-50",
//   lightning: "bg-yellow-100", // Added for compatibility with your JSON
// }

// export default function Home() {
//   // Sample card data
//   const featured = {
//     name: "Gengar",
//     hp: "130",
//     types: ["Psychic"],
//     attacks: [
//       {
//         name: "Shadow Ball",
//         cost: ["Psychic", "Colorless"],
//         damage: "70",
//         text: "Discard an Energy attached to this Pokémon.",
//       },
//     ],
//     price: 35.99,
//     reviews: {
//       rating: 4.7,
//       totalReviews: 210,
//     },
//   }

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
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Banner that matches logo style */}
      

//       {/* Card filters */}
//       <div className="px-4 py-6 bg-white shadow-md">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-2xl font-bold mb-4">Browse Cards</h2>
//           <div className="flex flex-wrap gap-2">
//             <button className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-300">
//               All Cards
//             </button>
//             {Object.keys(typeIcons)
//               .slice(0, 8)
//               .map((type) => (
//                 <button
//                   key={type}
//                   className="px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 >
//                   <span className="mr-1">{typeIcons[type]}</span> {type}
//                 </button>
//               ))}
//           </div>
//         </div>
//       </div>

//       {/* Card grid */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {cards.map((card) => (
//             <div
//               key={card.id}
//               className={`${typeColors[card.types[0].toLowerCase()]} rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg`}
//             >
//               <div className="p-4 flex justify-center relative">
//                 <span className="absolute top-2 right-2 text-sm font-mono font-semibold">{card.id}</span>
//                 <div className="h-36 w-36 bg-white/30 rounded-full flex items-center justify-center">
//                   <span className="text-6xl">{typeIcons[card.types[0].toLowerCase()]}</span>
//                 </div>
//               </div>

//               <div className="bg-white p-4 rounded-t-2xl relative -mt-4">
//                 <h2 className="text-xl font-bold text-gray-800 capitalize mb-2">{card.name}</h2>

//                 <div className="flex gap-2 mb-4">
//                   {card.types.map((type) => (
//                     <span
//                       key={type}
//                       className="flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize bg-gray-100"
//                     >
//                       {typeIcons[type.toLowerCase()]}
//                       <span className="ml-1">{type}</span>
//                     </span>
//                   ))}
//                 </div>

//                 <div className="grid grid-cols-2 gap-3 mb-3">
//                   <div className="flex items-center">
//                     <Heart className="w-4 h-4 text-red-500 mr-1" />
//                     <span className="text-sm font-medium">HP: {card.hp}</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Activity className="w-4 h-4 text-blue-500 mr-1" />
//                     <span className="text-sm font-medium">DMG: {card.attacks[0].damage}</span>
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <div className="flex justify-between text-xs font-medium mb-1">
//                     <span>Rating</span>
//                     <span>
//                       {card.reviews.rating}/5 ({card.reviews.totalReviews} reviews)
//                     </span>
//                   </div>
//                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-gradient-to-r from-purple-500 to-red-500"
//                       style={{ width: `${(card.reviews.rating / 5) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center mt-4">
//                   <span className="text-lg font-bold text-purple-700">${card.price}</span>
//                   <button className="px-3 py-1 bg-gradient-to-r from-purple-600 to-red-500 text-white rounded-full text-sm font-medium hover:from-purple-700 hover:to-red-600">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-8 flex justify-center">
//           <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-red-500 text-white font-medium rounded-md hover:bg-purple-700 transition-colors shadow-md">
//             Load More Cards
//           </button>
//         </div>
//       </div>

//       {/* Newsletter section */}
//       <div className="bg-gradient-to-r from-purple-900 to-black py-12">
//         <div className="max-w-2xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">Join the Collectors Club</h2>
//           <p className="text-gray-300 mb-6">Stay updated on new releases, exclusive offers, and trading events</p>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//             <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg font-medium text-white hover:from-red-600 hover:to-purple-700">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-400 py-8">
//         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-xl font-bold text-white mb-4">GAIN CARDS</h3>
//             <p className="mb-4">Your premier destination for Pokémon card collectors, traders, and enthusiasts.</p>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Shop
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Card Database
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-white transition-colors">
//                   Trading Forum
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
//             <p className="mb-2">Email: info@gaincards.com</p>
//             <p className="mb-4">Phone: (555) 123-4567</p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-white hover:text-purple-400 transition-colors">
//                 <span className="sr-only">Facebook</span>
//                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path
//                     fillRule="evenodd"
//                     d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </a>
//               <a href="#" className="text-white hover:text-purple-400 transition-colors">
//                 <span className="sr-only">Instagram</span>
//                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path
//                     fillRule="evenodd"
//                     d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </a>
//               <a href="#" className="text-white hover:text-purple-400 transition-colors">
//                 <span className="sr-only">Twitter</span>
//                 <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                   <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-gray-800 text-center">
//           <p>&copy; 2025 GAIN CARDS. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   )
// }

