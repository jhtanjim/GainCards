import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import { getAllPokemonData } from "../../../api/pokemondata";
import PokemonCard from "../../Shared/Pokaemon/PokaemonCard";
import { Link } from "react-router-dom";

const PokemonCardsCollection = () => {
  const {
    data: pokemons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemons"],
    queryFn: getAllPokemonData,
  });

  if (isLoading) {
    return (
      <div className="py-20 bg-black">
        <div className="container mx-auto px-6 text-center">
          <div className="text-white text-xl mb-4">
            Loading amazing cards...
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 bg-black">
        <div className="container mx-auto px-6 text-center">
          <div className="text-red-400 text-xl">
            Error loading cards. Please try again.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 text-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Explore the Pokemon Cards Collection
          </h2>
          <p className="text-lg md:text-xl  max-w-2xl mx-auto">
            Browse the latest listings from top sellers — from rare holos to
            classic base sets.
          </p>
        </div>

        {/* Marquee Scrolling Cards - Using API data */}
        <div className="relative">
          <div className="overflow-hidden">
            <Marquee
              gradient={true}
              gradientColor={[0, 0, 0]}
              speed={40}
              pauseOnHover
            >
              {pokemons.map((pokemon, index) => (
                <div
                  key={`${pokemon.id}-${index}`}
                  className="mx-4 w-72 md:w-80 flex-shrink-0 hover:scale-105 transition-transform duration-300"
                >
                  <PokemonCard pokemon={pokemon} isFavorite={false} />
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link to={"/pokemon"}>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              View All Cards
            </button>
          </Link>
        </div>

        {/* Stats Section - Using actual data */}
        {/* <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className=" border  rounded-2xl p-6 shadow-md backdrop-blur">
            <div className="text-3xl font-bold text-blue-400 mb-2">{pokemons.length}+</div>
            <div className="">Total Cards</div>
          </div>
          <div className=" border  rounded-2xl p-6 shadow-md backdrop-blur">
            <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
            <div className="">Authenticity Rate</div>
          </div>
          <div className=" border  rounded-2xl p-6 shadow-md backdrop-blur">
            <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
            <div className="">Support Available</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PokemonCardsCollection;
