"use client";

import { useQuery } from "@tanstack/react-query";
import { Eye, Filter, Package, Search } from "lucide-react";
import { useState } from "react";
import { getAllOrders } from "../../../api/orders";
import { useAuth } from "../../../Context/AuthContext";

// Example: Replace with your actual context/hook for getting logged-in user

const VendorOrders = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

   const { data: orders = [], isLoading, error } = useQuery({
     queryKey: ['orders'],
     queryFn: getAllOrders,
   })
 

const filteredOrders = orders
  .filter((order) => order.profileId === user?.profileId) // Show only the vendor's orders
  .filter((order) => {
    const search = searchTerm.toLowerCase();
    return (
      (order.id.toLowerCase().includes(search) ||
        order.paymentIntentId?.toLowerCase().includes(search)) &&
      (statusFilter === "All" || order.status === statusFilter)
    );
  });
   console.log(filteredOrders)


  const updateOrderStatus = (id, newStatus) => {
    console.log(`Update order ${id} to ${newStatus}`);
    // Add mutation logic here
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Vendor Orders</h1>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by ID or Payment Intent..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              className="rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Intent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.paymentIntentId || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full 
                        ${
                          order.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : order.status === "PROCESSING"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "SHIPPED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    ${(order.totalAmount ).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {/* <div className="flex space-x-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      {order.status === "PROCESSING" && (
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          title="Mark as Shipped"
                          onClick={() => updateOrderStatus(order.id, "SHIPPED")}
                        >
                          <Package size={18} />
                        </button>
                      )}
                    </div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!isLoading && filteredOrders.length === 0 && (
          <div className="text-center py-4 text-gray-500">No orders found</div>
        )}
      </div>
    </div>
  );
};

export default VendorOrders;
