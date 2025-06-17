"use client"
import { useQuery } from "@tanstack/react-query"

import { getAllOrders } from "../../../api/orders"
import { getAllUsers } from "../../../api/users"
import OrderManagementSystem from "./OrderList/OrderManagementSystem"

const AdminDashboard = () => {
  const {
    data: orders = [],
    isLoading: loadingOrders,
    error: ordersError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  })

  const {
    data: users = [],
    isLoading: loadingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  })

  const isLoading = loadingOrders || loadingUsers
  const error = ordersError || usersError

  return (
    <div className="space-y-8">
      {/* Dashboard Overview Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your business performance</p>
      </div>

      {/* Recent Orders Section */}
      <OrderManagementSystem
        orders={orders}
        users={users}
        isLoading={isLoading}
        error={error}
        showRecentOnly={true}
        maxItems={10}
        showStats={true}
        showFilters={false}
        title="Recent Orders"
      />
    </div>
  )
}

export default AdminDashboard
