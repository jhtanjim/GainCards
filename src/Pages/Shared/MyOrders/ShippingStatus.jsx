import React from 'react'
import { Package, Truck, Clock, CreditCard, ChevronDown, ChevronUp, ExternalLink, MapPin } from "lucide-react"

const ShippingStatus = ({order}) => {
  return (
    <div>
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
    </div>
  )
}

export default ShippingStatus
