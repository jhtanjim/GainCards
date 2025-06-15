import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../../Context/AuthContext";
import UpdateProfile from "./UpdateProfile";

const MyProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen text-purple-300 text-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        <span className="ml-4">Loading your profile...</span>
      </div>
    );
  }

  const handleEditProfile = () => {
    setShowUpdateProfile(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-950 flex items-center justify-center px-4 py-12">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-2xl w-full text-white">
          <div className="flex flex-col items-center mb-8">
            <img
              src={user.profilePicture || "/placeholder.svg?height=96&width=96"}
              alt="Profile"
              className="h-24 w-24 rounded-full border-4 border-purple-500 shadow-md mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold mb-1">{user.username?.replace(/\t/g, "") || user.email}</h2>
            <p className="text-purple-400">{user.email}</p>
            <p className="text-sm mt-1 text-purple-500">
              Country: {user.country}
            </p>
            <div className="mt-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.role === "ADMIN"
                    ? "bg-red-500 text-white"
                    : user.role === "VENDOR"
                    ? "bg-purple-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-300">
                Account Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">User ID:</span>
                  <span className="font-mono text-xs">{user.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Role:</span>
                  <span className="font-medium">{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Joined:</span>
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cards Used:</span>
                  <span>{user.cardsUsedUnderPlan}</span>
                </div>            </div>
            </div>

            {user.address ? (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-purple-300">
                  Address Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-400">Name:</span>{" "}
                    {user.address.name}
                  </p>
                  <p>
                    <span className="text-gray-400">Address:</span>{" "}
                    {user.address.line1}
                  </p>
                  {user.address.line2 && (
                    <p className="ml-16">{user.address.line2}</p>
                  )}
                  <p>
                    <span className="text-gray-400">City:</span>{" "}
                    {user.address.city}, {user.address.state}
                  </p>
                  <p>
                    <span className="text-gray-400">Postal:</span>{" "}
                    {user.address.postalCode}
                  </p>
                  <p>
                    <span className="text-gray-400">Country:</span>{" "}
                    {user.address.country}
                  </p>
                  <p>
                    <span className="text-gray-400">Phone:</span>{" "}
                    {user.address.phone}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-purple-300">
                  Address Information
                </h3>
                <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-600 rounded-lg">
                  <svg className="w-8 h-8 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-400 text-sm">No address added</p>
                  <button
                    onClick={handleEditProfile}
                    className="text-purple-400 text-sm hover:text-purple-300 mt-1"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleEditProfile}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {showUpdateProfile && (
        <UpdateProfile onClose={() => setShowUpdateProfile(false)} />
      )}
    </>
  );
};

export default MyProfile;