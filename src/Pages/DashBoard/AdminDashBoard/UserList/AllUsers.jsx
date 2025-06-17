// components/UserList/AllUsers.jsx
import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Search, X } from 'lucide-react'
import { getAllUsers } from '../../../../api/users'
import UserTable from './UserTable'

const AllUsers = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()

  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  console.log(users)

  // Filter by role first, then by search term
  const filteredUsers = users
    .filter(user => {
      if (filter === 'all') return true
      return user.role?.toLowerCase() === filter
    })
    .filter(user => {
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

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteUser(userId)
      // Invalidate and refetch users data
      queryClient.invalidateQueries(['users'])
      alert('User deleted successfully!')
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const getUserCountByRole = (role) => {
    if (role === 'all') return users.length
    return users.filter(user => user.role?.toLowerCase() === role).length
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <div className="text-sm text-gray-500">
          Total: {users.length} users
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search by email, username, country, role, or ID..."
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
          <p className="mt-2 text-sm text-gray-600">
            Found {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} matching "{searchTerm}"
          </p>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'vendor', 'user'].map(role => (
          <button
            key={role}
            onClick={() => setFilter(role)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === role
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {role === 'all' ? 'All Users' : role === 'vendor' ? 'Vendors' : 'Normal Users'}
            <span className="ml-2 text-xs opacity-75">
              ({getUserCountByRole(role)})
            </span>
          </button>
        ))}
      </div>

      {/* Active Filters Display */}
      {(filter !== 'all' || searchTerm) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {filter !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Role: {filter === 'vendor' ? 'Vendors' : 'Normal Users'}
              <button
                onClick={() => setFilter('all')}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Search: "{searchTerm}"
              <button
                onClick={clearSearch}
                className="ml-1 text-gray-600 hover:text-gray-800"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading users...</span>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading users
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error?.message || 'An unexpected error occurred. Please try again.'}</p>
              </div>
              <div className="mt-3">
                <button 
                  onClick={() => queryClient.invalidateQueries(['users'])}
                  className="bg-red-100 px-3 py-1 rounded-md text-sm text-red-800 hover:bg-red-200 transition-colors"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      {!isLoading && !isError && (
        <>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm 
                  ? `No users match your search criteria "${searchTerm}"${filter !== 'all' ? ` in ${filter} role` : ''}.`
                  : filter === 'all' 
                    ? 'There are no users in the system yet.' 
                    : `No users with role "${filter}" found.`
                }
              </p>
              {(searchTerm || filter !== 'all') && (
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setFilter('all')
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            <UserTable 
              users={filteredUsers} 
              isDeleting={isDeleting}
            />
          )}
        </>
      )}
    </div>
  )
}

export default AllUsers