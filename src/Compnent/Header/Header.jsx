"use client"

import {
  Settings,
  Heart,
  ShoppingBag,
  Search,
  X,
  LogIn,
  Zap,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"
import { useShop } from "../../Context/ShopContext"
import logoImg from "../../assets/logo/logoBG.png"

export default function Header() {
  const { cartItems } = useShop()
  const navigate = useNavigate()
  const { user, signOut, loading } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleToggleSidebar = () => {
    if (window.toggleSidebar) {
      window.toggleSidebar()
    }
  }

  const handleLogout = async () => {
    if (isLoggingOut) return

    try {
      setIsLoggingOut(true)
      const result = await signOut()

      if (result.success) {
        navigate("/signIn", { replace: true })

        if (result.localOnly) {
          console.warn("Logged out locally only")
        }
      } else {
        navigate("/signIn", { replace: true })
      }
    } catch (error) {
      console.error("Logout error:", error)
      navigate("/signIn", { replace: true })
    } finally {
      setIsLoggingOut(false)
    }
  }

  const renderAuthSection = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-full animate-pulse border border-red-500/30"></div>
        </div>
      )
    }

    if (user) {
      return (
        <div className="flex items-center gap-4">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
              isLoggingOut
                ? "bg-gray-600/50 cursor-not-allowed text-gray-400 border border-gray-600/30"
                : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/25 border border-red-400/30 hover:scale-105"
            }`}
          >
            {isLoggingOut ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Logging out...
              </div>
            ) : (
              "Logout"
            )}
          </button>

          {/* Profile Section */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-gray-800/50 to-purple-900/30 rounded-xl p-2 border border-purple-500/20 backdrop-blur-sm">
            <div className="relative">
              <img
                src={user?.profilePicture || "/default-profile.png"}
                alt={user?.username || "User"}
                className="h-10 w-10 rounded-xl border-2 border-purple-400 object-cover shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = "/default-profile.png"
                }}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-gray-900 shadow-sm"></div>
            </div>
            <div className="text-sm hidden md:block">
              <p className="font-bold text-white mb-0.5">
                {user?.username || "User"}
              </p>
              <Link
                to="/myProfile"
                className="text-purple-300 hover:text-purple-200 transition-colors text-xs font-medium hover:underline"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return (
      <Link to="/signIn">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 border border-purple-400/30">
          <LogIn size={18} />
          <span className="hidden sm:inline">Sign In</span>
        </button>
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 h-20 w-full bg-[#131E2C] shadow-2xl ">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-purple-600/10 to-red-600/5 animate-pulse"></div>

      <div className="relative flex h-full items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex flex-1 items-center gap-4">
          {/* Sidebar Button */}
          <button
            className="p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-purple-900/30 hover:from-gray-700/50 hover:to-purple-800/40 transition-all duration-300 lg:hidden border border-purple-500/20 hover:border-purple-400/40 backdrop-blur-sm"
            onClick={handleToggleSidebar}
          >
            <Settings size={20} className="text-purple-300" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="h-14 w-full overflow-hidden transition-all duration-300 shadow-lg">
                <img
                  src={logoImg}
                  alt="Gain Cards Logo"
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
            </div>
          </Link>
        </div>

        {/* Search Mobile Overlay */}
        <div
          className={`absolute left-0 right-0 top-0 h-20 bg-gradient-to-r from-gray-900 to-black z-20 flex items-center px-6 transition-all duration-300 border-b border-red-500/20 ${
            searchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
       
          <button
            className="ml-4 p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-red-900/30 hover:from-gray-700/50 hover:to-red-800/40 transition-colors border border-red-500/20 hover:border-red-400/40"
            onClick={() => setSearchOpen(false)}
          >
            <X className="h-5 w-5 text-red-300" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Become a Vendor */}
          <Link to="/vendorSignup">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600/20 to-red-600/20 hover:from-purple-600/30 hover:to-red-600/30 text-white font-semibold transition-all duration-300 border border-purple-500/20 hover:border-purple-400/40 backdrop-blur-sm">
              <Zap size={16} />
              Become a Vendor
            </button>
          </Link>

          {/* Mobile Search Button */}
          <button
            className="p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-purple-900/30 hover:from-gray-700/50 hover:to-purple-800/40 transition-all duration-300 lg:hidden border border-purple-500/20 hover:border-purple-400/40 backdrop-blur-sm"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={20} className="text-purple-300" />
          </button>

        

          {/* Favorites */}
          <Link to="/mylibrary">
            <button className="relative p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-purple-900/30 hover:from-gray-700/50 hover:to-purple-800/40 transition-all duration-300 border border-purple-500/20 hover:border-purple-400/40 backdrop-blur-sm group">
              <Heart size={20} className="text-purple-300 group-hover:text-purple-200 transition-colors" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10"></div>
            </button>
          </Link>

          {/* Shopping Cart */}
          <Link to="/mybag">
            <button className="relative p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-purple-900/30 hover:from-gray-700/50 hover:to-purple-800/40 transition-all duration-300 border border-purple-500/20 hover:border-purple-400/40 backdrop-blur-sm group">
              <ShoppingBag size={20} className="text-purple-300 group-hover:text-purple-200 transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-xs text-white font-bold flex items-center justify-center rounded-full shadow-md">
                  {cartItems.length}
                </span>
              )}
            </button>
          </Link>

          {/* Auth Section */}
          {renderAuthSection()}
        </div>
      </div>
    </header>
  )
}
