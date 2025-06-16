"use client"

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getMyOrders } from "../api/orders"

export function useOrders() {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")

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

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  const filteredOrders = orderGroups.filter((orderGroup) => {
    if (statusFilter !== "ALL" && orderGroup.status !== statusFilter) {
      return false
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()

      if (orderGroup.id && orderGroup.id.toLowerCase().includes(searchLower)) {
        return true
      }

      const hasMatchingItem = orderGroup.orders?.some((order) =>
        order.items?.some(
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

  return {
    orderGroups: filteredOrders,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    expandedOrderId,
    toggleOrderExpand,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
  }
}
