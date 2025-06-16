import { Package } from 'lucide-react';


export function EmptyState({ hasFilters, onClearFilters }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      {hasFilters ? (
        <div>
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No matching orders found
          </h3>
          <p className="mt-1 text-gray-500 mb-4">
            Try changing your search or filter settings.
          </p>
          <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div>
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No orders yet
          </h3>
          <p className="mt-1 text-gray-500">
            Start shopping to see your orders here.
          </p>
        </div>
      )}
    </div>
  );
}
