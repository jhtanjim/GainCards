"use client"

import { useState } from "react"
import { User, MapPin, Phone, Check } from "lucide-react"

export default function DonationCompletionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSubmit(formData)
    } catch (err) {
      console.error("Submission failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Complete Your Donation</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} icon={<User />} />
          <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} icon={<Phone />} />
          <InputField label="Address Line 1" name="line1" value={formData.line1} onChange={handleChange} />
          <InputField label="Address Line 2" name="line2" value={formData.line2} onChange={handleChange} />
          <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
          <InputField label="State" name="state" value={formData.state} onChange={handleChange} />
          <InputField label="Country" name="country" value={formData.country} onChange={handleChange} />
          <InputField label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Complete Donation"}
          </button>
        </div>
      </form>
    </div>
  )
}

function InputField({ label, name, value, onChange, icon }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-2.5 text-gray-400">{icon}</div>}
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className={`input pl-${icon ? "10" : "4"}`}
          required
        />
      </div>
    </div>
  )
}
