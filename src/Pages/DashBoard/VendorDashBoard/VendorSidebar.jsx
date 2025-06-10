"use client";

import {
  DollarSign,
  Home,
  HomeIcon,
  LogOut,
  Package,
  Settings,
  SubscriptIcon,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo/logo.jpg";
import { useAuth } from "../../../Context/AuthContext";

const VendorSidebar = () => {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setExpanded(false);
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
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
    // { name: "Analytics", icon: <BarChart2 size={20} />, path: "/vendor/analytics" },
    {
      name: "Earnings",
      icon: <DollarSign size={20} />,
      path: "/vendor/earnings",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/vendor/settings",
    },
    {
      name: "Subscription",
      icon: <SubscriptIcon size={20} />,
      path: "/vendor/vendorSubsCription",
    },
  ];

  return (
    <div
      className={`bg-[#131e2c] text-white h-full transition-all duration-300 ${
        expanded ? "w-64" : "w-20"
      } ${isMobile ? "absolute z-50" : "relative"}`}
    >
      {/* Toggle button for mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-5 bg-[#1a2639] rounded-full p-1 text-white"
        >
          {expanded ? "←" : "→"}
        </button>
      )}

      {/* Logo */}
      <div
        className={`p-6 flex items-center ${
          expanded ? "gap-2" : "justify-center"
        }`}
      >
        <div className="bg-[#1a2639] p-2 rounded-lg flex-shrink-0 w-10 h-10 flex items-center justify-center overflow-hidden">
          <img
            src={logo || "/placeholder.svg"}
            alt="PLAY Logo"
            className="w-full h-full object-cover"
          />
        </div>
        {expanded && (
          <h1 className="text-2xl font-bold">Vendor {user.username}</h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center ${
                  expanded ? "justify-start gap-3 px-4" : "justify-center"
                } py-3 rounded-lg hover:bg-[#1a2639] transition-colors ${
                  location.pathname === item.path
                    ? "bg-[#1a2639] font-medium"
                    : ""
                }`}
              >
                {item.icon}
                {expanded && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-[#1a2639]">
        <Link
          to="/"
          className={`flex items-center ${
            expanded ? "justify-start gap-3 px-4" : "justify-center"
          } py-3 rounded-lg hover:bg-[#1a2639] transition-colors text-blue-400`}
        >
          <HomeIcon size={20} />
          Back to Home
        </Link>
      </div>
      <div className="px-4 py-4 border-t border-[#1a2639]">
        <Link
          to="/signin"
          className={`flex items-center ${
            expanded ? "justify-start gap-3 px-4" : "justify-center"
          } py-3 rounded-lg hover:bg-[#1a2639] transition-colors text-red-400`}
        >
          <LogOut size={20} />
          {expanded && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default VendorSidebar;
