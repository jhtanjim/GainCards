"use client"

import { useEffect, useState } from "react"
import { getMyOrders } from "../../../api/orders"
import { Package, Truck, Clock, CreditCard, ChevronDown, ChevronUp, ExternalLink, MapPin } from "lucide-react"

// Helper function to get status color
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "processing":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "shipped":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// Format date helper
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

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
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-gray-50 border-b px-6 py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(order.status)}`}
                      >
                        {order.status.toLowerCase() === "shipped" ? (
                          <Truck className="h-6 w-6" />
                        ) : (
                          <Package className="h-6 w-6" />
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold">Order #{order.id.slice(-6)}</h2>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {formatDate(order.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="h-3.5 w-3.5 mr-1" />
                          {order.paymentStatus}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-xl font-bold">${order.totalAmount}</p>
                    </div>
                    <button
                      className="p-2 rounded-full hover:bg-gray-100"
                      onClick={() => toggleOrderExpansion(order.id)}
                      aria-label={expandedOrders[order.id] ? "Collapse order details" : "Expand order details"}
                    >
                      {expandedOrders[order.id] ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>
              </div>

              {expandedOrders[order.id] && (
                <div>
                  {/* Shipping Status */}
                  <div className="bg-gray-50 px-6 py-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm font-medium">Shipping Status:</span>
                        <span className="ml-2 text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-800 border border-yellow-200">
                          {order.shipping.status}
                        </span>
                      </div>
                      <button className="text-xs px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Track Order
                      </button>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="divide-y">
                    {order.items.map((item) => (
                      <div key={item.id} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          {/* Images */}
                          <div className="flex gap-2 md:col-span-1">
                            <div className="relative group">
                              <img
                                src={item.product.frontImageUrl || "/placeholder.svg"}
                                alt="Front"
                                className="w-24 h-36 md:w-28 md:h-40 object-cover rounded-lg border shadow-sm group-hover:shadow-md transition-all"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">
                                  Front
                                </span>
                              </div>
                            </div>
                            <div className="relative group">
                              <img
                                src={item.product.backImageUrl || "/placeholder.svg"}
                                alt="Back"
                                className="w-24 h-36 md:w-28 md:h-40 object-cover rounded-lg border shadow-sm group-hover:shadow-md transition-all"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">
                                  Back
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="md:col-span-3">
                            <h3 className="text-xl font-bold mb-2">{item.product.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{item.product.description}</p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Grade</span>
                                <span className="font-medium">{item.product.grade}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Price</span>
                                <span className="font-medium">${item.price}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Certification #</span>
                                <span className="font-medium">{item.product.certificationNumber}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Year</span>
                                <span className="font-medium">{item.product.year}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Player</span>
                                <span className="font-medium">{item.product.player}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Card #</span>
                                <span className="font-medium">{item.product.cardNumber}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Info */}
                  <div className="bg-gray-50 p-6 border-t">
                    <div className="flex items-center mb-3">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <h3 className="font-semibold">Shipping Address</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">{order.shipping.address.name}</p>
                        <p>{order.shipping.address.line1}</p>
                        {order.shipping.address.line2 && <p>{order.shipping.address.line2}</p>}
                        <p>
                          {order.shipping.address.city}, {order.shipping.address.state},{" "}
                          {order.shipping.address.country}
                        </p>
                        <p>Postal Code: {order.shipping.address.postalCode}</p>
                      </div>
                      <div className="md:text-right">
                        <p className="text-gray-500">Contact</p>
                        <p className="font-medium">{order.shipping.address.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders
