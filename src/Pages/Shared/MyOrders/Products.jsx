import React from 'react'
import { Package, Truck, Clock, CreditCard, ChevronDown, ChevronUp, ExternalLink, MapPin } from "lucide-react"

const Products = ({order}) => {
  return (
    <div>
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
    </div>
  )
}

export default Products
