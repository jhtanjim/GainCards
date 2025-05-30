
"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../Context/AuthContext"

const useUserRole = () => {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isVendor, setIsVendor] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user || !user.role) {
      setIsAdmin(false)
      setIsVendor(false)
      setIsLoading(false)
      return
    }

    setIsAdmin(user.role === "ADMIN")
    setIsVendor(user.role === "VENDOR")
    setIsLoading(false)
  }, [user])

  return { isAdmin, isVendor, isLoading }
}

export default useUserRole
