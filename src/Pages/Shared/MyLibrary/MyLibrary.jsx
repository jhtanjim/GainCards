import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Library, Loader2, LogIn, Search } from "lucide-react";
import { getAllFavoritePokemon } from "../../../api/pokemondata";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import PokemonCard from "../Pokemon/PokemonCard";

const MyLibrary = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch favorite Pokemon data only if user is logged in
  const {
    data: favorites = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: getAllFavoritePokemon,
    enabled: !!isAuthenticated,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Not logged in state
  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 min-h-screen"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <Library className="w-10 h-10 text-blue-600" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Pokémon Library
          </h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="max-w-md mx-auto mt-20"
        >
          <div className="text-center py-12 px-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl border border-blue-100">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <LogIn className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Welcome to Your Library!
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Log in to start building your personal Pokémon collection and
              track your favorites.
            </p>
            <motion.button
              onClick={() =>
                navigate("/signin", { state: { from: "/myLibrary" } })
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Log In to Continue
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 min-h-screen"
      >
        <div className="flex items-center gap-3 mb-8">
          <Library className="w-10 h-10 text-blue-600" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Pokémon Library
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-16 h-16 text-blue-600" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mt-6 text-lg"
          >
            Loading your favorite Pokémon...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  // Error state
  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 min-h-screen"
      >
        <div className="flex items-center gap-3 mb-8">
          <Library className="w-10 h-10 text-blue-600" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Pokémon Library
          </h2>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto mt-20"
        >
          <div className="text-center py-12 px-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl border border-red-100">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-4xl font-bold">!</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't load your favorite Pokémon. Please try again later.
            </p>
            <motion.button
              onClick={() => window.location.reload()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 min-h-screen"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
      >
        <div className="flex items-center gap-3">
          <Library className="w-10 h-10 text-blue-600" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Pokémon Library
          </h2>
        </div>
        {favorites.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full"
          >
            <p className="text-gray-700 font-semibold">
              {favorites.length}{" "}
              {favorites.length === 1 ? "Pokémon" : "Pokémon"} collected
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Empty State */}
      <AnimatePresence mode="wait">
        {favorites.length === 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring" }}
            className="max-w-md mx-auto mt-20"
          >
            <div className="text-center py-12 px-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-xl border border-gray-200">
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Search className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Your library is empty
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Start exploring and add your favorite Pokémon to build your
                personal collection!
              </p>

              <motion.button
                onClick={() => navigate("/pokemon")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Browse Pokémon
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pokemon Grid */}
      {favorites.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {favorites.map((pokemon, index) => (
            <motion.div
              key={pokemon.id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="transform transition-all duration-300"
            >
              <PokemonCard pokemon={pokemon} isFavorite={true} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyLibrary;
