"use client"

import { Gift, Truck, CreditCard, Loader2 } from "lucide-react"
import { useState } from "react"

export function CheckoutStep({
  formData,
  addressData,
  totalAmount,
  processingFee,
  shippingCost,
  onPayment,
  onPrevious,
  isLoading = false,
  shippingRates,
  isLoadingShipping,
}) {
  const [selectedShippingRate, setSelectedShippingRate] = useState(null)

  // Set default shipping rate
  useState(() => {
    if (shippingRates?.[0]?.rates?.[0] && !selectedShippingRate) {
      setSelectedShippingRate(shippingRates[0].rates[0])
    }
  }, [shippingRates])

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Checkout & Payment</h3>
        <p className="text-gray-600">Review your request and complete payment</p>
      </div>

      {/* Request Summary */}
      <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Gift className="h-5 w-5 text-pink-500" />
          Donation Request Summary
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Requested by:</span>
            <span className="font-medium">{formData.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{formData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping to:</span>
            <span className="font-medium">
              {addressData.city}, {addressData.state}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Reason:</span>
            <span className="font-medium text-right max-w-xs">
              {formData.reason.substring(0, 100)}
              {formData.reason.length > 100 ? "..." : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping Options */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center mb-4">
          <Truck size={20} className="text-gray-600 mr-2" />
          <h4 className="text-lg font-semibold text-gray-800">Shipping Options</h4>
        </div>

        {isLoadingShipping ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading shipping options...</span>
          </div>
        ) : shippingRates?.[0]?.rates?.length > 0 ? (
          <div className="space-y-2">
            {shippingRates[0].rates.map((rate) => (
              <div
                key={rate.objectId}
                className={`flex items-center justify-between p-3 rounded-md cursor-pointer border ${
                  selectedShippingRate?.objectId === rate.objectId
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedShippingRate(rate)}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={selectedShippingRate?.objectId === rate.objectId}
                    onChange={() => setSelectedShippingRate(rate)}
                    className="mr-2 text-pink-600 focus:ring-pink-500"
                  />
                  <div>
                    <p className="font-medium">
                      {rate.provider} - {rate.servicelevel?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {rate.durationTerms || `Est. delivery: ${rate.estimatedDays} days`}
                    </p>
                  </div>
                </div>
                <span className="font-medium">${Number.parseFloat(rate.amount).toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <span className="text-blue-700 text-sm">Standard shipping will be calculated based on your address</span>
          </div>
        )}
      </div>

      {/* Cost Breakdown */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Cost Breakdown</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Processing Fee:</span>
            <span className="font-medium">${processingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping Cost:</span>
            <span className="font-medium">
              $
              {selectedShippingRate
                ? Number.parseFloat(selectedShippingRate.amount).toFixed(2)
                : shippingCost.toFixed(2)}
            </span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-pink-600">
                $
                {(
                  processingFee + (selectedShippingRate ? Number.parseFloat(selectedShippingRate.amount) : shippingCost)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Show payment button */}
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Previous
        </button>
        <button
          onClick={onPayment}
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          <CreditCard className="h-4 w-4" />
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Preparing Payment...
            </>
          ) : (
            "Continue to Payment"
          )}
        </button>
      </div>
    </div>
  )
}
