"use client"

import { useState, useRef } from "react"
import {
  Package,
  Truck,
  Clock,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Share2,
  Facebook,
  Twitter,
  MessageCircle,
  Copy,
  Download,
} from "lucide-react"
import getStatusColor from "./orderStatusColor.js"
import { formatDate } from "./formDate"
import ShippingStatus from "./ShippingStatus"
import Products from "./Products"
import ShippingInfo from "./ShippingInfo"

const OrderCard = ({ order, expandedOrders, toggleOrderExpansion }) => {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const canvasRef = useRef(null)

  // Generate share content for the order
  const generateShareContent = () => {
    const itemCount = order.items?.length || 0
    const firstProduct = order.items?.[0]?.product?.title || "Product"

    const shareText = `🃏 I just bought this card! ${firstProduct}${itemCount > 1 ? ` and ${itemCount - 1} more cards` : ""} for $${order.totalAmount}. Order #${order.id.slice(-6)} - Status: ${order.status} 📦`

    const shareUrl = `${window.location.origin}/orders/${order.id}`

    return { shareText, shareUrl }
  }

  // Generate a canvas image of the card for sharing
  const generateCardImage = async () => {
    const firstItem = order.items?.[0]
    if (!firstItem?.product) return null

    const product = firstItem.product
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add border
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 2
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

    // Header background
    ctx.fillStyle = "#f9fafb"
    ctx.fillRect(20, 20, canvas.width - 40, 80)

    // Title
    ctx.fillStyle = "#111827"
    ctx.font = "bold 32px Arial"
    ctx.fillText("🃏 Card Purchase", 40, 65)

    // Order info
    ctx.fillStyle = "#6b7280"
    ctx.font = "18px Arial"
    ctx.fillText(`Order #${order.id.slice(-6)} • ${order.status}`, 40, 90)

    try {
      // Load and draw product image if available
      if (product.frontImageUrl) {
        const img = new Image()
        img.crossOrigin = "anonymous"

        await new Promise((resolve, reject) => {
          img.onload = () => {
            // Draw product image
            const imgX = 40
            const imgY = 120
            const imgWidth = 200
            const imgHeight = 280

            ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight)

            // Add image border
            ctx.strokeStyle = "#d1d5db"
            ctx.lineWidth = 1
            ctx.strokeRect(imgX, imgY, imgWidth, imgHeight)

            resolve()
          }
          img.onerror = () => resolve() // Continue without image
          img.src = product.frontImageUrl
        })
      }
    } catch (error) {
      console.log("Could not load product image")
    }

    // Product details
    const detailsX = product.frontImageUrl ? 280 : 40
    const detailsY = 140

    ctx.fillStyle = "#111827"
    ctx.font = "bold 28px Arial"
    ctx.fillText(product.title || "Card", detailsX, detailsY)

    ctx.fillStyle = "#6b7280"
    ctx.font = "20px Arial"
    ctx.fillText(`Brand: ${product.brand || "N/A"}`, detailsX, detailsY + 40)
    ctx.fillText(`Grade: ${product.grade || "N/A"}`, detailsX, detailsY + 70)

    if (product.cardNumber) {
      ctx.fillText(`Card #${product.cardNumber}`, detailsX, detailsY + 100)
    }

    // Price
    ctx.fillStyle = "#059669"
    ctx.font = "bold 36px Arial"
    ctx.fillText(`$${firstItem.price?.toFixed(2) || order.totalAmount}`, detailsX, detailsY + 160)

    // Footer
    ctx.fillStyle = "#6b7280"
    ctx.font = "16px Arial"
    ctx.fillText(`Purchased on ${formatDate(order.createdAt)}`, 40, canvas.height - 40)

    return canvas.toDataURL("image/png")
  }

  // Share to Facebook with image
  const shareToFacebook = async () => {
    setIsGeneratingImage(true)

    try {
      const imageDataUrl = await generateCardImage()

      if (imageDataUrl) {
        // Convert data URL to blob
        const response = await fetch(imageDataUrl)
        const blob = await response.blob()

        // Create a temporary URL for the image
        const imageUrl = URL.createObjectURL(blob)

        // For Facebook sharing with image, we need to use a different approach
        // Since Facebook requires a publicly accessible URL, we'll download the image
        // and let the user share it manually, or use the Web Share API

        if (navigator.share) {
          // Use Web Share API if available
          const file = new File([blob], "card-purchase.png", { type: "image/png" })
          const { shareText } = generateShareContent()

          await navigator.share({
            title: "My Card Purchase",
            text: shareText,
            files: [file],
          })
        } else {
          // Fallback: Download image and open Facebook
          const link = document.createElement("a")
          link.download = `card-purchase-${order.id.slice(-6)}.png`
          link.href = imageDataUrl
          link.click()

          // Also open Facebook sharer
          const { shareText, shareUrl } = generateShareContent()
          const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText + "\n\nImage downloaded - attach it to your post!")}`
          window.open(facebookUrl, "_blank", "width=600,height=400")
        }

        // Clean up
        URL.revokeObjectURL(imageUrl)
      }
    } catch (error) {
      console.error("Error generating image:", error)
      // Fallback to text-only sharing
      const { shareText, shareUrl } = generateShareContent()
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
      window.open(facebookUrl, "_blank", "width=600,height=400")
    }

    setIsGeneratingImage(false)
    setShowShareMenu(false)
  }

  // Download card image
  const downloadCardImage = async () => {
    setIsGeneratingImage(true)

    try {
      const imageDataUrl = await generateCardImage()
      if (imageDataUrl) {
        const link = document.createElement("a")
        link.download = `card-purchase-${order.id.slice(-6)}.png`
        link.href = imageDataUrl
        link.click()
      }
    } catch (error) {
      console.error("Error generating image:", error)
    }

    setIsGeneratingImage(false)
  }

  // Share to Twitter
  const shareToTwitter = () => {
    const { shareText, shareUrl } = generateShareContent()
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, "_blank", "width=600,height=400")
    setShowShareMenu(false)
  }

  // Share to WhatsApp
  const shareToWhatsApp = () => {
    const { shareText, shareUrl } = generateShareContent()
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`
    window.open(whatsappUrl, "_blank")
    setShowShareMenu(false)
  }

  // Copy to clipboard
  const copyToClipboard = async () => {
    const { shareText, shareUrl } = generateShareContent()
    const textToCopy = `${shareText}\n${shareUrl}`

    try {
      await navigator.clipboard.writeText(textToCopy)
      alert("Order details copied to clipboard!")
    } catch (err) {
      const textArea = document.createElement("textarea")
      textArea.value = textToCopy
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      alert("Order details copied to clipboard!")
    }
    setShowShareMenu(false)
  }

  // Generate card preview for sharing menu
  const generateCardPreview = () => {
    const firstItem = order.items?.[0]

    if (!firstItem?.product) return null

    const product = firstItem.product

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="flex items-center space-x-4">
          <div className="relative h-20 w-16 rounded-md overflow-hidden shadow-md">
            {product.frontImageUrl ? (
              <img
                src={product.frontImageUrl || "/placeholder.svg"}
                alt={product.title}
                className="object-cover h-full w-full"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "/placeholder.svg?height=80&width=64"
                }}
              />
            ) : (
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <div className="text-sm text-gray-600">
              {product.brand} • Grade: {product.grade}
            </div>
            {product.cardNumber && <div className="text-xs text-gray-500">Card #{product.cardNumber}</div>}
            <div className="text-lg font-bold text-green-600 mt-1">
              ${firstItem.price?.toFixed(2) || order.totalAmount}
            </div>
          </div>
        </div>
        <div className="text-center mt-2 text-sm text-blue-600 font-medium">
          Share your purchase with a custom image!
        </div>
      </div>
    )
  }

  // Share menu component
  const ShareMenu = () => (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Share Your Purchase</h4>

        {/* Card Preview */}
        {generateCardPreview()}

        {/* Share Options */}
        <div className="mt-4 space-y-1">
          <button
            onClick={shareToFacebook}
            disabled={isGeneratingImage}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors disabled:opacity-50"
          >
            <Facebook className="h-4 w-4 mr-3 text-blue-600" />
            {isGeneratingImage ? "Generating Image..." : "Share on Facebook (with image)"}
          </button>

          <button
            onClick={downloadCardImage}
            disabled={isGeneratingImage}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors disabled:opacity-50"
          >
            <Download className="h-4 w-4 mr-3 text-gray-600" />
            {isGeneratingImage ? "Generating..." : "Download Card Image"}
          </button>

          <button
            onClick={shareToTwitter}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Twitter className="h-4 w-4 mr-3 text-blue-400" />
            Share on Twitter
          </button>

          <button
            onClick={shareToWhatsApp}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            <MessageCircle className="h-4 w-4 mr-3 text-green-500" />
            Share on WhatsApp
          </button>

          <button
            onClick={copyToClipboard}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Copy className="h-4 w-4 mr-3 text-gray-500" />
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="bg-gray-50 border-b px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="mr-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(order.status)}`}
                >
                  {order.status.toLowerCase() === "shipped" ? (
                    <Truck className="h-6 w-6" />
                  ) : (
                    <Package className="h-6 w-6" />
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">Order #{order.id.slice(-6)}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {formatDate(order.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-3.5 w-3.5 mr-1" />
                    {order.paymentStatus}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold">${order.totalAmount}</p>
              </div>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Share order"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>

                {/* Share Menu */}
                {showShareMenu && <ShareMenu />}
              </div>

              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => toggleOrderExpansion(order.id)}
                aria-label={expandedOrders[order.id] ? "Collapse order details" : "Expand order details"}
              >
                {expandedOrders[order.id] ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
          </div>
        </div>

        {expandedOrders[order.id] && (
          <div>
            {/* Shipping Status */}
            <ShippingStatus order={order} />

            {/* Products */}
            <Products order={order} />

            {/* Shipping Info */}
            <ShippingInfo order={order} />
          </div>
        )}
      </div>

      {/* Click outside to close share menu */}
      {showShareMenu && <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />}

      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  )
}

export default OrderCard