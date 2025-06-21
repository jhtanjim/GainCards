import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Filter, Gift, Grid, List, Star } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllPokemonData } from "../../../api/pokemondata";
import PokemonCard from "./PokemonCard";
import Swal from "sweetalert2";

const Pokemon = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get filter from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const urlFilter = urlParams.get('filter');
  
  const [filter, setFilter] = useState(urlFilter || "all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Update filter when URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlFilter = urlParams.get('filter');
    if (urlFilter && (urlFilter === "donation" || urlFilter === "sale" || urlFilter === "all")) {
      setFilter(urlFilter);
    }
  }, [location.search]);

  // Update URL when filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    const urlParams = new URLSearchParams(location.search);
    if (newFilter === "all") {
      urlParams.delete('filter');
    } else {
      urlParams.set('filter', newFilter);
    }
    const newSearch = urlParams.toString();
    navigate({
      pathname: location.pathname,
      search: newSearch ? `?${newSearch}` : ''
    }, { replace: true });
  };

  const {
    data: pokemons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemons"],
    queryFn: getAllPokemonData,
  });

  const processedPokemons = React.useMemo(() => {
    if (!pokemons || pokemons.length === 0) return [];

    let filtered = [...pokemons];

    if (filter === "donation") {
      filtered = filtered.filter((pokemon) => pokemon.isDonation);
    } else if (filter === "sale") {
      filtered = filtered.filter((pokemon) => !pokemon.isDonation);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((pokemon) =>
        (pokemon.title || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "name":
          return a.title.localeCompare(b.title);
        case "recent":
        default:
          return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });

    return filtered;
  }, [pokemons, filter, sortBy, searchQuery]);

  const donationCount = React.useMemo(
    () => pokemons.filter((p) => p.isDonation).length,
    [pokemons]
  );
  const saleCount = React.useMemo(
    () => pokemons.filter((p) => !p.isDonation).length,
    [pokemons]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] px-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-lg sm:text-xl text-gray-700">Loading Pokemon cards...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Error Loading Cards",
      text: "Failed to load Pokemon cards",
      confirmButtonColor: "#ef4444",
    });

    return (
      <div className="text-center mt-6 sm:mt-10 bg-red-50 p-6 sm:p-8 rounded-lg max-w-sm sm:max-w-lg mx-auto">
        <div className="text-red-600 mb-4 text-2xl sm:text-3xl">⚠️</div>
        <h2 className="text-lg sm:text-xl font-semibold text-red-700 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-sm sm:text-base text-red-600 mb-4">Failed to load Pokemon cards</p>
        <button
          onClick={() => queryClient.invalidateQueries(["pokemons"])}
          className="px-4 sm:px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg max-w-sm sm:max-w-lg mx-auto mt-6 sm:mt-10 px-4">
        <div className="text-4xl sm:text-6xl mb-4">📦</div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
          No Pokemon cards found
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          There are currently no Pokemon cards available in the collection.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-screen-2xl">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="w-full lg:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Pokemon Collection</h1>
            <p className="text-blue-100 text-sm sm:text-base">
              {filter === "donation" ? "Browse donated cards - just pay shipping!" :
               filter === "sale" ? "Cards available for purchase" :
               "Discover amazing Pokemon cards and donations"}
            </p>
          </div>
          <div className="flex flex-row sm:flex-row justify-between sm:justify-start gap-2 sm:gap-4 w-full lg:w-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center flex-1 sm:flex-none min-w-0">
              <div className="text-lg sm:text-2xl font-bold truncate">{pokemons.length}</div>
              <div className="text-xs sm:text-sm text-blue-100">Total Cards</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center flex-1 sm:flex-none min-w-0">
              <div className="text-lg sm:text-2xl font-bold text-green-300 truncate">
                {saleCount}
              </div>
              <div className="text-xs sm:text-sm text-blue-100">For Sale</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center flex-1 sm:flex-none min-w-0">
              <div className="text-lg sm:text-2xl font-bold text-pink-300 truncate">
                {donationCount}
              </div>
              <div className="text-xs sm:text-sm text-blue-100">Donations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls: Filter / Sort / Search / View */}
      <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="space-y-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange("all")}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center ${
                filter === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden xs:inline">All Cards</span>
              <span className="xs:hidden">All</span>
            </button>
            <button
              onClick={() => handleFilterChange("sale")}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center ${
                filter === "sale"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">For Sale ({saleCount})</span>
              <span className="sm:hidden">Sale ({saleCount})</span>
            </button>
            <button
              onClick={() => handleFilterChange("donation")}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center ${
                filter === "donation"
                  ? "bg-pink-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Gift className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Donations ({donationCount})</span>
              <span className="sm:hidden">Gifts ({donationCount})</span>
            </button>
          </div>

          {/* Search Bar - Full Width on Mobile */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sort and View Controls */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center sm:justify-between">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 sm:flex-none sm:min-w-[180px]"
            >
              <option value="recent">Recently Updated</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-md overflow-hidden self-start sm:self-auto">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 sm:p-2.5 transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 sm:p-2.5 transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Result Count */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 sm:mb-6">
        <p className="text-gray-600 text-sm sm:text-base">
          Showing {processedPokemons.length} of {pokemons.length} cards
        </p>
        {filter !== "all" && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs sm:text-sm self-start sm:self-auto">
            {filter === "donation" ? "Donations" : "For Sale"}
          </span>
        )}
      </div>

      {/* Result Cards */}
      {processedPokemons.length === 0 ? (
        <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg mx-2 sm:mx-0">
          <div className="text-gray-400 mb-4">
            <Filter className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No cards found
          </h3>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            Try adjusting your filters or search to see more results.
          </p>
        </div>
      ) : (
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
              : "space-y-3 sm:space-y-4"
          }`}
        >
          {processedPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pokemon;