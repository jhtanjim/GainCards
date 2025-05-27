"use client";

import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Filter,
  Loader2,
  Package,
  RefreshCw,
  Search,
  Truck,
  Share2,
  Facebook,
  Twitter,
  MessageCircle,
  Link,
  Copy
} from "lucide-react";
import { useState } from "react";
import { getMyOrders } from "../../../api/orders";

export default function MyOrdersPage() {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showShareMenu, setShowShareMenu] = useState(null);

  const {
    data: orderGroups = [],
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
    refetchOnWindowFocus: false,
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "SHIPPED":
        return "bg-blue-100 text-blue-800";
      case "DELIVERED":
        return "bg-purple-100 text-purple-800";
      case "PROCESSING":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleOrderExpand = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const toggleShareMenu = (orderGroupId) => {
    if (showShareMenu === orderGroupId) {
      setShowShareMenu(null);
    } else {
      setShowShareMenu(orderGroupId);
    }
  };

  // Generate share content for an order
  const generateShareContent = (orderGroup) => {
    const orderSummary = orderGroup.orders[0];
    const itemCount = orderGroup.orders.reduce((total, order) => total + order.items.length, 0);
    const firstProduct = orderSummary.items[0]?.product?.title || "Product";
    
    // Updated share text to say "I just bought this card"
    const shareText = `🃏 I just bought this card! ${firstProduct}${itemCount > 1 ? ` and ${itemCount - 1} more cards` : ''} for $${orderGroup.totalAmount.toFixed(2)}. Order #${orderGroup.id.substring(0, 8)} - Status: ${orderGroup.status} 📦`;
    
    const shareUrl = `${window.location.origin}/orders/${orderGroup.id}`;
    
    return { shareText, shareUrl };
  };

  // Add this function to handle card clicks - redirects to product page
  const handleCardClick = (product) => {
    // Assuming your product pages follow this pattern - adjust as needed
    const productUrl = `/products/${product.id}` || `/cards/${product.id}`;
    window.open(productUrl, '_blank');
  };

  // Add this new function to generate a visual card preview for sharing
  const generateCardPreview = (orderGroup) => {
    const firstOrder = orderGroup.orders[0];
    const firstItem = firstOrder?.items[0];
    
    if (!firstItem?.product) return null;

    const product = firstItem.product;
    
    return (
      <div 
        className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
        onClick={() => handleCardClick(product)}
      >
        <div className="flex items-center space-x-4">
          <div className="relative h-20 w-16 rounded-md overflow-hidden shadow-md">
            {product.frontImageUrl ? (
              <img
                src={product.frontImageUrl}
                alt={product.title}
                className="object-cover h-full w-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/api/placeholder/64/80";
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
            {product.cardNumber && (
              <div className="text-xs text-gray-500">
                Card #{product.cardNumber}
              </div>
            )}
            <div className="text-lg font-bold text-green-600 mt-1">
              ${firstItem.price.toFixed(2)}
            </div>
          </div>
          <div className="text-blue-500">
            <ChevronDown className="h-5 w-5 transform -rotate-90" />
          </div>
        </div>
        <div className="text-center mt-2 text-sm text-blue-600 font-medium">
          Click to view on site
        </div>
      </div>
    );
  };

  // Share functions
  const shareToFacebook = (orderGroup) => {
    const { shareText, shareUrl } = generateShareContent(orderGroup);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(null);
  };

  const shareToTwitter = (orderGroup) => {
    const { shareText, shareUrl } = generateShareContent(orderGroup);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(null);
  };

  const shareToWhatsApp = (orderGroup) => {
    const { shareText, shareUrl } = generateShareContent(orderGroup);
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
    setShowShareMenu(null);
  };

  const copyToClipboard = async (orderGroup) => {
    const { shareText, shareUrl } = generateShareContent(orderGroup);
    const textToCopy = `${shareText}\n${shareUrl}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('Order details copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Order details copied to clipboard!');
    }
    setShowShareMenu(null);
  };

  const shareViaWebAPI = async (orderGroup) => {
    const { shareText, shareUrl } = generateShareContent(orderGroup);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Card Purchase',
          text: shareText,
          url: shareUrl,
        });
        setShowShareMenu(null);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copy to clipboard
      copyToClipboard(orderGroup);
    }
  };

  // Updated share menu component with card preview
  const ShareMenuWithCardPreview = ({ orderGroup }) => (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
      <div className="p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Share Your Purchase</h4>
        
        {/* Card Preview */}
        {generateCardPreview(orderGroup)}
        
        {/* Share Options */}
        <div className="mt-4 space-y-1">
          <button
            onClick={() => shareToFacebook(orderGroup)}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
          >
            <Facebook className="h-4 w-4 mr-3 text-blue-600" />
            Share on Facebook
          </button>
          <button
            onClick={() => shareToTwitter(orderGroup)}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
          >
            <Twitter className="h-4 w-4 mr-3 text-blue-400" />
            Share on Twitter
          </button>
          <button
            onClick={() => shareToWhatsApp(orderGroup)}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
          >
            <MessageCircle className="h-4 w-4 mr-3 text-green-500" />
            Share on WhatsApp
          </button>
          <button
            onClick={() => copyToClipboard(orderGroup)}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
          >
            <Copy className="h-4 w-4 mr-3 text-gray-500" />
            Copy to Clipboard
          </button>
          {navigator.share && (
            <button
              onClick={() => shareViaWebAPI(orderGroup)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
            >
              <Share2 className="h-4 w-4 mr-3 text-gray-500" />
              More Options
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Filter and search functionality
  const filteredOrders = orderGroups.filter((orderGroup) => {
    // Status filter
    if (statusFilter !== "ALL" && orderGroup.status !== statusFilter) {
      return false;
    }

    // Search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();

      // Search in order ID
      if (orderGroup.id.toLowerCase().includes(searchLower)) {
        return true;
      }

      // Search in items
      const hasMatchingItem = orderGroup.orders.some((order) =>
        order.items.some(
          (item) =>
            item.product?.title?.toLowerCase().includes(searchLower) ||
            item.product?.description?.toLowerCase().includes(searchLower) ||
            item.product?.brand?.toLowerCase().includes(searchLower)
        )
      );

      if (hasMatchingItem) {
        return true;
      }

      return false;
    }

    return true;
  });

  // Calculate total count of orders
  const orderCount = orderGroups.length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <div className="text-sm text-gray-500 mt-2 md:mt-0">
          {orderCount > 0 && (
            <span>
              {orderCount} order{orderCount !== 1 ? "s" : ""} found
            </span>
          )}
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders by ID, product name..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="PAID">Paid</option>
                <option value="PENDING">Pending</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          <button
            className="flex items-center justify-center px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            {isRefetching ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            Loading your orders...
          </h3>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Error loading your orders
          </h3>
          <p className="text-red-600 mb-4">
            {error?.message || "Something went wrong. Please try again."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
      {/* Empty State */}
      {!isLoading && !isError && filteredOrders.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {searchTerm || statusFilter !== "ALL" ? (
            // No results from filter
            <div>
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No matching orders found
              </h3>
              <p className="mt-1 text-gray-500 mb-4">
                Try changing your search or filter settings.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("ALL");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            // No orders at all
            <div>
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No orders yet
              </h3>
              <p className="mt-1 text-gray-500">
                Start shopping to see your orders here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Order List */}
      {!isLoading && !isError && filteredOrders.length > 0 && (
        <div className="space-y-6">
          {filteredOrders.map((orderGroup) => (
            <div
              key={orderGroup.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="border-b border-gray-200 p-4 bg-gray-50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-lg font-semibold">
                        Order #{orderGroup.id.substring(0, 8)}
                      </h2>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                          orderGroup.status
                        )}`}
                      >
                        {orderGroup.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(orderGroup.createdAt)}
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center space-x-3">
                    <span className="font-semibold text-lg">
                      ${orderGroup.totalAmount.toFixed(2)}
                    </span>
                    
                    {/* Share Button */}
                    <div className="relative">
                      <button
                        onClick={() => toggleShareMenu(orderGroup.id)}
                        className="flex items-center justify-center p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                        title="Share order"
                      >
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </button>

                      {/* Share Menu */}
                      {showShareMenu === orderGroup.id && (
                        <ShareMenuWithCardPreview orderGroup={orderGroup} />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {orderGroup.orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 border-b border-gray-200 last:border-0"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleOrderExpand(order.id)}
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        {order.items[0]?.product?.frontImageUrl ? (
                          <div className="relative h-16 w-16 rounded-md overflow-hidden">
                            <img
                              src={order.items[0]?.product?.frontImageUrl}
                              alt={order.items[0]?.product?.title || "Product"}
                              className="object-cover h-full w-full"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/api/placeholder/64/64";
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
                        <h3 className="font-medium">
                          {order.items[0]?.product?.title || "Product"}
                        </h3>
                        <div className="text-sm text-gray-500">
                          {order.items.length > 1
                            ? `${order.items[0]?.product?.title} and ${
                                order.items.length - 1
                              } more items`
                            : order.items[0]?.product?.description?.substring(
                                0,
                                60
                              ) +
                              (order.items[0]?.product?.description?.length > 60
                                ? "..."
                                : "")}
                        </div>
                      </div>
                    </div>
                    <div>
                      {expandedOrderId === order.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {expandedOrderId === order.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Order Details</h4>
                          <div className="text-sm">
                            <div className="flex items-center mb-1">
                              <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                              <span>
                                Payment Status:{" "}
                                <span className="font-medium">
                                  {order.paymentStatus}
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                              <span>
                                Order Date:{" "}
                                <span className="font-medium">
                                  {formatDate(order.createdAt)}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">
                            Shipping Information
                          </h4>
                          {order.shipping ? (
                            <div className="text-sm">
                              <div className="flex items-center mb-1">
                                <Truck className="h-4 w-4 mr-2 text-gray-500" />
                                <span>
                                  Carrier:{" "}
                                  <span className="font-medium">
                                    {order.shipping.carrier}
                                  </span>
                                </span>
                              </div>
                              <div className="flex items-center mb-1">
                                <Package className="h-4 w-4 mr-2 text-gray-500" />
                                <span>
                                  Tracking:{" "}
                                  <span className="font-medium">
                                    {order.shipping.trackingId}
                                  </span>
                                </span>
                              </div>
                              <div className="flex items-center">
                                <AlertCircle className="h-4 w-4 mr-2 text-gray-500" />
                                <span>
                                  Status:{" "}
                                  <span className="font-medium">
                                    {order.shipping.status}
                                  </span>
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">
                              Shipping information not available yet
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Items</h4>
                        <div className="bg-gray-50 rounded-md">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="p-3 border-b border-gray-200 last:border-0 flex justify-between"
                            >
                              <div>
                                <div className="font-medium">
                                  {item.product.title}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {item.product.brand} • {item.product.grade} •
                                  #{item.product.cardNumber}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  Quantity: {item.quantity}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">
                                  ${item.price.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Total</div>
                          <div className="text-xl font-semibold">
                            ${order.totalAmount.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowShareMenu(null)}
        />
      )}
    </div>
  );
}