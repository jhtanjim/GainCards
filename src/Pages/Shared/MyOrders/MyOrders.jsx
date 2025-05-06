"use client"

import { useEffect, useState } from "react"
import { getMyOrders } from "../../../api/orders"
import { Package, Truck, Clock, CreditCard, ChevronDown, ChevronUp, ExternalLink, MapPin } from "lucide-react"
import OrderCard from "./OrderCard"



const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrders, setExpandedOrders] = useState({})

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders()
        setOrders(data)

        // Initialize expanded state for all orders
        const expandedState = {}
        data.forEach((order) => {
          expandedState[order.id] = true // Start with all expanded
        })
        setExpandedOrders(expandedState)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-10">My Orders</h1>
        <div className="animate-pulse space-y-3 mb-8">
          <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-32 w-full bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-40 w-full bg-gray-200 rounded"></div>
            <div className="h-40 w-full md:col-span-2 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="animate-pulse space-y-3 mb-8">
          <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-32 w-full bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-40 w-full bg-gray-200 rounded"></div>
            <div className="h-40 w-full md:col-span-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-center mb-10">
        <Package className="mr-2 h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md text-center py-16">
          <div className="flex flex-col items-center gap-4">
            <Package className="h-16 w-16 text-gray-300" />
            <h2 className="text-2xl font-semibold text-gray-700">No Orders Yet</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              You haven't placed any orders yet. Browse our collection and find your favorite Pokemon cards!
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Start Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">

{
  orders.map(order=><OrderCard
  key={order.id}
  order={order}
  expandedOrders={expandedOrders} 
  toggleOrderExpansion={toggleOrderExpansion}
  ></OrderCard>)
  
}

          
         
        </div>
      )}
    </div>
  )
}

export default MyOrders
