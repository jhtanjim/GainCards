// components/UserList/UserDetailsModal.jsx
import React from 'react'

const UserDetailsModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null

  const getRoleBadgeClass = (role) => {
    switch (role?.toLowerCase()) {
      case 'vendor':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
      case 'user':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
    }
  }

  const formatAddress = (address) => {
    if (!address) return 'Not provided'
    const parts = [
      address.line1,
      address.line2,
      address.city,
      address.state,
      address.postalCode,
      address.country
    ].filter(Boolean)
    return parts.join(', ')
  }

  const getSubscriptionStatus = () => {
    if (user.subscriptionActivatedAt) {
      return {
        status: 'Active',
        class: 'bg-green-100 text-green-800 border-green-200'
      }
    }
    return {
      status: 'Inactive',
      class: 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const subscriptionStatus = getSubscriptionStatus()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={user.profilePicture || '/api/placeholder/64/64'}
                  alt={user.username}
                  className="h-16 w-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{user.username}</h3>
                <p className="text-blue-100">{user.email}</p>
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${getRoleBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h5 className="text-lg font-semibold text-gray-800 ml-3">Personal Information</h5>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <span className="block text-sm font-medium text-gray-500 mb-1">Full Name</span>
                  <span className="text-gray-900 font-medium">{user.username || 'Not provided'}</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <span className="block text-sm font-medium text-gray-500 mb-1">Phone Number</span>
                  <span className="text-gray-900 font-medium">{user.address?.phone || 'Not provided'}</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <span className="block text-sm font-medium text-gray-500 mb-1">Country</span>
                  <span className="text-gray-900 font-medium">{user.country || 'Not provided'}</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <span className="block text-sm font-medium text-gray-500 mb-1">Address</span>
                  <span className="text-gray-900 font-medium">{formatAddress(user.address)}</span>
                </div>
              </div>
            </div>

            {/* Account Information Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h5 className="text-lg font-semibold text-gray-800 ml-3">Account Information</h5>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <span className="block text-sm font-medium text-gray-500 mb-1">User ID</span>
                  <code className="text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded font-mono">{user.id}</code>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <span className="block text-sm font-medium text-gray-500 mb-1">Join Date</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <span className="block text-sm font-medium text-gray-500 mb-1">Last Updated</span>
                  <span className="text-gray-900 font-medium">
                    {user.updatedAt ? 
                      new Date(user.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 
                      'Not available'
                    }
                  </span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <span className="block text-sm font-medium text-gray-500 mb-1">Account Status</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Information Card */}
          <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl p-6 border border-emerald-200">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h5 className="text-lg font-semibold text-gray-800 ml-3">Subscription & Billing</h5>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <span className="block text-sm font-medium text-gray-500 mb-1">Subscription Status</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${subscriptionStatus.class}`}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${user.subscriptionActivatedAt ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  {subscriptionStatus.status}
                </span>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <span className="block text-sm font-medium text-gray-500 mb-1">Plan ID</span>
                <span className="text-gray-900 font-medium">
                  {user.subscriptionPlanId || 'No active plan'}
                </span>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <span className="block text-sm font-medium text-gray-500 mb-1">Cards Used</span>
                <span className="text-gray-900 font-medium text-lg">
                  {user.cardsUsedUnderPlan}
                </span>
              </div>
              {user.subscriptionActivatedAt && (
                <div className="bg-white rounded-lg p-4 border border-emerald-200 md:col-span-3">
                  <span className="block text-sm font-medium text-gray-500 mb-1">Subscription Activated</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(user.subscriptionActivatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information for Vendors */}
          {user.role?.toLowerCase() === 'vendor' && (
            <div className="mt-8 bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 border border-orange-200">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h5 className="text-lg font-semibold text-gray-800 ml-3">Vendor Information</h5>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <span className="block text-sm font-medium text-gray-500 mb-1">Company Name</span>
                  <span className="text-gray-900 font-medium">{user.companyName || 'Not provided'}</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <span className="block text-sm font-medium text-gray-500 mb-1">Business License</span>
                  <span className="text-gray-900 font-medium">{user.businessLicense || 'Not provided'}</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <span className="block text-sm font-medium text-gray-500 mb-1">Tax ID</span>
                  <span className="text-gray-900 font-medium">{user.taxId || 'Not provided'}</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <span className="block text-sm font-medium text-gray-500 mb-1">Verification Status</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    user.isVerified ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  }`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${user.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    {user.isVerified ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Profile ID: <code className="bg-gray-200 px-2 py-1 rounded text-xs">{user.profileId}</code>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-all duration-200 shadow-sm hover:shadow"
              >
                Close
              </button>
              <button className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5">
                Edit User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsModal