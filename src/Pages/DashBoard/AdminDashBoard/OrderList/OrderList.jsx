import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllOrders } from '../../../../api/orders'
import OrderFilterBar from './OrderFilterBar'
import OrderTable from './OrderTable'
import { data } from 'react-router-dom'

const OrderList = () => {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  })
  console.log(orders)

  const filteredOrders = orders.filter(order => {
    const query = searchQuery.toLowerCase()
    if (filter !== 'all' && order.status.toLowerCase() !== filter) return false
    if (searchQuery) {
      return (
        order.id.toLowerCase().includes(query) ||
        order.paymentStatus.toLowerCase().includes(query)
      )
    }
    return true
  })

  if (isLoading) return <p>Loading orders...</p>
  if (error) return <p>Failed to fetch orders</p>

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <p className="text-gray-600">View and manage all customer orders</p>
      </div>

      <OrderFilterBar 
        filter={filter} 
        setFilter={setFilter} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <OrderTable orders={filteredOrders} />
    </div>
  )
}

export default OrderList
