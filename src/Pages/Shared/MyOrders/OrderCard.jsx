import React from 'react'
import { Package, Truck, Clock, CreditCard, ChevronDown, ChevronUp, ExternalLink, MapPin } from "lucide-react"
import getStatusColor from './orderStatusColor.js';
import { formatDate } from './formDate'
import ShippingStatus from './ShippingStatus'
import Products from './Products'
import ShippingInfo from './ShippingInfo'



const OrderCard = ({order,expandedOrders,toggleOrderExpansion}) => {
  return (
    <div>
            <div
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

<ShippingStatus
order={order}
></ShippingStatus>

                

                  {/* Products */}
                 <Products order={order}/>

                  {/* Shipping Info */}
                  <ShippingInfo order={order}/>
                </div>
              )}
            </div>
        
    </div>
  )
}

export default OrderCard
