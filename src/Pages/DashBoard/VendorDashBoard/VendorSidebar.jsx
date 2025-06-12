"use client";

import { DollarSign, Home, HomeIcon, LogOut, Package, Settings, SubscriptIcon, Upload, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.jpg";
import { useAuth } from "../../../Context/AuthContext";

const VendorSidebar = () => {
  const { user, signOut, loading, isLoggingOut, isAuthenticated } = useAuth();
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Added missing navigate hook

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      const result = await signOut();

      if (result.success) {
        navigate("/signIn", { replace: true });

        if (result.localOnly) {
          console.warn("Logged out locally only");
        }
      } else {
        navigate("/signIn", { replace: true });
      }
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/signIn", { replace: true });
    }
  };

  // Check device type and set responsive behavior
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      
      // Auto-collapse on mobile and tablet
      if (mobile || tablet) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);
    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const navItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/vendor" },
    {
      name: "My Products",
      icon: <Package size={20} />,
      path: "/vendor/products",
    },
    { name: "Upload Card", icon: <Upload size={20} />, path: "/vendor/upload" },
    { name: "Orders", icon: <Package size={20} />, path: "/vendor/orders" },
    { name: "Profile", icon: <User size={20} />, path: "/vendor/profile" },
    {
      name: "Earnings",
      icon: <DollarSign size={20} />,
      path: "/vendor/earnings",
    },
    {
      name: "Subscription",
      icon: <SubscriptIcon size={20} />,
      path: "/vendor/vendorSubsCription",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {(isMobile || isTablet) && expanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 
          text-white h-screen transition-all duration-300 ease-in-out
          ${expanded ? "w-72 sm:w-80" : "w-16 sm:w-20"}
          ${(isMobile || isTablet) ? "fixed z-50" : "relative"}
          ${(isMobile || isTablet) && !expanded ? "-translate-x-full" : "translate-x-0"}
          flex flex-col shadow-2xl border-r border-slate-700
        `}
      >
        {/* Header Section */}
        <div className="relative">
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className={`
              absolute top-4 -right-11 bg-slate-700 hover:bg-slate-600 
              rounded-full p-1.5 text-white transition-all duration-200
              shadow-lg hover:shadow-xl z-10
              ${(isMobile || isTablet) ? "block" : "hidden lg:block"}
            `}
            aria-label="Toggle sidebar"
          >
            {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>

          {/* Logo and Brand */}
          <div
            className={`
              p-6 flex items-center transition-all duration-300
              ${expanded ? "gap-4" : "justify-center"}
            `}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl flex-shrink-0 w-12 h-12 flex items-center justify-center overflow-hidden shadow-lg">
                <img
                  src={logo || "/placeholder.svg"}
                  alt="PLAY Logo"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900"></div>
            </div>
            
            {expanded && (
              <div className="flex flex-col min-w-0">
                <h1 className="text-xl font-bold text-white truncate">
                  Vendor Panel
                </h1>
                <p className="text-sm text-slate-300 truncate">
                  {user?.username || "Welcome"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          <ul className="space-y-1">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`
                      group flex items-center rounded-xl transition-all duration-200
                      ${expanded ? "justify-start gap-4 px-4 py-3" : "justify-center p-3"}
                      ${isActive 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105" 
                        : "hover:bg-slate-700/50 text-slate-300 hover:text-white hover:transform hover:scale-105"
                      }
                      relative overflow-hidden
                    `}
                    title={!expanded ? item.name : ""}
                  >
                    {/* Background animation */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 
                      transform transition-transform duration-300 
                      ${isActive ? "translate-x-0" : "-translate-x-full group-hover:translate-x-0"}
                    `} />
                    
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0">
                      {item.icon}
                    </div>
                    
                    {/* Text */}
                    {expanded && (
                      <span className="relative z-10 font-medium truncate">
                        {item.name}
                      </span>
                    )}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute right-2 w-2 h-2 bg-white rounded-full opacity-75" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className="border-t border-slate-700 bg-slate-800/50">
          {/* Back to Home */}
          <div className="px-3 py-3">
            <Link
              to="/"
              className={`
                group flex items-center rounded-xl transition-all duration-200
                ${expanded ? "justify-start gap-4 px-4 py-3" : "justify-center p-3"}
                hover:bg-slate-700/50 text-blue-400 hover:text-blue-300
                hover:transform hover:scale-105
              `}
              title={!expanded ? "Back to Home" : ""}
            >
              <HomeIcon size={20} />
              {expanded && <span className="font-medium">Back to Home</span>}
            </Link>
          </div>

          {/* Logout */}
          <div className="px-3 py-3">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`
                group flex items-center rounded-xl transition-all duration-200 w-full
                ${expanded ? "justify-start gap-4 px-4 py-3" : "justify-center p-3"}
                hover:bg-red-600/20 text-red-400 hover:text-red-300
                hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
              `}
              title={!expanded ? "Logout" : ""}
            >
              <LogOut size={20} />
              {expanded && (
                <span className="font-medium">
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </span>
              )}
            </button>
          </div>

          {/* User Info Footer */}
          {expanded && (
            <div className="px-6 py-4 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {user?.username?.charAt(0)?.toUpperCase() || "V"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.username || "Vendor"}
                  </p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-slate-600 {
          scrollbar-color: #475569 transparent;
        }
        .scrollbar-track-transparent {
          scrollbar-track-color: transparent;
        }
        
        /* Webkit scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </>
  );
};

export default VendorSidebar;