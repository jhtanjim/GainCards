"use client"

import { Settings, Heart, ShoppingBag, Search, X, LogIn } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"

export default function Header() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)
  const handleToggleSidebar = () => {
    if (window.toggleSidebar) {
      window.toggleSidebar()
    }
  }

  const handleLogout = async () => {
    const result = await signOut()
    if (result.success) {
      navigate("/signIn")
    }
  }

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-purple-900/20 bg-gradient-to-r from-gray-900 to-purple-950 shadow-lg">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex flex-1 items-center gap-2">
          <button
            className="p-2 rounded-lg hover:bg-purple-800/30 transition-colors lg:hidden"
            onClick={handleToggleSidebar}
          >
            <Settings size={20} className="text-purple-300" />
            <span className="sr-only">Toggle sidebar</span>
          </button>

          <div className="hidden md:flex items-center gap-3">
            <div className="h-10 w-10 relative overflow-hidden rounded-full border-2 border-purple-700">
              <img src="/logo.jpg" alt="Gain Cards Logo" className="object-contain" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-red-500 text-transparent bg-clip-text">
              GAIN CARDS
            </span>
          </div>
        </div>

        {/* Search overlay for mobile */}
        <div
          className={`absolute left-0 right-0 top-0 h-16 bg-gray-900 z-20 flex items-center px-4 transition-all ${
            searchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          <input
            type="text"
            placeholder="Search for cards..."
            className="w-full bg-gray-800 border border-purple-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="ml-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700" onClick={() => setSearchOpen(false)}>
            <X className="h-5 w-5 text-purple-300" />
            <span className="sr-only">Close search</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
        <Link to={"/vendorSignup"}><h2 className="text-white hover:underline transition">Become a Vendor</h2></Link>

          {/* Search button */}
          <button
            className="p-2 rounded-lg hover:bg-purple-800/30 transition-colors lg:hidden"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={20} className="text-purple-300" />
            <span className="sr-only">Search</span>
          </button>

          {/* Desktop search */}
          <div className="hidden lg:block relative w-64">
            <input
              type="text"
              placeholder="Search cards..."
              className="w-full bg-gray-800/50 border border-purple-800/50 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
          </div>

          {/* Favorites */}
          <div className="relative">
            <Link to="/mylibrary">
              <button className="p-2 rounded-lg hover:bg-purple-800/30 transition-colors">
                <Heart size={20} className="text-purple-300" />
              </button>
            
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  
                </span>
          
            </Link>
          </div>

          {/* Cart */}
          <div className="relative">
            <Link to="/mybag">
              <button className="p-2 rounded-lg hover:bg-purple-800/30 transition-colors">
                <ShoppingBag size={20} className="text-purple-300" />
              </button>
             
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
               
                </span>
           
            </Link>
          </div>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* Logout */}
              <button
                onClick={()=>handleLogout()}
                className="p-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Logout
              </button>

              {/* Profile */}
              <div className="flex items-center gap-2">
                <img
                  src={user?.profilePicture || "/default-profile.png"}
                  alt={user?.username || "User"}
                  className="h-8 w-8 rounded-full border-2 border-purple-500 object-cover"
                />
                <div className="text-xs hidden md:block">
                  <p className="font-semibold text-white">{user?.username}</p>
                  <Link to={"/myProfile"}>  <p className="text-purple-300">View Profile</p></Link>
                
                </div>
              </div>
            </div>
          ) : (
            <Link to="/signIn">
              <button className="p-2 rounded-lg hover:bg-purple-800/30 transition-colors">
                <LogIn size={20} className="text-purple-300" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
