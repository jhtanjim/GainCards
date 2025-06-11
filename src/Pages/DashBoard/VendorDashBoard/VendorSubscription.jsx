import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUp,
  BarChart3,
  CheckCircle,
  CreditCard,
  Crown,
  DollarSign,
  History,
  Package,
  RefreshCw,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Swal from "sweetalert2";
import subscriptionApi from "../../../api/vendor";

const VendorSubscription = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const queryClient = useQueryClient();

  const { data: subscription, isLoading: subscriptionLoading } = useQuery({
    queryKey: ["vendor-subscription"],
    queryFn: subscriptionApi.getSubscription,
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["vendor-analytics"],
    queryFn: subscriptionApi.getAnalytics,
  });

  const { data: availablePlans } = useQuery({
    queryKey: ["available-plans"],
    queryFn: subscriptionApi.getAvailablePlans,
  });

  const upgradeMutation = useMutation({
    mutationFn: subscriptionApi.upgradeSubscription,
    onSuccess: () => {
      toast.success("Subscription upgraded successfully!");
      queryClient.invalidateQueries(["vendor-subscription"]);
      queryClient.invalidateQueries(["vendor-analytics"]);
    },
    onError: (error) => {
      console.error("Upgrade error:", error);
      toast.error(
        error.response?.data?.message || "Failed to upgrade subscription"
      );
    },
  });

  const renewMutation = useMutation({
    mutationFn: subscriptionApi.renewSubscription,
    onSuccess: () => {
      toast.success("Subscription renewed successfully!");
      queryClient.invalidateQueries(["vendor-subscription"]);
    },
    onError: (error) => {
      console.error("Renew error:", error);
      toast.error(
        error.response?.data?.message || "Failed to renew subscription"
      );
    },
  });

  const cancelMutation = useMutation({
    mutationFn: subscriptionApi.cancelSubscription,
    onSuccess: () => {
      toast.success("Subscription cancelled successfully");
      queryClient.invalidateQueries(["vendor-subscription"]);
    },
    onError: (error) => {
      console.error("Cancel error:", error);
      toast.error(
        error.response?.data?.message || "Failed to cancel subscription"
      );
    },
  });

  const handleUpgrade = async (planId) => {
    const result = await Swal.fire({
      title: "Upgrade Subscription?",
      text: "You will be charged for the new plan immediately.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, upgrade!",
    });

    if (result.isConfirmed) {
      upgradeMutation.mutate(planId);
    }
  };

  const handleRenew = async () => {
    const result = await Swal.fire({
      title: "Renew Subscription?",
      text: "Your subscription will be renewed for another billing period.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, renew!",
    });

    if (result.isConfirmed) {
      renewMutation.mutate();
    }
  };

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Cancel Subscription?",
      text: "This action cannot be undone. Your active listings will be deactivated.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel!",
    });

    if (result.isConfirmed) {
      cancelMutation.mutate();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "text-green-600 bg-green-100";
      case "EXPIRED":
        return "text-yellow-600 bg-yellow-100";
      case "CANCELLED":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle className="w-4 h-4" />;
      case "EXPIRED":
        return <AlertCircle className="w-4 h-4" />;
      case "CANCELLED":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Mock data for charts - you can replace this with real data from your API
  const usageData = [
    { month: "Jan", listings: 23 },
    { month: "Feb", listings: 34 },
    { month: "Mar", listings: 45 },
    { month: "Apr", listings: 56 },
    { month: "May", listings: 67 },
    { month: "Jun", listings: 78 },
  ];

  const productStatusData = analytics
    ? [
        {
          name: "Active",
          value: analytics.productStatistics?.ACTIVE || 0,
          color: "#10b981",
        },
        {
          name: "Sold",
          value: analytics.productStatistics?.SOLD || 0,
          color: "#3b82f6",
        },
        {
          name: "Inactive",
          value: analytics.productStatistics?.INACTIVE || 0,
          color: "#f59e0b",
        },
      ]
    : [];

  if (subscriptionLoading || analyticsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Subscription Management
            </h1>
            <p className="text-gray-600">
              Manage your subscription plan and monitor usage
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div
              className={`px-4 py-2 rounded-full flex items-center space-x-2 ${getStatusColor(
                subscription?.subscriptionStatus
              )}`}
            >
              {getStatusIcon(subscription?.subscriptionStatus)}
              <span className="font-medium">
                {subscription?.subscriptionStatus}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-2"
        >
          <div className="flex space-x-2">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "plans", label: "Plans", icon: Crown },
              { id: "history", label: "History", icon: History },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Current Plan Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Current Plan
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {subscription?.subscriptionPlan?.name}
                      </p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Crown className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Cards Used
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {subscription?.cardsUsedUnderPlan}/
                        {subscription?.cardLimit}
                      </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            ((subscription?.cardsUsedUnderPlan || 0) /
                              (subscription?.cardLimit || 1)) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Remaining Cards
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {subscription?.remainingCards}
                      </p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Total Spent
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${analytics?.totalAmountPaid?.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <DollarSign className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Listing Usage Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="listings"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Product Status Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={productStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {productStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-6 mt-4">
                    {productStatusData.map((entry, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="text-sm text-gray-600">
                          {entry.name}: {entry.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleRenew}
                    disabled={renewMutation.isPending}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`w-5 h-5 ${
                        renewMutation.isPending ? "animate-spin" : ""
                      }`}
                    />
                    <span>Renew Subscription</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("plans")}
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    <ArrowUp className="w-5 h-5" />
                    <span>Upgrade Plan</span>
                  </button>

                  <button
                    onClick={handleCancel}
                    disabled={cancelMutation.isPending}
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                  >
                    <XCircle
                      className={`w-5 h-5 ${
                        cancelMutation.isPending ? "animate-spin" : ""
                      }`}
                    />
                    <span>Cancel Subscription</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "plans" && (
            <motion.div
              key="plans"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Choose Your Plan
                </h2>
                <p className="text-gray-600">
                  Select the perfect plan for your business needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {availablePlans?.map((plan, index) => {
                  const isCurrentPlan =
                    plan.id === subscription?.subscriptionPlan?.id;
                  const isUpgrade =
                    plan.cardLimit > (subscription?.cardLimit || 0);

                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-white rounded-xl shadow-lg p-8 relative ${
                        isCurrentPlan ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      {isCurrentPlan && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Current Plan
                        </div>
                      )}

                      <div className="text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {plan.name}
                        </h3>
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          ${plan.price}
                          <span className="text-lg font-normal text-gray-600">
                            /month
                          </span>
                        </div>
                        <p className="text-gray-600 mb-6">
                          Up to {plan.cardLimit} active listings
                        </p>

                        <div className="space-y-3 mb-8">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">
                              {plan.cardLimit} Card Listings
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">
                              Analytics Dashboard
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">24/7 Support</span>
                          </div>
                        </div>

                        {isCurrentPlan ? (
                          <button
                            disabled
                            className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed"
                          >
                            Current Plan
                          </button>
                        ) : isUpgrade ? (
                          <button
                            onClick={() => handleUpgrade(plan.id)}
                            disabled={upgradeMutation.isPending}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
                          >
                            {upgradeMutation.isPending
                              ? "Upgrading..."
                              : "Upgrade Now"}
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed"
                          >
                            Downgrade Not Available
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Subscription History
                </h3>

                <div className="space-y-4">
                  {analytics?.subscriptionHistory?.map((history, index) => (
                    <motion.div
                      key={history.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {history.subscriptionPlan.name} Plan
                            </h4>
                            <p className="text-sm text-gray-600">
                              Activated on{" "}
                              {new Date(
                                history.activatedAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${history.amountPaid?.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">Payment</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {(!analytics?.subscriptionHistory ||
                  analytics.subscriptionHistory.length === 0) && (
                  <div className="text-center py-8">
                    <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      No subscription history available
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VendorSubscription;
