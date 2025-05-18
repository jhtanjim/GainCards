// components/UserList/Vendors.jsx
import React, { useEffect, useState } from 'react'
import UserTable from './UserTable'
import { getAllUsers } from '../../../../api/users'

const VendorUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsers()
      .then(data => setUsers(data.filter(u => u.role === 'VENDOR')))
      .catch(console.error)
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Vendors</h2>
      <UserTable users={users} />
    </div>
  )
}

export default VendorUsers
