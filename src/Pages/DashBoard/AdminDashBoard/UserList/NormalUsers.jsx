// components/UserList/NormalUsers.jsx
import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../../../api/users'
import UserTable from './UserTable'

const NormalUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsers()
      .then(data => setUsers(data.filter(u => u.role === 'USER')))
      .catch(console.error)
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Normal Users</h2>
      <UserTable users={users} />
    </div>
  )
}

export default NormalUsers
