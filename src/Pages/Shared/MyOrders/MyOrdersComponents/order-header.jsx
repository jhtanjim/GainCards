"use client"

import { Share2, Eye, Copy, Check } from "lucide-react"
import { useState, useCallback } from "react"
import { getMySharedOrders } from "../../../../api/orders"
import { useQuery } from "@tanstack/react-query"
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share"

export function OrderHeader({ orderGroup, onCardClick }) {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const firstOrder = orderGroup.orders[0]
  const firstItem = firstOrder?.items[0]

  const { data: sharedOrderGroups = {} } = useQuery({
    queryKey: ["sharedOrders", firstItem?.id],
    queryFn: () => getMySharedOrders(firstItem?.id),
    refetchOnWindowFocus: false,
    enabled: !!firstItem?.id,
  })

  const { cardName, cardImageUrl, cardDescription, shareUrl, hashtags, purchaseDate, productId } = sharedOrderGroups

  const showToastMessage = useCallback((message) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }, [])

  const handleCopyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(orderGroup.id)
      showToastMessage("Order ID copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy order ID:", err)
      showToastMessage("Failed to copy order ID")
    }
  }

  const handleViewDetails = () => {
    const detailsUrl = shareUrl || `/orders/${orderGroup.id}`
    window.open(detailsUrl, "_blank")
  }

  const handleCopyShareUrl = async () => {
    try {
      const urlToCopy = shareUrl || `${window.location.origin}/orders/${orderGroup.id}`
      await navigator.clipboard.writeText(urlToCopy)
      showToastMessage("Share link copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy share URL:", err)
      showToastMessage("Failed to copy share link")
    }
  }

  const getStatusStyles = (status) => {
    const statusMap = {
      DELIVERED: "bg-green-100 text-green-800",
      SHIPPED: "bg-blue-100 text-blue-800",
      PROCESSING: "bg-yellow-100 text-yellow-800",
      PENDING: "bg-orange-100 text-orange-800",
      CANCELLED: "bg-red-100 text-red-800"
    }
    return statusMap[status] || "bg-gray-100 text-gray-800"
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch (err) {
      return 'Invalid date'
    }
  }

  // Create share text for social media
  const shareText = cardName
    ? `I just got a "${cardName}" from GainCards Marketplace! Purchased on ${purchaseDate}. Check it out! ${hashtags || ''}`
    : `Check out my order #${orderGroup.id} from GainCards Marketplace!`

  return (
    <div className="p-4 bg-gray-50 border-b">
      {/* Order Info Section */}
      <div className="flex flex-col space-y-4">
        {/* Header Row */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start sm:items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-900 break-words">
                Order #{orderGroup.id || "N/A"}
              </h3>
              <button
                onClick={handleCopyOrderId}
                className="p-1.5 hover:bg-gray-200 rounded transition-colors touch-manipulation flex-shrink-0"
                title="Copy Order ID"
                aria-label="Copy Order ID"
              >
                <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              {formatDate(orderGroup.createdAt)}
            </p>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(orderGroup.status)}`}
            >
              {orderGroup.status || 'UNKNOWN'}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={handleViewDetails}
              className="flex items-center justify-center gap-1 px-3 py-2.5 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-md hover:bg-blue-700 transition-colors touch-manipulation min-h-[44px] flex-1 sm:flex-initial"
              aria-label="View order details"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden xs:inline">View Details</span>
              <span className="xs:hidden">View</span>
            </button>
          </div>
        </div>

        {/* Share Section - Always Visible */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-gray-200 p-3 sm:p-4">
          <h5 className="font-medium text-gray-900 mb-3 text-center text-sm sm:text-base">
            Share this Card
          </h5>
          
          {/* Share Buttons */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 flex-wrap mb-4">
            {shareUrl && (
              <>
                <FacebookShareButton
                  url={shareUrl}
                  quote={shareText}
                  hashtag={hashtags?.split(" ")[0]}
                  className="hover:scale-110 transition-transform duration-200 touch-manipulation"
                  aria-label="Share on Facebook"
                >
                  <FacebookIcon size={32} round className="sm:w-9 sm:h-9" />
                </FacebookShareButton>

                <TwitterShareButton
                  url={shareUrl}
                  title={shareText}
                  hashtags={hashtags?.replace(/#/g, "").split(" ").filter(Boolean)}
                  className="hover:scale-110 transition-transform duration-200 touch-manipulation"
                  aria-label="Share on Twitter"
                >
                  <TwitterIcon size={32} round className="sm:w-9 sm:h-9" />
                </TwitterShareButton>

                <PinterestShareButton
                  url={shareUrl}
                  media={cardImageUrl || ''}
                  description={shareText}
                  className="hover:scale-110 transition-transform duration-200 touch-manipulation"
                  aria-label="Share on Pinterest"
                >
                  <PinterestIcon size={32} round className="sm:w-9 sm:h-9" />
                </PinterestShareButton>
              </>
            )}

            <button
              onClick={handleCopyShareUrl}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
              title="Copy share link"
              aria-label="Copy share link"
            >
              🔗
            </button>

            {/* <button
              onClick={handleCopyOrderId}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
              title="Copy order ID"
              aria-label="Copy order ID"
            >
              📋
            </button> */}
          </div>

          {/* Share Description */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Share your Pokémon card with friends or post it in the{" "}
              <a
                href="https://www.facebook.com/groups/gaincards/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
              >
                GainCards Facebook Group
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[102] bg-green-600 text-white px-4 py-3 sm:px-6 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in max-w-[90vw] sm:max-w-none">
          <Check className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm font-medium break-words">{toastMessage}</span>
        </div>
      )}
    </div>
  )
}