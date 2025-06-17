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
    <div className="p-3 sm:p-4 bg-gray-50 border-b relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-base sm:text-lg text-gray-900 truncate">
              Order #{orderGroup.id}
            </h3>
            <button
              onClick={handleCopyOrderId}
              className="p-1.5 sm:p-1 hover:bg-gray-200 rounded transition-colors touch-manipulation"
              title="Copy Order ID"
            >
              <Copy className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {new Date(orderGroup.createdAt).toLocaleDateString()}
          </p>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
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
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleViewDetails}
            className="flex items-center gap-1 px-3 py-2 sm:py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors touch-manipulation min-h-[44px] sm:min-h-auto"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden xs:inline">View Details</span>
            <span className="xs:hidden">View</span>
          </button>
          
          <button
            onClick={() => onToggleShareMenu(orderGroup.id)}
            className="p-2 hover:bg-gray-200 rounded transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="More options"
          >
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Toast Notification - Responsive positioning */}
      {showToast && (
        <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
          <div className="h-2 w-2 bg-white rounded-full flex-shrink-0"></div>
          <span className="text-sm">Order ID copied to clipboard!</span>
        </div>
      )}

      {/* Share Menu Dropdown - Responsive */}
      {showShareMenu === orderGroup.id && (
        <>
          {/* Mobile backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
            onClick={() => onToggleShareMenu(null)}
          />
          
          {/* Share menu */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-40 sm:absolute sm:top-12 sm:right-4 sm:bottom-auto sm:left-auto sm:rounded-xl sm:min-w-80 sm:max-w-sm">
            <div className="px-4 py-4 sm:pb-4 border-b border-gray-100">
              {/* Mobile handle */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden"></div>
              
              <h4 className="font-medium text-gray-900 mb-2 text-center sm:text-left">Share this order</h4>
              <p className="text-sm text-gray-500 text-center sm:text-left">Share your order with friends and family</p>
            </div>
            
            {/* Beautiful Share Buttons */}
            <div className="px-4 py-4 pb-6 sm:pb-4">
              <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-4 flex-wrap">
                {shareUrl && (
                  <>
                    <div className="flex flex-col items-center gap-1">
                      <FacebookShareButton 
                        url={shareUrl} 
                        quote={shareText} 
                        hashtag={hashtags?.split(' ')[0]} 
                        className="hover:scale-110 transition-transform duration-200 touch-manipulation"
                      >
                        <FacebookIcon size={44} round className="sm:w-10 sm:h-10" />
                      </FacebookShareButton>
                      <span className="text-xs text-gray-600 sm:hidden">Facebook</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-1">
                      <TwitterShareButton 
                        url={shareUrl} 
                        title={shareText} 
                        hashtags={hashtags?.replace(/#/g, '').split(' ')} 
                        className="hover:scale-110 transition-transform duration-200 touch-manipulation"
                      >
                        <TwitterIcon size={44} round className="sm:w-10 sm:h-10" />
                      </TwitterShareButton>
                      <span className="text-xs text-gray-600 sm:hidden">Twitter</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-1">
                      <PinterestShareButton 
                        url={shareUrl} 
                        media={cardImageUrl} 
                        description={shareText}
                        className="hover:scale-110 transition-transform duration-200 touch-manipulation"
                      >
                        <PinterestIcon size={44} round className="sm:w-10 sm:h-10" />
                      </PinterestShareButton>
                      <span className="text-xs text-gray-600 sm:hidden">Pinterest</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-1">
                      <button 
                        onClick={handleCopyShareUrl}
                        className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl touch-manipulation"
                        title="Copy share link"
                      >
                        🔗
                      </button>
                      <span className="text-xs text-gray-600 sm:hidden">Copy Link</span>
                    </div>
                  </>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleShare}
                  className="w-full text-left px-3 py-3 sm:py-2.5 hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors touch-manipulation"
                >
                  <div className="w-10 h-10 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Share2 className="h-5 w-5 sm:h-4 sm:w-4 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900">Share Order</div>
                    <div className="text-xs text-gray-500">Copy share link to clipboard</div>
                  </div>
                </button>
                
                <button
                  onClick={handleCopyOrderId}
                  className="w-full text-left px-3 py-3 sm:py-2.5 hover:bg-gray-50 rounded-lg flex items-center gap-3 transition-colors touch-manipulation"
                >
                  <div className="w-10 h-10 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Copy className="h-5 w-5 sm:h-4 sm:w-4 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900">Copy Order ID</div>
                    <div className="text-xs text-gray-500 truncate">Copy #{orderGroup.id} to clipboard</div>
                  </div>
                </button>
              </div>
              
              {/* Close button for mobile */}
              <button
                onClick={() => onToggleShareMenu(null)}
                className="w-full mt-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium sm:hidden touch-manipulation"
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