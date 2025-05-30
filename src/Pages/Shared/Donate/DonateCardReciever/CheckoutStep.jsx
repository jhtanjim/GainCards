"use client"

import { Gift, Truck, CreditCard, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

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
  selectedRates,
  handleSelectRate,
  donationCard,
}) {
  // Auto-select first shipping rate if available and none selected
  useEffect(() => {
    if (shippingRates && shippingRates.length > 0 && shippingRates[0].rates && shippingRates[0].rates.length > 0) {
      const firstVendor = shippingRates[0]
      const firstRate = firstVendor.rates[0]
      
      // Only auto-select if no rate is selected for this vendor
      if (!selectedRates || !selectedRates[firstVendor.vendorId]) {
        handleSelectRate && handleSelectRate(firstVendor.vendorId, firstRate)
      }
    }
  }, [shippingRates, selectedRates, handleSelectRate])

  // Calculate actual total with selected shipping rate
  const getSelectedShippingCost = () => {
    if (selectedRates && Object.keys(selectedRates).length > 0) {
      const selectedRate = Object.values(selectedRates)[0] // Get first vendor's selected rate
      return selectedRate ? parseFloat(selectedRate.amount) : shippingCost
    }
    return shippingCost
  }

  const actualShippingCost = getSelectedShippingCost()
  const actualTotalAmount = processingFee + actualShippingCost

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
          {donationCard && (
            <div className="flex justify-between">
              <span className="text-gray-600">Card:</span>
              <span className="font-medium">
                {donationCard.player || donationCard.name || "Donation Card"}
              </span>
            </div>
          )}
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
        ) : shippingRates && shippingRates.length > 0 && shippingRates[0].rates && shippingRates[0].rates.length > 0 ? (
          <div className="space-y-2">
            {shippingRates[0].rates.map((rate) => {
              const vendorId = shippingRates[0].vendorId
              const isSelected = selectedRates && selectedRates[vendorId] && selectedRates[vendorId].objectId === rate.objectId
              
              return (
                <div
                  key={rate.objectId}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer border ${
                    isSelected
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelectRate && handleSelectRate(vendorId, rate)}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={isSelected}
                      onChange={() => handleSelectRate && handleSelectRate(vendorId, rate)}
                      className="mr-2 text-pink-600 focus:ring-pink-500"
                    />
                    <div>
                      <p className="font-medium">
                        {rate.provider} - {rate.servicelevel?.name || "Standard"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {rate.durationTerms || `Est. delivery: ${rate.estimatedDays || "5-7"} days`}
                      </p>
                      {rate.attributes && rate.attributes.length > 0 && (
                        <p className="text-xs text-pink-600 mt-1">
                          {rate.attributes.includes("CHEAPEST") && "Cheapest • "}
                          {rate.attributes.includes("FASTEST") && "Fastest • "}
                          {rate.attributes.includes("BESTVALUE") && "Best Value"}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-medium">${parseFloat(rate.amount).toFixed(2)}</span>
                </div>
              )
            })}
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
            <span className="font-medium">${actualShippingCost.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-pink-600">${actualTotalAmount.toFixed(2)}</span>
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