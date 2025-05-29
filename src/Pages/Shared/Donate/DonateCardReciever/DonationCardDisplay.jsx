import { Gift } from "lucide-react"

export function DonationCardDisplay({ card }) {
  return (
    <div className="bg-pink-50 p-4 rounded-lg shadow-sm mb-6 border border-pink-200">
      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
        <Gift className="h-4 w-4 text-pink-500" />
        Selected Donation Card:
      </h4>
      <div className="flex items-center gap-4">
        <img
          src={card.frontImageUrl || "/placeholder.svg?height=80&width=80"}
          alt={card.title}
          className="w-16 h-16 object-contain rounded"
        />
        <div>
          <p className="font-medium">{card.title}</p>
          <p className="text-sm text-gray-600">
            {card.player} • {card.year}
          </p>
          <p className="text-xs text-pink-600 font-medium">Available for Donation</p>
        </div>
      </div>
    </div>
  )
}
