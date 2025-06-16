"use client"

import { Facebook } from "lucide-react"
import { CardPreview } from "./card-preview"


export function FacebookShareMenu({ orderGroup, onShare, onCardClick }) {
  const firstOrder = orderGroup.orders[0]
  const firstItem = firstOrder?.items[0]

  if (!firstItem?.product) return null

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
      <div className="p-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
          <Facebook className="h-5 w-5 mr-2 text-blue-600" />
          Share Your Card Purchase
        </h4>

        <CardPreview product={firstItem.product} price={firstItem.price} onCardClick={onCardClick} />

        <div className="mt-4">
          <button
            onClick={() => onShare(orderGroup)}
            className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <Facebook className="h-5 w-5 mr-3" />
            Share on Facebook
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">Share your awesome card find with friends! 🃏</p>
        </div>
      </div>
    </div>
  )
}
