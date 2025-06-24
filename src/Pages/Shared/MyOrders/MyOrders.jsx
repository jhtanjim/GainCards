"use client"

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { LoadingState } from "./MyOrdersComponents/loading-state"
import { ErrorState } from "./MyOrdersComponents/error-state"
import { EmptyState } from "./MyOrdersComponents/empty-state"
import { OrderCard } from "./MyOrdersComponents/order-card"
import { getMyOrders } from "../../../api/orders"
import { OrdersSearchFilter } from "./MyOrdersComponents/orders-search-filter"
import { ErrorBoundary } from "../../../../error-boundary"

 function MyOrdersPage() {
  const [expandedOrderId, setExpandedOrderId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [showShareMenu, setShowShareMenu] = useState(null)

  const {
    data: orderGroups = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
    refetchOnWindowFocus: false,
  })
  //console.log(orderGroups)
  

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  const toggleShareMenu = (orderGroupId) => {
    setShowShareMenu(showShareMenu === orderGroupId ? null : orderGroupId)
  }

  const handleCardClick = (product) => {
    const productUrl = `/cards/${product.id}`
    window.open(productUrl, "_blank")
  }

  const shareToFacebook = (orderGroup) => {
    //console.log("Share initiated for order:", orderGroup.id)
  }

  // Filter and search functionality
  const filteredOrders = orderGroups.filter((orderGroup) => {
    if (statusFilter !== "ALL" && orderGroup.status !== statusFilter) {
      return false
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()

      if (orderGroup.id.toLowerCase().includes(searchLower)) {
        return true
      }

      const hasMatchingItem = orderGroup.orders.some((order) =>
        order.items.some(
          (item) =>
            item.product?.title?.toLowerCase().includes(searchLower) ||
            item.product?.description?.toLowerCase().includes(searchLower) ||
            item.product?.brand?.toLowerCase().includes(searchLower),
        ),
      )

      return hasMatchingItem
    }

    return true
  })

  const orderCount = orderGroups.length
  const hasFilters = searchTerm || statusFilter !== "ALL"

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("ALL")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <div className="text-sm text-gray-500 mt-2 md:mt-0">
          {orderCount > 0 && (
            <span>
              {orderCount} order{orderCount !== 1 ? "s" : ""} found
            </span>
          )}
        </div>
      </div>

      <OrdersSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onRefresh={refetch}
        isRefetching={isRefetching}
      />

      {isLoading && <LoadingState />}

      {isError && <ErrorState error={error} onRetry={refetch} />}

      {!isLoading && !isError && filteredOrders.length === 0 && (
        <EmptyState hasFilters={hasFilters} onClearFilters={clearFilters} />
      )}

      {!isLoading && !isError && filteredOrders.length > 0 && (
        <div className="space-y-6">
          {filteredOrders.map((orderGroup) => (
            <OrderCard
              key={orderGroup.id}
              orderGroup={orderGroup}
              expandedOrderId={expandedOrderId}
              showShareMenu={showShareMenu}
              onToggleExpand={toggleOrderExpand}
              onToggleShareMenu={toggleShareMenu}
              onShare={shareToFacebook}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      )}

      {showShareMenu && <div className="fixed inset-0 z-10" onClick={() => setShowShareMenu(null)} />}
    </div>
  )
}
const MyOrdersPagedWithErrorBoundary = () => (
  <ErrorBoundary>
    <MyOrdersPage />
  </ErrorBoundary>
);
export default MyOrdersPagedWithErrorBoundary