"use client"

import { Share2, MoreVertical, Eye, Copy } from "lucide-react"
import { useState } from "react"
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

export function OrderHeader({ orderGroup, showShareMenu, onToggleShareMenu, onShare, onCardClick }) {
  const [showToast, setShowToast] = useState(false)
  const firstOrder = orderGroup.orders[0]
  const firstItem = firstOrder?.items[0]

  const { data: sharedOrderGroups = [] } = useQuery({
    queryKey: ["sharedOrders", firstItem?.id],
    queryFn: () => getMySharedOrders(firstItem?.id),
    refetchOnWindowFocus: false,
    enabled: !!firstItem?.id,
  })

  const { cardName, cardImageUrl, cardDescription, shareUrl, hashtags, purchaseDate, productId } = sharedOrderGroups
  console.log(shareUrl)

  const handleCopyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(orderGroup.id)
      setShowToast(true)
      // Hide toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000)
    } catch (err) {
      console.error("Failed to copy order ID:", err)
    }
  }

  const handleViewDetails = () => {
    // Use shareUrl if available, otherwise fallback to order details URL
    const detailsUrl = shareUrl || `/orders/${orderGroup.id}`
    window.open(detailsUrl, "_blank")
  }

  const handleShare = () => {
    if (shareUrl) {
      // Open share dialog or copy share URL
      navigator.clipboard.writeText(shareUrl)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } else {
      onShare(orderGroup)
    }
  }

  const handleCopyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || orderGroup.id)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (err) {
      console.error("Failed to copy share URL:", err)
    }
  }

  // Create share text for social media
  const shareText = cardName
    ? `I just got a "${cardName}" from GainCards Marketplace! Purchased on ${purchaseDate}. Check it out! ${hashtags}`
    : `Check out my order #${orderGroup.id} from GainCards Marketplace!`

  return (
    <div className="p-4 bg-gray-50 border-b relative overflow-visible">
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-start">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start sm:items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-900 break-words">
              Order #{orderGroup.id || "N/A"}
            </h3>
            <button
              onClick={handleCopyOrderId}
              className="p-1.5 hover:bg-gray-200 rounded transition-colors touch-manipulation flex-shrink-0"
              title="Copy Order ID"
            >
              <Copy className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">{new Date(orderGroup.createdAt).toLocaleDateString()}</p>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
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

        <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
          <button
            onClick={handleViewDetails}
            className="flex items-center justify-center gap-1 px-3 py-2.5 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-md hover:bg-blue-700 transition-colors touch-manipulation min-h-[44px] flex-1 sm:flex-initial"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden xs:inline">View Details</span>
            <span className="xs:hidden">View</span>
          </button>

          <button
            onClick={() => onToggleShareMenu(orderGroup.id)}
            className="p-2.5 sm:p-2 hover:bg-gray-200 rounded-md transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="More options"
          >
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[102] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <div className="h-2 w-2 bg-white rounded-full"></div>
          <span className="text-sm font-medium">Order ID copied to clipboard!</span>
        </div>
      )}

      {/* Share Menu Dropdown - Responsive */}
      {showShareMenu === orderGroup.id && (
        <>
          {/* Backdrop for all devices */}
          <div className="fixed inset-0 bg-black bg-opacity-30 z-[100]" onClick={() => onToggleShareMenu(null)} />

          {/* Share menu - Mobile bottom sheet, Desktop dropdown */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-[101] max-h-[85vh] overflow-y-auto md:absolute md:top-full md:right-0 md:left-auto md:bottom-auto md:rounded-xl md:min-w-[320px] md:max-w-[400px] md:max-h-[600px] md:mt-2">
            {/* Mobile handle */}
            <div className="px-4 py-3 border-b border-gray-100 md:hidden">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3"></div>
              <h4 className="font-semibold text-gray-900 text-center text-lg">Share this order</h4>
              <p className="text-sm text-gray-500 text-center mt-1">Share your order with friends and family</p>
            </div>

            {/* Desktop header */}
            <div className="hidden md:block px-4 py-3 border-b border-gray-100">
              <h4 className="font-semibold text-gray-900 text-base">Share this order</h4>
              <p className="text-sm text-gray-500 mt-1">Share your order with friends and family</p>
            </div>

            {/* Share content */}
            <div className="px-4 py-4">
              {/* Social media buttons */}
              {shareUrl && (
                <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4 md:gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <FacebookShareButton
                      url={shareUrl}
                      quote={shareText}
                      hashtag={hashtags?.split(" ")[0]}
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      <div className="w-12 h-12 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <FacebookIcon size={24} round className="text-white" />
                      </div>
                    </FacebookShareButton>
                    <span className="text-xs text-gray-600 font-medium">Facebook</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <TwitterShareButton
                      url={shareUrl}
                      title={shareText}
                      hashtags={hashtags?.replace(/#/g, "").split(" ")}
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      <div className="w-12 h-12 md:w-10 md:h-10 bg-sky-500 rounded-full flex items-center justify-center">
                        <TwitterIcon size={24} round className="text-white" />
                      </div>
                    </TwitterShareButton>
                    <span className="text-xs text-gray-600 font-medium">Twitter</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <PinterestShareButton
                      url={shareUrl}
                      media={cardImageUrl}
                      description={shareText}
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      <div className="w-12 h-12 md:w-10 md:h-10 bg-red-600 rounded-full flex items-center justify-center">
                        <PinterestIcon size={24} round className="text-white" />
                      </div>
                    </PinterestShareButton>
                    <span className="text-xs text-gray-600 font-medium">Pinterest</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={handleCopyShareUrl}
                      className="w-12 h-12 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                      title="Copy share link"
                    >
                      🔗
                    </button>
                    <span className="text-xs text-gray-600 font-medium">Copy Link</span>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleShare}
                  className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center gap-3 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Share2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Share Order</div>
                    <div className="text-sm text-gray-500">Copy share link to clipboard</div>
                  </div>
                </button>

                <button
                  onClick={handleCopyOrderId}
                  className="w-full px-4 py-3 bg-green-50 hover:bg-green-100 rounded-xl flex items-center gap-3 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Copy className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Copy Order ID</div>
                    <div className="text-sm text-gray-500">Copy #{orderGroup.id} to clipboard</div>
                  </div>
                </button>
              </div>

              {/* Close button for mobile */}
              <button
                onClick={() => onToggleShareMenu(null)}
                className="w-full mt-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold md:hidden transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        @media (max-width: 640px) {
          .animate-slide-in {
            animation: slide-in-mobile 0.3s ease-out;
          }
        }
        
        @keyframes slide-in-mobile {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        /* Custom breakpoint for extra small screens */
        @media (min-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
          .xs\\:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
