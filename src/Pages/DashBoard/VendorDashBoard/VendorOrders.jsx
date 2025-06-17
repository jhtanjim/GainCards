import React, { useState, useMemo } from 'react';
import { getVendorsOrders } from '../../../api/orders';
import { useQuery } from '@tanstack/react-query';

const VendorOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const { data: VendorsOrderGroups = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getVendorsOrders,
  });

  console.log(VendorsOrderGroups);

  // Copy to clipboard function
  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(''), 2000); // Clear after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Filter orders based on search term
  const filteredOrders = useMemo(() => {
    const orders = VendorsOrderGroups?.orders || [];
    
    if (!searchTerm.trim()) {
      return orders;
    }

    const searchLower = searchTerm.toLowerCase();
    
    return orders.filter(order => 
      order.id.toLowerCase().includes(searchLower) ||
      order.orderGroup.profile.user.username.toLowerCase().includes(searchLower) ||
      order.items[0]?.product.title.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower) ||
      order.paymentStatus.toLowerCase().includes(searchLower) ||
      order.shipping.status.toLowerCase().includes(searchLower) ||
      order.shipping.carrier.toLowerCase().includes(searchLower) ||
      order.shipping.trackingId.toLowerCase().includes(searchLower)
    );
  }, [VendorsOrderGroups?.orders, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500 text-lg">Error loading orders: {error.message}</div>
      </div>
    );
  }

  const orders = VendorsOrderGroups?.orders || [];
  const pagination = VendorsOrderGroups?.pagination || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status, type = 'order') => {
    let colorClass = '';
    
    if (type === 'order') {
      switch (status) {
        case 'PAID':
          colorClass = 'bg-green-100 text-green-800';
          break;
        case 'PENDING':
          colorClass = 'bg-yellow-100 text-yellow-800';
          break;
        case 'CANCELLED':
          colorClass = 'bg-red-100 text-red-800';
          break;
        default:
          colorClass = 'bg-gray-100 text-gray-800';
      }
    } else if (type === 'payment') {
      switch (status) {
        case 'HOLDING':
          colorClass = 'bg-orange-100 text-orange-800';
          break;
        case 'COMPLETED':
          colorClass = 'bg-green-100 text-green-800';
          break;
        case 'FAILED':
          colorClass = 'bg-red-100 text-red-800';
          break;
        default:
          colorClass = 'bg-gray-100 text-gray-800';
      }
    } else if (type === 'shipping') {
      switch (status) {
        case 'CREATED':
          colorClass = 'bg-blue-100 text-blue-800';
          break;
        case 'SHIPPED':
          colorClass = 'bg-purple-100 text-purple-800';
          break;
        case 'DELIVERED':
          colorClass = 'bg-green-100 text-green-800';
          break;
        default:
          colorClass = 'bg-gray-100 text-gray-800';
      }
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {status}
      </span>
    );
  };

  // Clickable text component with copy functionality
  const CopyableText = ({ text, label, className = "", children }) => (
    <button
      onClick={() => copyToClipboard(text, label)}
      className={`text-left hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded px-1 py-0.5 cursor-pointer ${className}`}
      title={`Click to copy ${label}`}
    >
      {children || text}
      {copiedText === label && (
        <span className="ml-2 text-xs text-green-600 font-medium">Copied!</span>
      )}
    </button>
  );

  return (
    <div className="p-6 max-w-full mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Vendor Orders</h1>
        <div className="text-sm text-gray-600 mb-4">
          Showing {filteredOrders.length} of {orders.length} orders
          {pagination.totalPages > 1 && ` (Page ${pagination.page} of ${pagination.totalPages})`}
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search orders by ID, customer, product, status, carrier, or tracking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {searchTerm ? 'No orders found matching your search' : 'No orders found'}
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shipping
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <CopyableText 
                        text={order.id} 
                        label="Order ID"
                        className="font-medium"
                      >
                        <span className="hidden lg:inline">#{order.id}</span>
                        <span className="lg:hidden">#{order.id.slice(-8)}</span>
                      </CopyableText>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <CopyableText 
                          text={order.orderGroup.profile.user.username} 
                          label="Username"
                          className="font-medium block"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <img
                          src={order.items[0]?.product.frontImageUrl}
                          alt={order.items[0]?.product.title}
                          className="w-10 h-10 object-cover rounded-lg mr-3"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/40x40?text=No+Image';
                          }}
                        />
                        <div>
                          <CopyableText 
                            text={order.items[0]?.product.title} 
                            label="Product Title"
                            className="font-medium block"
                          />
                          <div className="text-gray-500">Qty: {order.items[0]?.quantity}</div>
                          {order.items.length > 1 && (
                            <div className="text-gray-500">+{order.items.length - 1} more</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <CopyableText 
                        text={formatAmount(order.totalAmount)} 
                        label="Amount"
                        className="font-medium"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getStatusBadge(order.status, 'order')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getStatusBadge(order.paymentStatus, 'payment')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getStatusBadge(order.shipping.status, 'shipping')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <CopyableText 
                          text={formatDate(order.createdAt)} 
                          label="Created Date"
                          className="block"
                        />
                        {order.updatedAt !== order.createdAt && (
                          <div className="text-xs text-gray-400">
                            Updated: <CopyableText 
                              text={formatDate(order.updatedAt)} 
                              label="Updated Date"
                              className="inline"
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <CopyableText 
                          text={order.shipping.carrier} 
                          label="Carrier"
                          className="font-medium block"
                        />
                        <CopyableText 
                          text={order.shipping.trackingId} 
                          label="Tracking ID"
                          className="text-xs text-gray-500 font-mono block"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Info */}
      {pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
            {searchTerm && ` (filtered from ${orders.length} total)`}
          </div>
          <div className="text-sm text-gray-500">
            Page {pagination.page} of {pagination.totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorOrders;