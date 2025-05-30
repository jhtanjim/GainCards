"use client"
import Swal from "sweetalert2"
import { useEffect } from "react"
import useUserRole from "../Hooks/useUserRole"

const VendorRoutes = ({ children }) => {
  const { isVendor, isLoading } = useUserRole()

  useEffect(() => {
    if (!isLoading && !isVendor) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Vendor access required",
        confirmButtonColor: "#ef4444",
      })
    }
  }, [isVendor, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Checking access...</p>
      </div>
    )
  }

  if (!isVendor) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">Vendor privileges required</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default VendorRoutes
