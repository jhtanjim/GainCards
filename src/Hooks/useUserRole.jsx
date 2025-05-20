"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../Context/AuthContext"

const useUserRole = () => {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isVendor, setIsVendor] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setIsAdmin(false)
        setIsVendor(false)
        setIsLoading(false)
        return
      }

      try {
        // Replace this with your actual API call to check user roles
        // For example:
        // const response = await fetch(`/api/users/role/${user.uid}`);
        // const data = await response.json();

        // For demonstration, we're using mock data
        // In a real app, you would fetch this from your backend
        const mockUserRoles = {
          // This is just for demonstration
          // Replace with actual API call in production
          admin: user.email === "admin@example.com",
          vendor: user.email === "vendor@example.com" || user.email?.includes("vendor"),
        }

        setIsAdmin(mockUserRoles.admin)
        setIsVendor(mockUserRoles.vendor)
      } catch (error) {
        console.error("Error checking user role:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUserRole()
  }, [user])

  return { isAdmin, isVendor, isLoading }
}

export default useUserRole
