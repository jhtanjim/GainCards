import { Search } from 'lucide-react'

const statuses = ['all', 'processing', 'shipped', 'completed', 'cancelled', 'pending']

const OrderFilterBar = ({ filter, setFilter, searchQuery, setSearchQuery }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
    <div className="flex flex-wrap gap-2">
      {statuses.map(status => (
        <button 
          key={status}
          onClick={() => setFilter(status)}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            filter === status ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
        placeholder="Search orders..."
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </div>
)

export default OrderFilterBar
