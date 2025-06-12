"use client";

import { Bell, Menu, Search, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../../Context/AuthContext";

const VendorHeader = ({ onToggleSidebar, sidebarExpanded }) => {
  const { user } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check device type
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);
    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSearch(false);
      setShowNotifications(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleSearch = (e) => {
    e.stopPropagation();
    setShowSearch(!showSearch);
    setShowNotifications(false);
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
    setShowSearch(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative z-40">
      <div className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Menu & Title */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            {/* Mobile Menu Toggle */}
            {isMobile && (
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
                aria-label="Toggle sidebar"
              >
                {sidebarExpanded ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}

            {/* Title */}
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 truncate">
                {isMobile ? "Dashboard" : "Vendor Dashboard"}
              </h1>
              {!isMobile && (
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                  Welcome back, {user?.username || "Vendor"}
                </p>
              )}
            </div>
          </div>

          {/* Right Section - Actions & User */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
            {/* Search - Desktop */}
           
            {/* Search - Mobile/Tablet */}
            {(isMobile || isTablet) && (
              <div className="relative">
                <button
                  onClick={toggleSearch}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>

                {/* Mobile Search Dropdown */}
                {showSearch && (
                  <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border p-3 z-50">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Search
                        className="absolute left-3 top-2.5 text-gray-400"
                        size={16}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile */}
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture || "/placeholder.svg"}
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={isMobile ? 16 : 20} />
                )}
              </div>
              
              {/* User Info - Hidden on mobile */}
              <div className="hidden sm:block lg:min-w-0">
                <p className="text-sm lg:text-base font-medium text-gray-800 truncate">
                  {user?.username || "Vendor"}
                </p>
                <p className="text-xs lg:text-sm text-gray-500 truncate hidden lg:block">
                  {user?.email || "vendor@example.com"}
                </p>
              </div>

              {/* Dropdown Arrow - Hidden on mobile */}
             
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;