"use client"

import { Share2, Copy, Check, X } from "lucide-react"
import { useState } from "react"
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  LinkedinIcon,
} from "react-share"
import { CardPreview } from "./card-preview"

export function SocialShareMenu({ orderGroup, onClose, onCardClick }) {
  const [copied, setCopied] = useState(false)
  const firstOrder = orderGroup.orders[0]
  const firstItem = firstOrder?.items[0]

  if (!firstItem?.product) return null

  const product = firstItem.product
  const productUrl = `${window.location.origin}/cards/${product.id}`
  const shareTitle = `Check out this amazing ${product.title}!`
  const shareDescription = `${product.description || "Amazing card deal"} - Only $${firstItem.price}. Get yours now!`
  const hashtags = ["cards", "deals", product.brand?.toLowerCase().replace(/\s+/g, "") || "shopping"].filter(Boolean)

  const copyToClipboard = async () => {
    const textToCopy = `${shareTitle}\n${shareDescription}\n${productUrl}`

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = textToCopy
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-800 flex items-center">
            <Share2 className="h-5 w-5 mr-2 text-blue-600" />
            Share Your Card Purchase
          </h4>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <CardPreview product={product} price={firstItem.price} onCardClick={onCardClick} />

        <div className="mt-4 space-y-3">
          {/* Social Media Share Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <FacebookShareButton url={productUrl} quote={shareTitle} hashtag={`#${hashtags[0]}`} className="w-full">
              <div className="flex items-center justify-center w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">
                <FacebookIcon size={20} round className="mr-2" />
                Facebook
              </div>
            </FacebookShareButton>

            <TwitterShareButton url={productUrl} title={shareTitle} hashtags={hashtags} className="w-full">
              <div className="flex items-center justify-center w-full px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium text-sm">
                <TwitterIcon size={20} round className="mr-2" />
                Twitter
              </div>
            </TwitterShareButton>

            <WhatsappShareButton url={productUrl} title={`${shareTitle}\n${shareDescription}`} className="w-full">
              <div className="flex items-center justify-center w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium text-sm">
                <WhatsappIcon size={20} round className="mr-2" />
                WhatsApp
              </div>
            </WhatsappShareButton>

            <EmailShareButton
              url={productUrl}
              subject={shareTitle}
              body={`${shareDescription}\n\nCheck it out here: ${productUrl}`}
              className="w-full"
            >
              <div className="flex items-center justify-center w-full px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium text-sm">
                <EmailIcon size={20} round className="mr-2" />
                Email
              </div>
            </EmailShareButton>
          </div>

          {/* LinkedIn Share Button */}
          <LinkedinShareButton url={productUrl} title={shareTitle} summary={shareDescription} className="w-full">
            <div className="flex items-center justify-center w-full px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium text-sm">
              <LinkedinIcon size={20} round className="mr-2" />
              Share on LinkedIn
            </div>
          </LinkedinShareButton>

          {/* Copy Link Button */}
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium text-sm border"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2 text-green-600" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            {copied ? "Link copied! Paste it anywhere to share 📋" : "Share your awesome card find with friends! 🃏"}
          </p>
        </div>
      </div>
    </div>
  )
}
