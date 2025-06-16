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
import { getAllOrders } from "../../../api/orders";

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

  const { data: orders = [], isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  const filteredOrders = React.useMemo(() => {
    if (!orders || !user?.profileId) return [];
    return orders.filter((order) => order.profileId === user.profileId);
  }, [orders, user?.profileId]);
console.log(filteredOrders)
  const totalRevenue = filteredOrders.reduce((sum, order) => {
    return sum + (parseFloat(order.total) || 0);
  }, 0);

  const stats = [
    {
      title: "Total Products",
      value: userPokemons.length.toString(),
      icon: <Package size={24} />,
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: filteredOrders.length.toString(),
      icon: <ShoppingCart size={24} />,
      color: "bg-green-500",
    },
    // {
    //   title: "Total Revenue",
    //   value: `$${totalRevenue.toFixed(2)}`,
    //   icon: <DollarSign size={24} />,
    //   color: "bg-purple-500",
    // },
  ];

  const recentOrders = filteredOrders.slice(0, 5); // Show latest 5 orders

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th> */}
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
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.productName || "—"}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customerName || "—"}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.totalAmount}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No recent orders.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorDashBoard;
