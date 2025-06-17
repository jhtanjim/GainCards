import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { getAllPokemonData } from "../../../api/pokemondata";
import { useAuth } from "../../../Context/AuthContext";
import {  getVendorsOrders } from "../../../api/orders";

const VendorDashBoard = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedText, setCopiedText] = useState('');

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

  const { data: pokemons = [], isLoading: isLoadingPokemons } = useQuery({
    queryKey: ["pokemons"],
    queryFn: getAllPokemonData,
    onError: (err) => {
      console.error("Error fetching Pokemon data:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load Pokemon data. Please try again later.",
      });
    },
  });

  const userPokemons = React.useMemo(() => {
    if (!pokemons || !isAuthenticated) return [];
    return pokemons.filter((pokemon) => pokemon.vendorId === user?.id);
  }, [pokemons, isAuthenticated, user?.id]);

  const { data: ordersData = {}, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: getVendorsOrders,
  });

  // Extract orders array from the API response
  const orders = ordersData?.orders || [];

  // Filter orders based on search term
  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) {
      return orders;
    }

    const searchLower = searchTerm.toLowerCase();
    
    return orders.filter(order => 
      order.id.toLowerCase().includes(searchLower) ||
      order.orderGroup?.profile?.user?.username?.toLowerCase().includes(searchLower) ||
      order.orderGroup?.profile?.user?.email?.toLowerCase().includes(searchLower) ||
      order.items[0]?.product?.title?.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower)
    );
  }, [orders, searchTerm]);

  // Show recent orders (first 5 from filtered results)
  const recentOrders = filteredOrders.slice(0, 5);

  // Calculate total revenue
  const totalRevenue = React.useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  }, [orders]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
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

  const stats = [
    {
      title: "Total Products",
      value: userPokemons.length.toString(),
      icon: <Package size={24} />,
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: orders.length.toString(),
      icon: <ShoppingCart size={24} />,
      color: "bg-green-500",
    },
    {
      title: "Total Revenue",
      value: formatAmount(totalRevenue),
      icon: <DollarSign size={24} />,
      color: "bg-purple-500",
    },
  ];

  if (isLoadingOrders || isLoadingPokemons) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search orders..."
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
          
          {/* Search Results Info */}
          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              Showing {filteredOrders.length} of {orders.length} orders
              {filteredOrders.length > 5 && ' (displaying first 5)'}
            </div>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
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
                    <div className="flex items-center">
                      <img
                        src={order.items[0]?.product?.frontImageUrl}
                        alt={order.items[0]?.product?.title || 'Product'}
                        className="w-8 h-8 object-cover rounded mr-3"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/32x32?text=No+Image';
                        }}
                      />
                      <div>
                        <CopyableText 
                          text={order.items[0]?.product?.title || "Unknown Product"} 
                          label="Product Title"
                          className="font-medium block"
                        />
                        {order.items.length > 1 && (
                          <div className="text-xs text-gray-500">
                            +{order.items.length - 1} more items
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <CopyableText 
                        text={order.orderGroup?.profile?.user?.username || "—"} 
                        label="Username"
                        className="font-medium block"
                      />
                      {/* <CopyableText 
                        text={order.orderGroup?.profile?.user?.email || ""} 
                        label="Email"
                        className="text-xs text-gray-400 block"
                      /> */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <CopyableText 
                      text={formatDate(order.createdAt)} 
                      label="Order Date"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <CopyableText 
                      text={formatAmount(order.totalAmount)} 
                      label="Amount"
                      className="font-medium"
                    />
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    {searchTerm ? 'No orders found matching your search.' : 'No recent orders found.'}
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        Clear search
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer with order count info */}
        <div className="px-6 py-3 bg-gray-50 text-center">
          <p className="text-sm text-gray-500">
            {searchTerm ? (
              <>
                Showing {Math.min(5, filteredOrders.length)} of {filteredOrders.length} filtered orders
                {filteredOrders.length !== orders.length && ` (${orders.length} total)`}
              </>
            ) : (
              <>
                Showing {Math.min(5, orders.length)} of {orders.length} total orders
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorDashBoard;