"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Home, Grid, Heart, ShoppingBag, Upload, CreditCard, Package, User } from "lucide-react"
import logo from "../../assets/logo/logo.jpg"

// Custom PokemonBall icon component
const PokemonBall = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" fillOpacity="0.2" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileVisible, setMobileVisible] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // Reset mobile visibility when switching between mobile and desktop
      if (!mobile) {
        setMobileVisible(false)
      }
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Toggle sidebar from external components (will be used by Header)
  window.toggleSidebar = () => {
    if (isMobile) {
      setMobileVisible((prev) => !prev)
    } else {
      setExpanded((prev) => !prev)
    }
  }

  // Calculate sidebar width based on state
  const getSidebarWidth = () => {
    if (isMobile) {
      return mobileVisible ? "w-20" : "w-0"
    } else {
      return expanded ? "w-64" : "w-20"
    }
  }

  return (
    <div
      className={`bg-[#131e2c] text-white flex flex-col h-full transition-all duration-300 ${getSidebarWidth()} ${
        isMobile && !mobileVisible ? "overflow-hidden" : ""
      }`}
      onMouseEnter={() => !isMobile && setExpanded(true)}
      onMouseLeave={() => !isMobile && setExpanded(false)}
    >
      {/* Logo */}
      <div className={`p-6 flex items-center ${expanded && !isMobile ? "gap-2" : "justify-center"}`}>
        <div className="bg-[#1a2639] p-2 rounded-lg flex-shrink-0 w-10 h-10 flex items-center justify-center overflow-hidden">
          <img src={logo || "/placeholder.svg"} alt="PLAY Logo" className="w-full h-full object-cover" />
        </div>
        {expanded && !isMobile && <h1 className="text-2xl font-bold">PLAY</h1>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex items-center ${
                expanded && !isMobile ? "justify-start gap-3 px-4" : "justify-center"
              } py-3 rounded-lg hover:bg-[#1a2639] transition-colors`}
            >
              <Home size={20} />
              {expanded && !isMobile && <span>Home</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className={`flex items-center ${
                expanded && !isMobile ? "justify-start gap-3 px-4" : "justify-center"
              } py-3 rounded-lg hover:bg-[#1a2639] transition-colors`}
            >
              <Grid size={20} />
              {expanded && !isMobile && <span>Categories</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/pokemon"
              className={`flex items-center ${
                expanded && !isMobile ? "justify-start gap-3 px-4" : "justify-center"
              } py-3 rounded-lg hover:bg-[#1a2639] transition-colors`}
            >
              <PokemonBall size={20} />
              {expanded && !isMobile && <span>Pokemon Cards</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/myLibrary"
              className={`flex items-center ${
                expanded && !isMobile ? "justify-start gap-3 px-4" : "justify-center"
              } py-3 rounded-lg hover:bg-[#1a2639] transition-colors`}
            >
              <Heart size={20} />
              {expanded && !isMobile && <span>My Library</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/myBag"
              className={`flex items-center ${
                expanded && !isMobile ? "justify-start gap-3 px-4" : "justify-center"
              } py-3 rounded-lg hover:bg-[#1a2639] transition-colors`}
            >
              <ShoppingBag size={20} />
              {expanded && !isMobile && <span>My Bag</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/pokemonCardUpload"
              className={`flex items-center ${
                expanded && !isMobile ? "justify-start gap-3 px-4" : "justify-center"
              } py-3 rounded-lg hover:bg-[#1a2639] transition-colors`}
            >
              <Upload size={20} />
              {expanded && !isMobile && <span>Product upload</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/myOrders"
              className={`flex items-center ${
                expanded && !isMobile ? "justify-start gap-3 px-4" : "justify-center"
              } py-3 rounded-lg hover:bg-[#1a2639] transition-colors`}
            >
              <Package size={20} />
              {expanded && !isMobile && <span>My order</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className={`flex items-center ${
                expanded && !isMobile ? "justify-start gap-3 px-4" : "justify-center"
              } py-3 rounded-lg hover:bg-[#1a2639] transition-colors`}
            >
              <User size={20} />
              {expanded && !isMobile && <span>Admin dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/myCards"
              className={`flex items-center ${
                expanded && !isMobile ? "justify-start gap-3 px-4" : "justify-center"
              } py-3 rounded-lg hover:bg-[#1a2639] transition-colors`}
            >
              <CreditCard size={20} />
              {expanded && !isMobile && <span>My Cards</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Social Media Links */}
      {expanded && !isMobile ? (
        <div className="px-6 py-4 flex items-center gap-4">
          <Link to="#" className="text-gray-400 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.543 6.498C22 8.28 22 12 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"></path>
            </svg>
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </Link>
        </div>
      ) : (
        <div className="py-4 flex flex-col items-center gap-4">
          <Link to="#" className="text-gray-400 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Sidebar
