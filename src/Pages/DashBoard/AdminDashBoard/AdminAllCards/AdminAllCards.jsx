"use client"

import { useState, useMemo } from "react"
import { getAllPokemonData, deletePokemon } from "../../../../api/pokemondata"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Eye, Trash2, Edit, Search, Filter, Grid, List } from "lucide-react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

const AdminAllCards = () => {
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const {
    data: pokemons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemons"],
    queryFn: getAllPokemonData,
  })

  // Filter and sort cards dynamically
  const filteredAndSortedCards = useMemo(() => {
    let filtered = [...pokemons]

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (card) =>
          (card.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (card.player || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (card.sport || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (card.brand || "").toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Status filter
    if (filter !== "all") {
      if (filter === "active") {
        filtered = filtered.filter((card) => card.status === "ACTIVE")
      } else if (filter === "donation") {
        filtered = filtered.filter((card) => card.isDonation === true)
      } else if (filter === "premium") {
        filtered = filtered.filter((card) => card.labelType === "Premium")
      }
    }

    // Sort cards
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.createdAt) - new Date(a.createdAt)
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt)
        case "title":
          return (a.title || "").localeCompare(b.title || "")
        case "price":
          return (a.price || 0) - (b.price || 0)
        case "year":
          return (b.year || 0) - (a.year || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [pokemons, searchQuery, filter, sortBy])

  // Get unique values for filters
  const getUniqueValues = (field) => {
    return [...new Set(pokemons.map((card) => card[field]).filter((value) => value && value.toString().trim() !== ""))]
  }

  // Handle delete card
  const handleDeleteCard = async (cardId, cardTitle) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `This will permanently delete "${cardTitle}" from the system!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      })

      if (result.isConfirmed) {
        await deletePokemon(cardId)

        // Invalidate and refetch the query
        queryClient.invalidateQueries({ queryKey: ["pokemons"] })

        Swal.fire({
          title: "Deleted!",
          text: `"${cardTitle}" has been deleted successfully.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        })
      }
    } catch (err) {
      console.error("Error deleting card:", err)
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the card. Please try again.",
        icon: "error",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading cards...</span>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Failed to load cards. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Cards Management</h1>
        <p className="text-gray-600 mt-2">View and manage all cards in the system</p>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Cards</option>
            <option value="active">Active Cards</option>
            <option value="donation">Donation Cards</option>
            <option value="premium">Premium Cards</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
            <option value="price">Price Low-High</option>
            <option value="year">Year New-Old</option>
          </select>

          {/* View Mode */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredAndSortedCards.length} of {pokemons.length} cards
          </div>
        </div>
      </div>

      {/* Cards Display */}
      {filteredAndSortedCards.length === 0 ? (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No cards found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery || filter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "No cards available in the system."}
          </p>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-w-3 aspect-h-4">
                    <img
                      src={card.frontImageUrl || "/placeholder-card.png"}
                      alt={card.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 truncate">{card.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <p>Player: {card.player}</p>
                      <p>Sport: {card.sport}</p>
                      <p>Year: {card.year}</p>
                      <p>Brand: {card.brand}</p>
                      <p className="text-lg font-bold text-blue-600">${card.price}</p>
                    </div>

                    <div className="flex justify-between items-center space-x-2">
                      <div className="flex space-x-1">
                        <Link
                          to={`/pokemon/${card.id}`}
                          className="inline-flex items-center px-2 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Link>

                        <Link
                          to={`/admin/card-update/${card.id}`}
                          className="inline-flex items-center px-2 py-1 border border-blue-300 rounded text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Link>
                      </div>

                      <button
                        onClick={() => handleDeleteCard(card.id, card.title)}
                        className="inline-flex items-center px-2 py-1 border border-red-300 rounded text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </button>
                    </div>

                    {/* Status badges */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          card.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {card.status}
                      </span>
                      {card.isDonation && (
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Donation</span>
                      )}
                      {card.labelType === "Premium" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Premium</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredAndSortedCards.map((card) => (
                  <li key={card.id}>
                    <div className="px-4 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          className="h-16 w-16 rounded-lg object-cover"
                          src={card.frontImageUrl || "/placeholder-card.png"}
                          alt={card.title}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{card.title}</div>
                          <div className="text-sm text-gray-500">
                            {card.player} • {card.sport} • {card.year} • ${card.price}
                          </div>
                          <div className="flex space-x-2 mt-1">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                card.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {card.status}
                            </span>
                            {card.isDonation && (
                              <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                                Donation
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/pokemon/${card.id}`}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                        <Link
                          to={`/admin/card-update/${card.id}`}
                          className="inline-flex items-center px-3 py-1 border border-blue-300 rounded-md text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteCard(card.id, card.title)}
                          className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminAllCards
