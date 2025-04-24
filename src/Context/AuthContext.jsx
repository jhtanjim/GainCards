"use client"
import { createContext, useContext, useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom" // Changed from useRouter
import { login, logout, register, refresh } from "../api/auth.js" // Import your API functions
import { myProfile } from "../api/profile" 

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // const navigate = useNavigate() // React Router's hook for navigation

 
  const fetchUserData = async () => {
    setLoading(true)
    try {
      const userData = await myProfile()
      setUser(userData)
      console.log(userData)
      return userData
    } catch (error) {
      console.error("Error fetching user data:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    // Check auth status when component mounts
    fetchUserData()
  }, [])

  const signIn = async (email, password) => {
    setLoading(true)
    try {
      const data = await login({ email, password })
      setUser(data.user)
      return { success: true, user: data.user }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Failed to sign in' 
      }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (userData) => {
    setLoading(true)
    try {
      const data = await register(userData)
      setUser(data.user)
      return { success: true, user: data.user }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Failed to create account' 
      }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await logout()
      setUser(null)
      // navigate('/signin')
      return { success: true }
    } catch (error) {
      console.error("Error during logout:", error)
      return { success: false, error: error.message }
    }
  }

  const refreshToken = async () => {
    try {
      await refresh()
      return true
    } catch (error) {
      console.error("Error refreshing token:", error)
      return false
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    refreshToken,
    isAuthenticated: !!user,
    fetchUserData
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}