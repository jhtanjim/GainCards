"use client"
import { useQuery } from "@tanstack/react-query"
import OrderManagementSystem from "./OrderManagementSystem"
import { getAllOrders } from "../../../../api/orders"
import { getAllUsers } from "../../../../api/users"

const OrderList = () => {
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
    <OrderManagementSystem
      orders={orders}
      users={users}
      isLoading={isLoading}
      error={error}
      showRecentOnly={false}
      maxItems={null}
      showStats={true}
      showFilters={true}
      title="All Orders"
    />
  )
}

export default OrderList
