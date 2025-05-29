"use client"

import { User, MapPin, Loader2 } from "lucide-react"
import { InputField } from "./InputField"

export function AddressStep({ addressData, onInputChange, onNext, onPrevious, isLoading = false, hasUserAddress }) {
  const requiredFields = ["name", "line1", "city", "state", "country", "postalCode", "phone"]
  const isFormValid = requiredFields.every((field) => addressData[field])

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Shipping Address</h3>
        <p className="text-gray-600">Where should we send your donated card?</p>
        {hasUserAddress && (
          <p className="text-sm text-blue-600 mt-2">ℹ️ We've pre-filled your shipping address from your profile</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <InputField
            label="Full Name"
            name="name"
            value={addressData.name}
            onChange={onInputChange}
            icon={<User className="h-4 w-4" />}
            required
          />
        </div>
        <div className="md:col-span-2">
          <InputField
            label="Address Line 1"
            name="line1"
            value={addressData.line1}
            onChange={onInputChange}
            icon={<MapPin className="h-4 w-4" />}
            required
          />
        </div>
        <div className="md:col-span-2">
          <InputField
            label="Address Line 2 (Optional)"
            name="line2"
            value={addressData.line2}
            onChange={onInputChange}
          />
        </div>
        <InputField label="City" name="city" value={addressData.city} onChange={onInputChange} required />
        <InputField label="State/Province" name="state" value={addressData.state} onChange={onInputChange} required />
        <InputField label="Country" name="country" value={addressData.country} onChange={onInputChange} required />
        <InputField
          label="Postal Code"
          name="postalCode"
          value={addressData.postalCode}
          onChange={onInputChange}
          required
        />
        <InputField label="Phone Number" name="phone" value={addressData.phone} onChange={onInputChange} required />
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid || isLoading}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? "Saving Address..." : "Save & Continue"}
        </button>
      </div>
    </div>
  )
}
