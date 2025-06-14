"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../Context/AuthContext"

const useUserRole = () => {
  const { user, fetchUserData, isAuthenticated } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isVendor, setIsVendor] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const updateRoles = async () => {
      if (!isAuthenticated) {
        setIsAdmin(false)
        setIsVendor(false)
        setIsLoading(false)
        return
      }

      // If we don't have user data or role, fetch it
      if (!user || !user.role) {
        setIsLoading(true)
        try {
          const userData = await fetchUserData()
          if (userData && userData.role) {
            setIsAdmin(userData.role === "ADMIN")
            setIsVendor(userData.role === "VENDOR")
          } else {
            setIsAdmin(false)
            setIsVendor(false)
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
          setIsAdmin(false)
          setIsVendor(false)
        }
        setIsLoading(false)
      } else {
        // We have user data, update roles immediately
        setIsAdmin(user.role === "ADMIN")
        setIsVendor(user.role === "VENDOR")
        setIsLoading(false)
      }
    }

    updateRoles()
  }, [user, isAuthenticated, fetchUserData])

  return { isAdmin, isVendor, isLoading }
}

export default useUserRole