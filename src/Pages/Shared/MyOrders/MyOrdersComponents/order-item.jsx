"use client"

import { Package, ChevronDown, ChevronUp, CreditCard, Calendar, Truck, AlertCircle } from "lucide-react"
import { formatDate } from "../formDate"
import { Share2, MoreVertical } from "lucide-react"
import { getMySharedOrders } from "../../../../api/orders"
import { useQuery } from "@tanstack/react-query"
import { FacebookIcon, FacebookShareButton, PinterestIcon, PinterestShareButton, TwitterIcon, TwitterShareButton } from "react-share"

export function OrderItem({ order, isExpanded, onToggleExpand }) {
    console.log(order.items[0]?.id)
const {
    data: sharedOrderGroups = [],
  } = useQuery({
    queryKey: ["sharedOrders"],
    queryFn: () => getMySharedOrders(order.items[0]?.id),
    refetchOnWindowFocus: false,
  })
  console.log(sharedOrderGroups)
const { cardName, cardImageUrl, cardDescription, shareUrl, hashtags, purchaseDate, productId } = sharedOrderGroups
console.log(shareUrl)
    const shareText = `I just got a "${cardName}" from GainCards Marketplace! Purchased on ${purchaseDate}. Check it out! ${hashtags};`
  return (
    <div className="p-4 border-b border-gray-200 last:border-0">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => onToggleExpand(order.id)}>
        <div className="flex items-center">
          <div className="mr-3">
            {order.items[0]?.product?.frontImageUrl ? (
              <div className="relative h-16 w-16 rounded-md overflow-hidden">
                <img
                  src={order.items[0]?.product?.frontImageUrl || "/placeholder.svg"}
                  alt={order.items[0]?.product?.title || "Product"}
                  className="object-cover h-full w-full"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/api/placeholder/64/64"
                  }}
                />
              </div>
            ) : (
              <div className="bg-gray-200 h-16 w-16 rounded-md flex items-center justify-center">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium">{order.items[0]?.product?.title || "Product"}</h3>
            <div className="text-sm text-gray-500">
              {order.items.length > 1
                ? `${order.items[0]?.product?.title} and ${order.items.length - 1} more items`
                : order.items[0]?.product?.description?.substring(0, 60) +
                  (order.items[0]?.product?.description?.length > 60 ? "..." : "")}
            </div>
          </div>
        </div>
        <div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Order Details</h4>
              <div className="text-sm">
                <div className="flex items-center mb-1">
                  <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                  <span>
                    Payment Status: <span className="font-medium">{order.paymentStatus}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>
                    Order Date: <span className="font-medium">{formatDate(order.createdAt)}</span>
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Shipping Information</h4>
              {order.shipping ? (
                <div className="text-sm">
                  <div className="flex items-center mb-1">
                    <Truck className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      Carrier: <span className="font-medium">{order.shipping.carrier}</span>
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Package className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      Tracking: <span className="font-medium">{order.shipping.trackingId}</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      Status: <span className="font-medium">{order.shipping.status}</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500">Shipping information not available yet</div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Items</h4>
            <div className="bg-gray-50 rounded-md">
              {order.items.map((item) => (
                <div key={item.id} className="p-3 border-b border-gray-200 last:border-0 flex justify-between">
                  <div>
                    <div className="font-medium">{item.product.title}</div>
                    <div className="text-sm text-gray-600">
                      {item.product.brand} • {item.product.grade} • #{item.product.cardNumber}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${item.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

<div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
        {/* Share buttons will still use the shareUrl provided by NestJS */}
        <FacebookShareButton url={shareUrl} quote={shareText} hashtag={hashtags.split(' ')[0]} >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={shareText} hashtags={hashtags.replace(/#/g, '').split(' ')} >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <PinterestShareButton url={shareUrl} media={cardImageUrl} description={shareText} >
          <PinterestIcon size={32} round />
        </PinterestShareButton>
        <button onClick={() => navigator.clipboard.writeText(shareUrl)} style={{ /* styles */ }}>🔗</button>
      </div>

      </div>

          <div className="mt-4 flex justify-end">
            <div className="text-right">
              <div className="text-sm text-gray-600">Total</div>
              <div className="text-xl font-semibold">${order.totalAmount.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
