"use client"

import React, { useState, useMemo } from 'react';
import { Search, Package, User, CreditCard, Truck, Calendar, DollarSign, Eye, X, Store, Copy, Check } from 'lucide-react';

const OrderManagementSystem = ({ 
  orders = [], 
  users = [], 
  isLoading = false, 
  error = null,
  showRecentOnly = false,
  maxItems = null,
  showStats = true,
  showFilters = true,
  title = "Order Management"
}) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Create user lookup map for efficient searching
  const userLookup = useMemo(() => {
    const lookup = {};
    users.forEach(user => {
      lookup[user.profileId] = user;
    });
    return lookup;
  }, [users]);

  // Get user info by profile ID
  const getUserInfo = (profileId) => {
    return userLookup[profileId] || { username: 'Unknown', email: 'N/A' };
  };

  // Filter statuses based on actual data
  const availableStatuses = useMemo(() => {
    const statuses = new Set(['all']);
    orders.forEach(orderGroup => {
      statuses.add(orderGroup.status.toLowerCase());
      orderGroup.orders?.forEach(order => {
        statuses.add(order.status.toLowerCase());
        if (order.paymentStatus) {
          statuses.add(order.paymentStatus.toLowerCase());
        }
      });
    });
    return Array.from(statuses);
  }, [orders]);

  // Process orders based on props
  const processedOrders = useMemo(() => {
    let result = [...orders];
    
    // Sort by creation date (newest first)
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // If showing recent only, filter by last 30 days
    if (showRecentOnly) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      result = result.filter(order => new Date(order.createdAt) > thirtyDaysAgo);
    }
    
    // Apply max items limit
    if (maxItems && maxItems > 0) {
      result = result.slice(0, maxItems);
    }
    
    return result;
  }, [orders, showRecentOnly, maxItems]);

  // Filter orders based on search and status
  const filteredOrders = useMemo(() => {
    return processedOrders.filter(orderGroup => {
      const query = searchQuery.toLowerCase();
      
      // Status filter
      if (filter !== 'all') {
        const hasMatchingStatus = orderGroup.status.toLowerCase() === filter ||
          orderGroup.orders?.some(order => 
            order.status.toLowerCase() === filter || 
            order.paymentStatus?.toLowerCase() === filter
          );
        if (!hasMatchingStatus) return false;
      }

      // Search filter
      if (searchQuery) {
        const customerInfo = getUserInfo(orderGroup.profileId);
        const searchMatch = 
          orderGroup.id.toLowerCase().includes(query) ||
          orderGroup.status.toLowerCase().includes(query) ||
          customerInfo.username.toLowerCase().includes(query) ||
          customerInfo.email.toLowerCase().includes(query) ||
          orderGroup.orders?.some(order => 
            order.id.toLowerCase().includes(query) ||
            order.items?.some(item => 
              item.product?.title?.toLowerCase().includes(query) ||
              item.product?.player?.toLowerCase().includes(query)
            )
          );
        if (!searchMatch) return false;
      }

      return true;
    });
  }, [processedOrders, filter, searchQuery, userLookup]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalRevenue = filteredOrders.reduce((sum, orderGroup) => sum + (orderGroup.totalAmount || 0), 0);
    const totalItems = filteredOrders.reduce((sum, orderGroup) => 
      sum + (orderGroup.orders?.reduce((itemSum, order) => 
        itemSum + (order.items?.length || 0), 0) || 0), 0);
    const uniqueCustomers = new Set(filteredOrders.map(order => order.profileId)).size;
    const uniqueVendors = new Set(filteredOrders.flatMap(order => 
      order.orders?.map(o => o.vendorProfileId) || []
    )).size;

    return [
      {
        name: 'Total Orders',
        value: filteredOrders.length.toLocaleString(),
        icon: Package,
        color: 'from-blue-500 to-blue-600',
      },
      {
        name: 'Total Revenue',
        value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        icon: DollarSign,
        color: 'from-green-500 to-green-600',
      },
      {
        name: 'Customers',
        value: uniqueCustomers.toLocaleString(),
        icon: User,
        color: 'from-purple-500 to-purple-600',
      },
      {
        name: 'Items Sold',
        value: totalItems.toLocaleString(),
        icon: Truck,
        color: 'from-orange-500 to-orange-600',
      }
    ];
  }, [filteredOrders]);

  const handleCopyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'paid': return 'bg-green-100 text-green-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'processing': return 'bg-blue-100 text-blue-800';
        case 'shipped': return 'bg-purple-100 text-purple-800';
        case 'delivered': return 'bg-green-100 text-green-800';
        case 'cancelled': return 'bg-red-100 text-red-800';
        case 'holding': return 'bg-orange-100 text-orange-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const CopyableId = ({ id, displayText, className = "" }) => {
    const isCopied = copiedId === id;
    
    return (
      <div 
        className={`flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-lg px-3 py-2 transition-all duration-200 group ${className}`}
        onClick={() => handleCopyToClipboard(id)}
        title={`Click to copy: ${id}`}
      >
        <span className="font-mono text-sm">{displayText}</span>
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    );
  };

  const UserAvatar = ({ userId, size = "w-8 h-8" }) => {
    const user = userLookup[userId];
    if (!user) return (
      <div className={`${size} bg-gray-300 rounded-full flex items-center justify-center`}>
        <User className="h-4 w-4 text-gray-500" />
      </div>
    );

    return (
      <div className="flex items-center gap-3">
        {user.profilePicture ? (
          <img 
            src={user.profilePicture || "/placeholder.svg"} 
            alt={user.username}
            className={`${size} rounded-full object-cover border-2 border-white shadow-sm`}
          />
        ) : (
          <div className={`${size} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold`}>
            {user.username?.[0]?.toUpperCase() || 'U'}
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 text-sm">
            {user.username}
            {user.role === 'VENDOR' && (
              <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                Vendor
              </span>
            )}
          </span>
          <span className="text-xs text-gray-500">{user.email}</span>
        </div>
      </div>
    );
  };

  const OrderDetailModal = ({ order, onClose }) => {
    if (!order) return null;

    const customerInfo = getUserInfo(order.profileId);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Order ID:</span> {order.id}</p>
                    <p><span className="font-medium">Status:</span> <StatusBadge status={order.status} /></p>
                    <p><span className="font-medium">Total Amount:</span> ${order.totalAmount.toFixed(2)}</p>
                    <p><span className="font-medium">Created:</span> {new Date(order.createdAt).toLocaleString()}</p>
                    <p><span className="font-medium">Updated:</span> {new Date(order.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Username:</span> {customerInfo.username}</p>
                    <p><span className="font-medium">Email:</span> {customerInfo.email}</p>
                    <p><span className="font-medium">Customer ID:</span> {order.profileId}</p>
                  </div>
                </div>
              </div>
            </div>

            {order.orders && order.orders.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Order Items</h3>
                {order.orders.map((subOrder, index) => {
                  const vendorInfo = getUserInfo(subOrder.vendorProfileId);
                  
                  return (
                    <div key={subOrder.id} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Vendor Information</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Vendor:</span> {vendorInfo.username}</p>
                            <p><span className="font-medium">Email:</span> {vendorInfo.email}</p>
                            <p><span className="font-medium">Vendor ID:</span> {subOrder.vendorProfileId}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Payment & Shipping</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="font-medium">Payment Status:</span> <StatusBadge status={subOrder.paymentStatus} /></p>
                            <p><span className="font-medium">Amount:</span> ${subOrder.totalAmount.toFixed(2)}</p>
                            {subOrder.shipping && (
                              <>
                                <p><span className="font-medium">Tracking:</span> {subOrder.shipping.trackingId}</p>
                                <p><span className="font-medium">Carrier:</span> {subOrder.shipping.carrier}</p>
                                <p><span className="font-medium">Service:</span> {subOrder.shipping.metadata?.service}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {subOrder.items && subOrder.items.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Items</h4>
                          <div className="space-y-3">
                            {subOrder.items.map((item) => (
                              <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded">
                                {item.product?.frontImageUrl && (
                                  <img 
                                    src={item.product.frontImageUrl || "/placeholder.svg"} 
                                    alt={item.product.title}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                )}
                                <div className="flex-1">
                                  <p className="font-medium">{item.product?.title}</p>
                                  <p className="text-sm text-gray-600">{item.product?.description}</p>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-xs text-gray-600">
                                    <p><span className="font-medium">Player:</span> {item.product?.player}</p>
                                    <p><span className="font-medium">Year:</span> {item.product?.year}</p>
                                    <p><span className="font-medium">Brand:</span> {item.product?.brand}</p>
                                    <p><span className="font-medium">Sport:</span> {item.product?.sport}</p>
                                    <p><span className="font-medium">Grade:</span> {item.product?.grade}</p>
                                    <p><span className="font-medium">Population:</span> {item.product?.population}</p>
                                    <p><span className="font-medium">Qty:</span> {item.quantity}</p>
                                    <p><span className="font-medium">Price:</span> ${item.price.toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Failed to fetch orders: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600">
          {showRecentOnly ? 'Recent orders from the last 30 days' : 'View and manage all customer orders'}
          {maxItems && ` (showing ${Math.min(maxItems, filteredOrders.length)} of ${processedOrders.length})`}
        </p>
      </div>

      {/* Stats Cards */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map(stat => (
            <div key={stat.name} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filter Bar */}
      {showFilters && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {availableStatuses.map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  filter === status 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders, customers, products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-80 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    {processedOrders.length === 0 ? 'No orders found' : 'No orders match your search criteria'}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((orderGroup) => {
                  const customerInfo = getUserInfo(orderGroup.profileId);
                  const totalItems = orderGroup.orders?.reduce((sum, order) => 
                    sum + (order.items?.length || 0), 0) || 0;

                  return (
                    <tr key={orderGroup.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="font-medium text-blue-600">{orderGroup.id.slice(0, 8)}...</div>
                          <div className="text-gray-500">{orderGroup.orders?.length || 0} sub-orders</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <UserAvatar userId={orderGroup.profileId} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Package className="h-4 w-4 mr-1 text-gray-400" />
                          {totalItems} items
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                          ${orderGroup.totalAmount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={orderGroup.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(orderGroup.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedOrder(orderGroup)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default OrderManagementSystem;
