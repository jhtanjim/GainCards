import React from 'react';
import { getVendorsOrders } from '../../../api/orders';
import { useQuery } from '@tanstack/react-query';

const VendorOrders = () => {
  const { data: VendorsOrderGroups = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getVendorsOrders,
  });

  console.log(VendorsOrderGroups);

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

  return (
    <div className="p-6 max-w-full mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Vendor Orders</h1>
        <div className="text-sm text-gray-600">
          Showing {orders.length} of {pagination.total} orders
          {pagination.totalPages > 1 && ` (Page ${pagination.page} of ${pagination.totalPages})`}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No orders found</div>
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
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id.slice(-8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{order.orderGroup.profile.user.username}</div>
                        <div className="text-gray-500">{order.orderGroup.profile.user.email}</div>
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
                          <div className="font-medium">{order.items[0]?.product.title}</div>
                          <div className="text-gray-500">Qty: {order.items[0]?.quantity}</div>
                          {order.items.length > 1 && (
                            <div className="text-gray-500">+{order.items.length - 1} more</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatAmount(order.totalAmount)}
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
                        <div>{formatDate(order.createdAt)}</div>
                        {order.updatedAt !== order.createdAt && (
                          <div className="text-xs text-gray-400">
                            Updated: {formatDate(order.updatedAt)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{order.shipping.carrier}</div>
                        <div className="text-xs text-gray-500 font-mono">
                          {order.shipping.trackingId}
                        </div>
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