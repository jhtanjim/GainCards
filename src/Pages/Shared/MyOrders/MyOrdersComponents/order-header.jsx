"use client"

import { Share2, MoreVertical, Eye, Copy } from "lucide-react"
import { useState } from "react"
import { getMySharedOrders } from "../../../../api/orders"
import { useQuery } from "@tanstack/react-query"
import { FacebookIcon, FacebookShareButton, PinterestIcon, PinterestShareButton, TwitterIcon, TwitterShareButton } from "react-share"

export function OrderHeader({ orderGroup, showShareMenu, onToggleShareMenu, onShare, onCardClick }) {
  const [showToast, setShowToast] = useState(false)
  const firstOrder = orderGroup.orders[0]
  const firstItem = firstOrder?.items[0]
  
  const {
    data: sharedOrderGroups = [],
  } = useQuery({
    queryKey: ["sharedOrders", firstItem?.id],
    queryFn: () => getMySharedOrders(firstItem?.id),
    refetchOnWindowFocus: false,
    enabled: !!firstItem?.id
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
      console.error('Failed to copy order ID:', err)
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
      console.error('Failed to copy share URL:', err)
    }
  }

  // Create share text for social media
  const shareText = cardName 
    ? `I just got a "${cardName}" from GainCards Marketplace! Purchased on ${purchaseDate}. Check it out! ${hashtags}`
    : `Check out my order #${orderGroup.id} from GainCards Marketplace!`

  return (
    <div className="p-4 bg-gray-50 border-b relative">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">Order #{orderGroup.id}</h3>
            <button
              onClick={handleCopyOrderId}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="Copy Order ID"
            >
              <Copy className="h-4 w-4 text-gray-500" />
            </button>
          </div>
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
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleViewDetails}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            <Eye className="h-4 w-4" />
            View Details
          </button>
          
          <button
            onClick={() => onToggleShareMenu(orderGroup.id)}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="More options"
          >
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <div className="h-2 w-2 bg-white rounded-full"></div>
          Order ID copied to clipboard!
        </div>
      )}

      {/* Share Menu Dropdown */}
      {showShareMenu === orderGroup.id && (
        <div className="absolute top-12 right-4 bg-white border border-gray-200 rounded-xl shadow-xl py-4 z-20 min-w-80">
          <div className="px-4 pb-4 border-b border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">Share this order</h4>
            <p className="text-sm text-gray-500">Share your order with friends and family</p>
          </div>
          
          {/* Beautiful Share Buttons */}
          <div className="px-4 py-4">
            <div className="flex justify-center gap-4 mb-4">
              {shareUrl && (
                <>
                  <FacebookShareButton 
                    url={shareUrl} 
                    quote={shareText} 
                    hashtag={hashtags?.split(' ')[0]} 
                    className="hover:scale-110 transition-transform duration-200"
                  >
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  
                  <TwitterShareButton 
                    url={shareUrl} 
                    title={shareText} 
                    hashtags={hashtags?.replace(/#/g, '').split(' ')} 
                    className="hover:scale-110 transition-transform duration-200"
                  >
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  
                  <PinterestShareButton 
                    url={shareUrl} 
                    media={cardImageUrl} 
                    description={shareText}
                    className="hover:scale-110 transition-transform duration-200"
                  >
                    <PinterestIcon size={40} round />
                  </PinterestShareButton>
                  
                  <button 
                    onClick={handleCopyShareUrl}
                    className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
                    title="Copy share link"
                  >
                    🔗
                  </button>
                </>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleShare}
                className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Share2 className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Share Order</div>
                  <div className="text-xs text-gray-500">Copy share link to clipboard</div>
                </div>
              </button>
              
              <button
                onClick={handleCopyOrderId}
                className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Copy className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Copy Order ID</div>
                  <div className="text-xs text-gray-500">Copy #{orderGroup.id} to clipboard</div>
                </div>
              </button>
            </div>
          </div>
        </div>
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
      `}</style>
    </div>
  )
}