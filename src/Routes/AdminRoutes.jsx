"use client"
import Swal from "sweetalert2"
import { useEffect } from "react"
import useUserRole from "../Hooks/useUserRole"

const AdminRoutes = ({ children }) => {
  const { isAdmin, isLoading } = useUserRole()

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Admin access required",
        confirmButtonColor: "#ef4444",
      })
    }
  }, [isAdmin, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Checking access...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">Admin privileges required</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default AdminRoutes
