"use client"

import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Search, X, User, Calendar, Globe, Mail, Hash, Eye, Clock, Menu } from "lucide-react"
import { getAllUsers } from "../../../../api/users"

const AllUsers = () => {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("cards") // Default to cards for mobile
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const queryClient = useQueryClient()

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  })

  // Filter by role first, then by search term
  const filteredUsers = users
    .filter((user) => {
      if (filter === "all") return true
      return user.role?.toLowerCase() === filter.toLowerCase()
    })
    .filter((user) => {
      if (!searchTerm) return true

      const searchLower = searchTerm.toLowerCase()
      return (
        user.email?.toLowerCase().includes(searchLower) ||
        user.username?.toLowerCase().includes(searchLower) ||
        user.country?.toLowerCase().includes(searchLower) ||
        user.role?.toLowerCase().includes(searchLower) ||
        user.id?.toLowerCase().includes(searchLower) ||
        user.profileId?.toLowerCase().includes(searchLower)
      )
    })

  const getUserCountByRole = (role) => {
    if (role === "all") return users.length
    return users.filter((user) => user.role?.toLowerCase() === role.toLowerCase()).length
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDateShort = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getRoleBadgeColor = (role) => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return "bg-red-100 text-red-800"
      case "VENDOR":
        return "bg-blue-100 text-blue-800"
      case "USER":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleViewDetails = (user) => {
    setSelectedUser(user)
    setShowUserDetails(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"
  }

  const closeUserDetails = () => {
    setShowUserDetails(false)
    setSelectedUser(null)
    // Restore body scroll
    document.body.style.overflow = "unset"
  }

  // User Details Modal Component - Fully Responsive
  const UserDetailsModal = ({ user, onClose }) => {
    if (!user) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
        <div className="relative min-h-screen flex items-center justify-center py-4">
          <div className="relative w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">User Details</h3>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-4 sm:px-6 py-6">
              {/* Profile Section - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 text-center sm:text-left">
                <div className="flex-shrink-0 mb-4 sm:mb-0">
                  {user.profilePicture ? (
                    <img
                      className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-4 border-gray-200"
                      src={user.profilePicture || "/placeholder.svg"}
                      alt={user.username}
                    />
                  ) : (
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gray-300 flex items-center justify-center border-4 border-gray-200">
                      <User className="h-8 w-8 sm:h-10 sm:w-10 text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="sm:ml-6">
                  <h4 className="text-xl sm:text-2xl font-semibold text-gray-900">{user.username || "N/A"}</h4>
                  <p className="text-gray-600 mb-2">@{user.username}</p>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getRoleBadgeColor(
                      user.role,
                    )}`}
                  >
                    {user.role || "N/A"}
                  </span>
                </div>
              </div>

              {/* Details Grid - Responsive */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Contact Information */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <h5 className="text-sm sm:text-base font-medium text-gray-900 mb-3 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Information
                  </h5>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block">Email</label>
                      <p className="text-sm sm:text-base text-gray-900 mt-1 break-all">{user.email || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block">Country</label>
                      <p className="text-sm sm:text-base text-gray-900 mt-1 flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                        {user.country || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <h5 className="text-sm sm:text-base font-medium text-gray-900 mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Account Information
                  </h5>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block">Role</label>
                      <p className="text-sm sm:text-base text-gray-900 mt-1">{user.role || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block">
                        Member Since
                      </label>
                      <p className="text-sm sm:text-base text-gray-900 mt-1 flex items-start">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="break-words">{formatDate(user.createdAt)}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* System Information */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg lg:col-span-2">
                  <h5 className="text-sm sm:text-base font-medium text-gray-900 mb-3 flex items-center">
                    <Hash className="h-4 w-4 mr-2" />
                    System Information
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block">User ID</label>
                      <p className="text-xs sm:text-sm text-gray-900 mt-1 font-mono bg-gray-100 p-2 sm:p-3 rounded break-all">
                        {user.id || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block">
                        Profile ID
                      </label>
                      <p className="text-xs sm:text-sm text-gray-900 mt-1 font-mono bg-gray-100 p-2 sm:p-3 rounded break-all">
                        {user.profileId || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg lg:col-span-2">
                  <h5 className="text-sm sm:text-base font-medium text-gray-900 mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Additional Information
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block">
                        Account Status
                      </label>
                      <p className="text-sm sm:text-base text-gray-900 mt-1">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block">
                        Profile Picture
                      </label>
                      <p className="text-sm sm:text-base text-gray-900 mt-1">
                        {user.profilePicture ? (
                          <a
                            href={user.profilePicture}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline break-all"
                          >
                            View Image
                          </a>
                        ) : (
                          "No profile picture"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Mobile Optimized */}
              <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-sm sm:text-base text-gray-600">Loading users...</span>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-base sm:text-lg font-medium text-red-800 mb-2">Error loading users</h3>
          <p className="text-sm sm:text-base text-red-600 mb-4">{error?.message || "An unexpected error occurred."}</p>
          <button
            onClick={() => queryClient.invalidateQueries(["users"])}
            className="bg-red-100 px-4 py-2 rounded-md text-sm text-red-800 hover:bg-red-200 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage and view all system users</p>
        </div>
        <div className="text-sm text-gray-500">Total: {users.length} users</div>
      </div>

      {/* Search Bar - Mobile Optimized */}
      <div className="mb-6">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        {searchTerm && (
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Found {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""} matching "{searchTerm}"
          </p>
        )}
      </div>

      {/* Mobile Filter Toggle */}
      <div className="sm:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700"
        >
          <span>Filters</span>
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* Filter Tabs - Responsive */}
      <div className={`${showMobileFilters ? "block" : "hidden"} sm:block mb-6`}>
        <div className="flex flex-wrap gap-2">
          {["all", "admin", "vendor", "user"].map((role) => (
            <button
              key={role}
              onClick={() => {
                setFilter(role)
                setShowMobileFilters(false)
              }}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                filter === role ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {role === "all" ? "All Users" : role.charAt(0).toUpperCase() + role.slice(1) + "s"}
              <span className="ml-1 sm:ml-2 text-xs opacity-75">({getUserCountByRole(role)})</span>
            </button>
          ))}
        </div>
      </div>

      {/* View Mode Toggle - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-3 sm:space-y-0">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-2 rounded text-xs sm:text-sm ${
              viewMode === "table" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`px-3 py-2 rounded text-xs sm:text-sm ${
              viewMode === "cards" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Cards
          </button>
        </div>
        <div className="text-xs sm:text-sm text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* Users Display */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <User className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 px-4">
            {searchTerm
              ? `No users match your search criteria "${searchTerm}"${filter !== "all" ? ` in ${filter} role` : ""}.`
              : filter === "all"
                ? "There are no users in the system yet."
                : `No users with role "${filter}" found.`}
          </p>
          {(searchTerm || filter !== "all") && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setSearchTerm("")
                  setFilter("all")
                }}
                className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      ) : viewMode === "table" ? (
        // Table View - Mobile Responsive
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                          {user.profilePicture ? (
                            <img
                              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
                              src={user.profilePicture || "/placeholder.svg"}
                              alt={user.username}
                            />
                          ) : (
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <User className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                          <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                            {user.username || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500 truncate sm:hidden">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{user.email || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(
                          user.role,
                        )}`}
                      >
                        {user.role || "N/A"}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-gray-400" />
                        {user.country || "N/A"}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDateShort(user.createdAt)}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="inline-flex items-center px-2 sm:px-3 py-1 border border-blue-300 rounded-md text-xs sm:text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                        <span className="hidden sm:inline">View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Card View - Mobile Optimized
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  {user.profilePicture ? (
                    <img
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                      src={user.profilePicture || "/placeholder.svg"}
                      alt={user.username}
                    />
                  ) : (
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                  <h3 className="text-sm sm:text-lg font-medium text-gray-900 truncate">{user.username || "N/A"}</h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getRoleBadgeColor(
                      user.role,
                    )}`}
                  >
                    {user.role || "N/A"}
                  </span>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3 mb-4">
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{user.email || "N/A"}</span>
                </div>

                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span>{user.country || "N/A"}</span>
                </div>

                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span>{formatDateShort(user.createdAt)}</span>
                </div>
              </div>

              <button
                onClick={() => handleViewDetails(user)}
                className="w-full inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-blue-300 rounded-md text-xs sm:text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetails && <UserDetailsModal user={selectedUser} onClose={closeUserDetails} />}
    </div>
  )
}

export default AllUsers
