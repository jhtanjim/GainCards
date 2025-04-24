import React from "react"
import { useAuth } from "../../../Context/AuthContext"

const MyProfile = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-purple-300 text-xl">
        Loading your profile...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-950 flex items-center justify-center px-4 py-12">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md w-full text-white">
        <div className="flex flex-col items-center">
          <img
            src={user.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="h-24 w-24 rounded-full border-4 border-purple-500 shadow-md mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold mb-1">{user.username}</h2>
          <p className="text-purple-400">{user.email}</p>
          <p className="text-sm mt-1 text-purple-500">Country: {user.country}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-purple-300">Account Details</h3>
          <ul className="text-sm space-y-1">
            <li>
              <span className="font-medium text-gray-400">ID:</span> {user.id}
            </li>
            <li>
              <span className="font-medium text-gray-400">Role:</span> {user.role}
            </li>
            <li>
              <span className="font-medium text-gray-400">Joined:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
