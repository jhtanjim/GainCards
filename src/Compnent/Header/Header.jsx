"use client";

import { Heart, LogIn, LogOut, Settings, ShoppingBag, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useShop } from "../../Context/ShopContext";
// import logoImg from "../../assets/logo/white.png";
import useUserRole from "../../Hooks/useUserRole";
import { getAllFavoritePokemon } from "../../api/pokemondata";
import { useQuery } from "@tanstack/react-query";

export default function Header() {
  const { cartItems } = useShop();
  const navigate = useNavigate();
  const { user, signOut, loading, isLoggingOut, isAuthenticated } = useAuth();

  const {  isVendor,isAdmin } = useUserRole();
      const {
    data: favorites = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: getAllFavoritePokemon,
    enabled: !!isAuthenticated,
  });
  const [isMobile, setIsMobile] = useState(false);

  // Responsive breakpoint detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleToggleSidebar = () => {
    if (window.toggleSidebar) {
      window.toggleSidebar();
    }
  };

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

  const renderAuthSection = () => {
    if (loading && isLoggingOut) {
      return (
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-full animate-pulse border border-red-500/30"></div>
        </div>
      );
    }

    if (isAuthenticated) {
      return (
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`flex items-center justify-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-all duration-300 ${
              isLoggingOut
                ? "bg-gray-600/50 cursor-not-allowed text-gray-400 border border-gray-600/30"
                : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/25 border border-red-400/30 hover:scale-105"
            }`}
            title={isMobile ? "Logout" : undefined}
          >
            {isLoggingOut ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Logging out...</span>
              </div>
            ) : (
              <>
                <LogOut size={isMobile ? 16 : 18} />
                <span className="hidden sm:inline">Logout</span>
              </>
            )}
          </button>

          {/* Profile Section */}
          <Link
            to="/myProfile"
            className="text-purple-300 hover:text-purple-200 transition-colors text-xs font-medium hover:underline"
          >
            <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-800/50 to-purple-900/30 rounded-lg sm:rounded-xl p-1.5 sm:p-2 border border-purple-500/20 backdrop-blur-sm">
              <div className="relative">
                <img
                  src={user?.profilePicture || "/default-profile.png"}
                  alt={user?.username || "User"}
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl border-2 border-purple-400 object-cover shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = "/default-profile.png";
                  }}
                />
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-gray-900 shadow-sm"></div>
              </div>
              <div className="text-xs sm:text-sm hidden md:block">
                <p className="font-bold text-white mb-0.5 truncate max-w-20 lg:max-w-none">
                  {user?.username || "User"}
                </p>
                <div className="text-purple-300 hover:text-purple-200 transition-colors text-xs font-medium hover:underline">
                  View Profile
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    }

    return (
      <Link to="/signIn">
        <button className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 border border-purple-400/30 text-xs sm:text-sm">
          <LogIn size={isMobile ? 16 : 18} />
          <span className="hidden xs:inline">Sign In</span>
        </button>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 h-16 sm:h-20 w-full bg-[#131E2C] shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-purple-600/10 to-red-600/5 animate-pulse"></div>

      <div className="relative flex h-full items-center justify-between px-3 sm:px-6">
        {/* Left Section */}
        <div className="flex flex-1 items-center gap-2 sm:gap-4 min-w-0">
          {/* Sidebar Button */}
          <button
            className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-800/50 to-purple-900/30 hover:from-gray-700/50 hover:to-purple-800/40 transition-all duration-300 lg:hidden border border-purple-500/20 hover:border-purple-400/40 backdrop-blur-sm flex-shrink-0"
            onClick={handleToggleSidebar}
          >
            <Settings size={isMobile ? 18 : 20} className="text-purple-300" />
          </button>

          {/* Logo */}
          {/* <Link
            to="/"
            className="flex items-center gap-2 sm:gap-4 group min-w-0 flex-shrink-0"
          >
            <div className="relative">
              <div className="h-10 sm:h-14 w-auto overflow-hidden transition-all duration-300 shadow-lg">
                <img
                  src={logoImg}
                  alt="Gain Cards Logo"
                  className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
            </div>
          </Link> */}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          {/* Become a Vendor - Hidden on mobile */}
          {!isVendor && !isAdmin && (
            <Link to="/vendorSignup" className="hidden md:block">
              <button className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl bg-gradient-to-r from-purple-600/20 to-red-600/20 hover:from-purple-600/30 hover:to-red-600/30 text-white font-semibold transition-all duration-300 border border-purple-500/20 hover:border-purple-400/40 backdrop-blur-sm text-xs lg:text-sm">
                <Zap size={14} />
                <span className="hidden lg:inline">Become a Vendor</span>
                <span className="lg:hidden">Vendor</span>
              </button>
            </Link>
          )}
          {/* Favorites */}
          <Link to="/mylibrary">
            <button className="relative p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-800/50 to-purple-900/30 hover:from-gray-700/50 hover:to-purple-800/40 transition-all duration-300 border border-purple-500/20 hover:border-purple-400/40 backdrop-blur-sm group">

              <Heart
                size={isMobile ? 18 : 20}
                className="text-purple-300 group-hover:text-purple-200 transition-colors"
              />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-600 text-xs text-white font-bold flex items-center justify-center rounded-full shadow-md">
                  {favorites.length > 99 ? "99+" : favorites.length}
                </span>
              )}
              <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10"></div>
            </button>
          </Link>

          {/* Shopping Cart */}
          <Link to="/mybag">
            <button className="relative p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-800/50 to-purple-900/30 hover:from-gray-700/50 hover:to-purple-800/40 transition-all duration-300 border border-purple-500/20 hover:border-purple-400/40 backdrop-blur-sm group">
              <ShoppingBag
                size={isMobile ? 18 : 20}
                className="text-purple-300 group-hover:text-purple-200 transition-colors"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-600 text-xs text-white font-bold flex items-center justify-center rounded-full shadow-md">
                  {cartItems.length > 99 ? "99+" : cartItems.length}
                </span>
              )}
             
            </button>
          </Link>

          {/* Auth Section */}
          {renderAuthSection()}
        </div>
      </div>
    </header>
  );
}
