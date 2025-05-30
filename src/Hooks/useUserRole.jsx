// "use client"

// import { useEffect, useState } from "react"
// import { useAuth } from "../Context/AuthContext"

// const useUserRole = () => {
//   const { user } = useAuth()
//   const [isAdmin, setIsAdmin] = useState(false)
//   const [isVendor, setIsVendor] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const checkUserRole = async () => {
//       if (!user || !user.email) {
//         setIsAdmin(false)
//         setIsVendor(false)
//         setIsLoading(false)
//         return
//       }

//       try {
//         const email = user.email.toLowerCase()

//         const mockUserRoles = {
//           admin: email === "admin@example.com",
//           vendor: email === "vendor@example.com" || email.includes("vendor"),
//         }

//         setIsAdmin(mockUserRoles.admin)
//         setIsVendor(mockUserRoles.vendor)
//       } catch (error) {
//         console.error("Error checking user role:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     checkUserRole()
//   }, [user])

//   return { isAdmin, isVendor, isLoading }
// }

// export default useUserRole
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
