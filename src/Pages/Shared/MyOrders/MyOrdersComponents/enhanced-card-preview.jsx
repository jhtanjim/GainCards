"use client"

export function EnhancedCardPreview({ product, price, onCardClick }) {
  return (
    <div
      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow border"
      onClick={() => onCardClick(product)}
    >
      <div className="flex space-x-3">
        <div className="relative flex-shrink-0">
          <img
            src={product.image || `/placeholder.svg?height=80&width=60`}
            alt={product.title}
            className="w-16 h-20 object-cover rounded-md shadow-sm"
          />
          <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded-full font-bold">
            ${price}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 text-sm truncate">{product.title}</h4>
          <p className="text-xs text-gray-600 mt-1">
            {product.brand && <span className="font-medium">{product.brand}</span>}
            {product.condition && <span className="ml-2 text-gray-500">• {product.condition}</span>}
          </p>
          {product.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{product.description.substring(0, 80)}...</p>
          )}
          {product.rarity && (
            <span className="inline-block mt-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
              🌟 {product.rarity}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
