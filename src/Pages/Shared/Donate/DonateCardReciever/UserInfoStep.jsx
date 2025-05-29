"use client"

import { User } from "lucide-react"
import { InputField } from "./InputField"

export function UserInfoStep({ formData, onInputChange, onNext, hasUser }) {
  const isFormValid = formData.username && formData.email && formData.phone && formData.reason

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h3>
        <p className="text-gray-600">Tell us about yourself</p>
        {hasUser && <p className="text-sm text-blue-600 mt-2">ℹ️ We've pre-filled your information from your profile</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={onInputChange}
          icon={<User className="h-4 w-4" />}
          required
        />
        <InputField label="Email" name="email" type="email" value={formData.email} onChange={onInputChange} required />
        <InputField label="Phone Number" name="phone" value={formData.phone} onChange={onInputChange} required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Why do you need this card? *</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={onInputChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
          placeholder="Please explain your situation and why you would benefit from receiving this donated card..."
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next: Shipping Address
        </button>
      </div>
    </div>
  )
}
