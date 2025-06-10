"use client";
import { Bell, Search, User } from "lucide-react";
import { useAuth } from "../../../Context/AuthContext";

const VendorHeader = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Vendor Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* User */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture || "/placeholder.svg"}
                  alt="User"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User size={18} />
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800">
                {user?.username || "Vendor"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || "vendor@example.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
