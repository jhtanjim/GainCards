import React from 'react'
import { Package, Truck, Clock, CreditCard, ChevronDown, ChevronUp, ExternalLink, MapPin } from "lucide-react"

const ShippingInfo = ({order}) => {
  return (
    <div>
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
  )
}

export default ShippingInfo
