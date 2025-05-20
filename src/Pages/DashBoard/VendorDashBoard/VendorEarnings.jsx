"use client"

import { useState } from "react"
import { Calendar, DollarSign, TrendingUp, Download, Filter } from "lucide-react"

const VendorEarnings = () => {
  const [timeframe, setTimeframe] = useState("monthly")

  // Sample data - replace with actual data from your API
  const earningsData = {
    monthly: [
      { month: "January", earnings: 1250, orders: 42 },
      { month: "February", earnings: 980, orders: 35 },
      { month: "March", earnings: 1420, orders: 48 },
      { month: "April", earnings: 1680, orders: 56 },
      { month: "May", earnings: 2100, orders: 70 },
      { month: "June", earnings: 1890, orders: 63 },
    ],
    weekly: [
      { week: "Week 1", earnings: 480, orders: 16 },
      { week: "Week 2", earnings: 520, orders: 18 },
      { week: "Week 3", earnings: 390, orders: 13 },
      { week: "Week 4", earnings: 500, orders: 17 },
    ],
  }

  const displayData = timeframe === "monthly" ? earningsData.monthly : earningsData.weekly

  // Calculate totals
  const totalEarnings = displayData.reduce((sum, item) => sum + item.earnings, 0)
  const totalOrders = displayData.reduce((sum, item) => sum + item.orders, 0)
  const avgOrderValue = totalOrders > 0 ? (totalEarnings / totalOrders).toFixed(2) : 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Download size={18} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold mt-1">${totalEarnings.toLocaleString()}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-full text-white">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold mt-1">{totalOrders}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full text-white">
              <Calendar size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Order Value</p>
              <p className="text-2xl font-bold mt-1">${avgOrderValue}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-full text-white">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Timeframe Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      {/* Earnings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {timeframe === "monthly" ? "Month" : "Week"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Earnings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Order
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {timeframe === "monthly" ? item.month : item.week}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.earnings.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(item.earnings / item.orders).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{totalOrders}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${totalEarnings.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${avgOrderValue}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#TRX-001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-31</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,890.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#TRX-002</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-30</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,680.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#TRX-003</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-03-31</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,420.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default VendorEarnings
