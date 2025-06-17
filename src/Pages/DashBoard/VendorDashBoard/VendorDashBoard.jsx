import React from "react";
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

  const recentOrders = orders.slice(0, 5); // Show latest 5 orders

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
          <h2 className="text-lg font-semibold">Recent Orders</h2>
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
                    #{order.id.slice(-8)}
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
                        <div className="font-medium">
                          {order.items[0]?.product?.title || "Unknown Product"}
                        </div>
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
                      <div className="font-medium">
                        {order.orderGroup?.profile?.user?.username || "—"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {order.orderGroup?.profile?.user?.email || ""}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatAmount(order.totalAmount)}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {orders.length > 5 && (
          <div className="px-6 py-3 bg-gray-50 text-center">
            <p className="text-sm text-gray-500">
              Showing 5 of {orders.length} total orders
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashBoard;