"use client"
import { Heart } from "lucide-react"

export function SuccessStep({ onSubmitAnother, onBackToCards }) {
  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto">
        <Heart className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800">Donation Request Submitted!</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Thank you for your request! We've received your donation request and payment. We'll match you with the requested
        card and ship it to your address. You'll receive email updates on the status of your request.
      </p>
      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
        <p className="text-sm text-gray-700">
          <strong>What happens next:</strong>
          <br />
          1. We'll verify your request
          <br />
          2. Match you with available donated cards
          <br />
          3. Ship the card to your address
          <br />
          4. Send you tracking information
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={onSubmitAnother}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Submit Another Request
        </button>
        <button
          onClick={onBackToCards}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Back to Cards
        </button>
      </div>
    </div>
  )
}
