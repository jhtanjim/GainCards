import { Package, ChevronDown } from 'lucide-react';


export function CardPreview({ product, price, onCardClick }) {
  return (
    <div 
      className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-300 cursor-pointer hover:border-blue-500 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
      onClick={() => onCardClick(product)}
    >
      <div className="flex items-center space-x-4">
        <div className="relative h-24 w-20 rounded-lg overflow-hidden shadow-lg border-2 border-white">
          {product.frontImageUrl ? (
            <img
              src={product.frontImageUrl || "/placeholder.svg"}
              alt={product.title}
              className="object-cover h-full w-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/api/placeholder/80/96";
              }}
            />
          ) : (
            <div className="bg-gray-200 h-full w-full flex items-center justify-center">
              <Package className="h-10 w-10 text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">{product.title}</h3>
          <div className="text-sm text-gray-600 mb-1">
            {product.brand} • Grade: {product.grade}
          </div>
          {product.cardNumber && (
            <div className="text-xs text-gray-500 mb-2">
              Card #{product.cardNumber}
            </div>
          )}
          <div className="text-lg font-bold text-green-600">
            ${price.toFixed(2)}
          </div>
        </div>
        <div className="text-blue-500">
          <ChevronDown className="h-6 w-6 transform -rotate-90" />
        </div>
      </div>
      <div className="text-center mt-3 text-sm text-blue-600 font-medium bg-white/50 py-2 rounded-md">
        🔗 Click to view card details
      </div>
    </div>
  );
}
