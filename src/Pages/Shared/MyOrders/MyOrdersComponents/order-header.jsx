"use client"

import { Share2, MoreVertical } from "lucide-react"
import { SocialShareMenu } from "./social-share-menu"


export function OrderHeader({ orderGroup, showShareMenu, onToggleShareMenu, onShare, onCardClick }) {
  const firstOrder = orderGroup.orders[0]
  const firstItem = firstOrder?.items[0]

  return (
    <div className="p-4 bg-gray-50 border-b relative">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">Order #{orderGroup.id}</h3>
          <p className="text-sm text-gray-600">{new Date(orderGroup.createdAt).toLocaleDateString()}</p>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
              orderGroup.status === "DELIVERED"
                ? "bg-green-100 text-green-800"
                : orderGroup.status === "SHIPPED"
                  ? "bg-blue-100 text-blue-800"
                  : orderGroup.status === "PROCESSING"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
            }`}
          >
            {orderGroup.status}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggleShareMenu(orderGroup.id)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="Share this order"
          >
            <Share2 className="h-4 w-4" />
          </button>

          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showShareMenu === orderGroup.id && (
        <SocialShareMenu orderGroup={orderGroup} onClose={() => onToggleShareMenu(null)} onCardClick={onCardClick} />
      )}
    </div>
  )
}
