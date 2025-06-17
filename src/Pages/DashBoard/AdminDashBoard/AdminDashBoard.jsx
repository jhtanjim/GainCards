import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Users, ShoppingBag, CreditCard, TrendingUp, Search, Copy, Check } from 'lucide-react'
import { getAllUsers } from '../../../api/users'
import { getAllOrders } from '../../../api/orders'

const AdminDashBoard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedId, setCopiedId] = useState(null)

  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  })

  const { data: orders = [], isLoading: loadingOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders
  })

  console.log(orders)

  const stats = [
    {
      name: 'Total Users',
      value: loadingUsers ? '...' : users.length,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Orders',
      value: loadingOrders ? '...' : orders.length,
      icon: ShoppingBag,
      color: 'bg-green-500'
    },
    {
      name: 'Active Vendors',
      value: loadingUsers ? '...' : users.filter(u => u.role === 'VENDOR').length,
      icon: TrendingUp,
      color: 'bg-yellow-500'
    }
  ]

  // Flatten and filter orders based on search term
  const flattenedOrders = orders
    ?.flatMap(orderGroup =>
      orderGroup.orders.map(order => ({
        ...order,
        groupId: orderGroup.id,
        profileId: orderGroup.profileId,
        status: orderGroup.status,
        totalAmount: order.totalAmount || orderGroup.totalAmount,
        createdAt: order.createdAt || orderGroup.createdAt,
      }))
    ) || []

  const filteredOrders = flattenedOrders.filter(order => {
    if (!searchTerm) return true
    
    const searchLower = searchTerm.toLowerCase()
    return (
      order.groupId?.toLowerCase().includes(searchLower) ||
      order.paymentIntentId?.toLowerCase().includes(searchLower) ||
      order.vendorProfileId?.toLowerCase().includes(searchLower) ||
      order.profileId?.toLowerCase().includes(searchLower) ||
      order.status?.toLowerCase().includes(searchLower) ||
      order.totalAmount?.toString().includes(searchLower)
    )
  })

  const handleCopyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(`${type}-${text}`)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const CopyableId = ({ id, type, displayText }) => {
    const isCopied = copiedId === `${type}-${id}`
    
    return (
      <div 
        className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded px-1 py-0.5 transition-colors"
        onClick={() => handleCopyToClipboard(id, type)}
        title={`Click to copy full ${type}`}
      >
        <span className="text-sm text-gray-900">{displayText}</span>
        {isCopied ? (
          <Check className="h-3 w-3 text-green-500" />
        ) : (
          <Copy className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            Found {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders
                .slice(0, 10)
                .map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50 group">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <CopyableId 
                        id={order.groupId}
                        type="order"
                        displayText={`${order.groupId?.slice(0, 8)}...`}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {order.paymentIntentId ? (
                        <CopyableId 
                          id={order.paymentIntentId}
                          type="payment"
                          displayText={`${order.paymentIntentId.slice(0, 8)}...`}
                        />
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {order.vendorProfileId?.slice(0, 8) || order.profileId?.slice(0, 8)}...
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      ${order.totalAmount?.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'PAID'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No orders match your search criteria.' : 'No orders found.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashBoard