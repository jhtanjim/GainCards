import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Users, ShoppingBag, CreditCard, TrendingUp } from 'lucide-react'
import { getAllUsers } from '../../../api/users'
import { getAllOrders } from '../../../api/orders'

const AdminDashBoard = () => {
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  })

  const { data: orders = [], isLoading: loadingOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders
  })

  const stats = [
    {
      name: 'Total Users',
      value: loadingUsers ? '...' : users.length,
      icon: Users,
      change: '+12%',
      color: 'bg-blue-500'
    },
    {
      name: 'Total Orders',
      value: loadingOrders ? '...' : orders.length,
      icon: ShoppingBag,
      change: '+23%',
      color: 'bg-green-500'
    },
    {
      name: 'Active Vendors',
      value: loadingUsers ? '...' : users.filter(u => u.role === 'VENDOR').length,
      icon: TrendingUp,
      change: '+7%',
      color: 'bg-yellow-500'
    }
  ]

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
              <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.name}</p>
          </div>
        ))}
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
        {orders
          ?.flatMap(orderGroup =>
            orderGroup.orders.map(order => ({
              ...order,
              groupId: orderGroup.id,
              profileId: orderGroup.profileId,
              status: orderGroup.status,
              totalAmount: order.totalAmount || orderGroup.totalAmount,
              createdAt: order.createdAt || orderGroup.createdAt,
            }))
          )
          .slice(0, 10)
          .map((order, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {order.groupId?.slice(0, 8)}...
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {order.paymentIntentId?.slice(0, 12) || '—'}
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
  </div>
</div>

    </div>
  )
}

export default AdminDashBoard
