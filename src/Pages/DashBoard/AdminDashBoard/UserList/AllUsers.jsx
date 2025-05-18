// components/UserList/AllUsers.jsx
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../../../../api/users'
import UserTable from './UserTable'

const AllUsers = () => {
  const [filter, setFilter] = useState('all')

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  })

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true
    return user.role?.toLowerCase() === filter
  })

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'vendor', 'user'].map(role => (
          <button
            key={role}
            onClick={() => setFilter(role)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === role
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {role === 'all' ? 'All Users' : role === 'vendor' ? 'Vendors' : 'Normal Users'}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p>Loading users...</p>
      ) : isError ? (
        <p className="text-red-600">Error loading users.</p>
      ) : (
        <UserTable users={filteredUsers} />
      )}
    </div>
  )
}

export default AllUsers
