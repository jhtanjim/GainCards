import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const VendorAnalytics = () => {
  // Sample data - replace with actual data from your API
  const salesData = [
    { name: "Jan", sales: 4000, visitors: 2400 },
    { name: "Feb", sales: 3000, visitors: 1398 },
    { name: "Mar", sales: 5000, visitors: 3800 },
    { name: "Apr", sales: 2780, visitors: 3908 },
    { name: "May", sales: 1890, visitors: 4800 },
    { name: "Jun", sales: 2390, visitors: 3800 },
    { name: "Jul", sales: 3490, visitors: 4300 },
  ]

  const categoryData = [
    { name: "Fire", value: 35 },
    { name: "Water", value: 25 },
    { name: "Grass", value: 15 },
    { name: "Electric", value: 20 },
    { name: "Psychic", value: 5 },
  ]

  const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#9C27B0"]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>

      {/* Sales vs Visitors */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Sales vs Visitors</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Sales ($)"
              />
              <Line yAxisId="right" type="monotone" dataKey="visitors" stroke="#82ca9d" name="Visitors" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Sales */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" name="Sales ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Conversion Rate</p>
            <p className="text-2xl font-bold mt-1">3.2%</p>
            <p className="text-xs text-green-500 mt-1">↑ 0.5% from last month</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Avg. Order Value</p>
            <p className="text-2xl font-bold mt-1">$86.42</p>
            <p className="text-xs text-green-500 mt-1">↑ $3.12 from last month</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Return Rate</p>
            <p className="text-2xl font-bold mt-1">2.1%</p>
            <p className="text-xs text-red-500 mt-1">↑ 0.3% from last month</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-500">Customer Satisfaction</p>
            <p className="text-2xl font-bold mt-1">4.8/5</p>
            <p className="text-xs text-green-500 mt-1">↑ 0.2 from last month</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorAnalytics
