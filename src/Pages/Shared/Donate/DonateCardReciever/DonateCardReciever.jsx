"use client"

import React, { useState, useEffect } from "react"
import { User, MapPin, CreditCard, Heart, Package, ArrowLeft, Gift } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"

import useAddressForm from "../../../../Hooks/useAddressForm"
import useShippingRates from "../../../../Hooks/useShippingRates"

const DonateCardReceiver = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [donationCard, setDonationCard] = useState(null)
  const [user, setUser] = useState(null) // You'll need to get this from your auth context
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    reason: "",
    preferredCards: "",
    urgency: "normal",
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Get donation card from sessionStorage
  useEffect(() => {
    const cardData = sessionStorage.getItem("donationCard")
    if (cardData) {
      setDonationCard(JSON.parse(cardData))
    }
    
    // Get user data - replace this with your actual user fetching logic
    // const currentUser = getCurrentUser() // Your auth function
    // setUser(currentUser)
  }, [])

  // Address form hook
  const {
    showAddressForm,
    setShowAddressForm,
    addressFormData,
    setAddressFormData,
    handleAddressSubmit,
    isSavingAddress,
  } = useAddressForm(user, () => {
    // Callback when address is saved
    console.log("Address saved successfully")
  })

  // Shipping rates hook
  const {
    shippingRates,
    selectedRates,
    isLoadingRates,
    handleSelectRate,
    calculateTotalShipping,
    allVendorsHaveRates,
  } = useShippingRates(user, donationCard ? [donationCard.id] : [])

  // Donation request mutation
  const donationRequestMutation = useMutation({
    mutationFn: async (requestData) => {
      // Replace with your actual API call
      const response = await fetch('/api/donation-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
      return response.json()
    },
    onSuccess: () => {
      setCurrentStep(4) // Go to success step
    },
    onError: (error) => {
      console.error('Error submitting donation request:', error)
      alert('Error submitting request. Please try again.')
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target
    setAddressFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const requestData = {
      cardId: donationCard?.id,
      userInfo: formData,
      shippingAddress: addressFormData,
      shippingRate: selectedRates,
      totalAmount: calculateTotalShipping(5) + 5, // Base processing fee
    }

    donationRequestMutation.mutate(requestData)
  }

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Simulate payment processing - replace with actual payment gateway
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Process the donation request
      await handleSubmit()
      
      alert("Payment successful! Your donation request has been submitted.")
      
      // Clear sessionStorage and reset form
      sessionStorage.removeItem("donationCard")
      setFormData({
        username: "",
        email: "",
        phone: "",
        reason: "",
        preferredCards: "",
        urgency: "normal",
      })
      setCurrentStep(1)
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToCards = () => {
    navigate("/")
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= step ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {step}
          </div>
          {step < 3 && <div className={`w-12 h-1 mx-2 ${currentStep > step ? "bg-pink-500" : "bg-gray-200"}`}></div>}
        </React.Fragment>
      ))}
    </div>
  )

  // Step 1: User Information
  const UserInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h3>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          icon={<User className="h-4 w-4" />}
          required
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <InputField 
          label="Phone Number" 
          name="phone" 
          value={formData.phone} 
          onChange={handleInputChange} 
          required 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Why do you need this card? *</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
          placeholder="Please explain your situation and why you would benefit from receiving this donated card..."
          required
        />
      </div>

      <InputField
        label="Preferred Card Types (Optional)"
        name="preferredCards"
        value={formData.preferredCards}
        onChange={handleInputChange}
        placeholder="e.g., Pokémon, Yu-Gi-Oh, Magic: The Gathering"
      />

      <div className="flex justify-end">
        <button
          onClick={handleNextStep}
          disabled={!formData.username || !formData.email || !formData.phone || !formData.reason}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next: Shipping Address
        </button>
      </div>
    </div>
  )

  // Step 2: Address Information
  const AddressStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Shipping Address</h3>
        <p className="text-gray-600">Where should we send your donated card?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <InputField
            label="Full Name"
            name="name"
            value={addressFormData.name}
            onChange={handleAddressInputChange}
            icon={<User className="h-4 w-4" />}
            required
          />
        </div>
        <div className="md:col-span-2">
          <InputField
            label="Address Line 1"
            name="line1"
            value={addressFormData.line1}
            onChange={handleAddressInputChange}
            icon={<MapPin className="h-4 w-4" />}
            required
          />
        </div>
        <div className="md:col-span-2">
          <InputField
            label="Address Line 2 (Optional)"
            name="line2"
            value={addressFormData.line2}
            onChange={handleAddressInputChange}
          />
        </div>
        <InputField 
          label="City" 
          name="city" 
          value={addressFormData.city} 
          onChange={handleAddressInputChange} 
          required 
        />
        <InputField 
          label="State/Province" 
          name="state" 
          value={addressFormData.state} 
          onChange={handleAddressInputChange} 
          required 
        />
        <InputField 
          label="Country" 
          name="country" 
          value={addressFormData.country} 
          onChange={handleAddressInputChange} 
          required 
        />
        <InputField
          label="Postal Code"
          name="postalCode"
          value={addressFormData.postalCode}
          onChange={handleAddressInputChange}
          required
        />
        <InputField
          label="Phone Number"
          name="phone"
          value={addressFormData.phone}
          onChange={handleAddressInputChange}
          required
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevStep}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Previous
        </button>
        <button
          onClick={handleNextStep}
          disabled={
            !addressFormData.name || !addressFormData.line1 || !addressFormData.city || 
            !addressFormData.state || !addressFormData.country || !addressFormData.postalCode || 
            !addressFormData.phone
          }
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next: Checkout
        </button>
      </div>
    </div>
  )

  // Step 3: Checkout & Payment
  const CheckoutStep = () => {
    const processingFee = 5.00
    const shippingCost = formData.urgency === "emergency" ? 15.00 : 
                        formData.urgency === "urgent" ? 10.00 : 5.00
    const totalAmount = processingFee + shippingCost

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
              <span className="font-medium">{addressFormData.city}, {addressFormData.state}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reason:</span>
              <span className="font-medium text-right max-w-xs">{formData.reason.substring(0, 100)}...</span>
            </div>
          </div>
        </div>

        {/* Urgency Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Urgency</label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="normal">Normal (2-3 weeks) - $5.00</option>
            <option value="urgent">Urgent (1 week) - $10.00</option>
            <option value="emergency">Emergency (3-5 days) - $15.00</option>
          </select>
        </div>

        {/* Shipping Rates */}
        {isLoadingRates && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            <p className="mt-2 text-gray-600">Calculating shipping rates...</p>
          </div>
        )}

        {/* Cost Breakdown */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Cost Breakdown
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Processing Fee:</span>
              <span>${processingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Cost:</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount:</span>
              <span className="text-pink-600">${totalAmount.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              * This covers processing and shipping costs for your donated card
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevStep}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
          >
            Previous
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            {loading ? "Processing Payment..." : `Pay $${totalAmount.toFixed(2)}`}
          </button>
        </div>
      </div>
    )
  }

  // Success Step
  const SuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto">
        <Heart className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800">Donation Request Submitted!</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Thank you for your request! We've received your donation request and payment. 
        We'll match you with the requested card and ship it to your address. 
        You'll receive email updates on the status of your request.
      </p>
      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
        <p className="text-sm text-gray-700">
          <strong>What happens next:</strong><br />
          1. We'll verify your request<br />
          2. Match you with available donated cards<br />
          3. Ship the card to your address<br />
          4. Send you tracking information
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            setCurrentStep(1)
            setFormData({
              username: "",
              email: "",
              phone: "",
              reason: "",
              preferredCards: "",
              urgency: "normal",
            })
          }}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Submit Another Request
        </button>
        <button
          onClick={handleBackToCards}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Back to Cards
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-pink-500 rounded-full flex items-center justify-center">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Receive Donated Card</h2>
          </div>
          <button
            onClick={handleBackToCards}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cards
          </button>
        </div>

        {/* Show selected card info */}
        {donationCard && currentStep < 4 && (
          <div className="bg-pink-50 p-4 rounded-lg shadow-sm mb-6 border border-pink-200">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Gift className="h-4 w-4 text-pink-500" />
              Selected Donation Card:
            </h4>
            <div className="flex items-center gap-4">
              <img
                src={donationCard.frontImageUrl || "/placeholder.svg?height=80&width=80"}
                alt={donationCard.title}
                className="w-16 h-16 object-contain rounded"
              />
              <div>
                <p className="font-medium">{donationCard.title}</p>
                <p className="text-sm text-gray-600">
                  {donationCard.player} • {donationCard.year}
                </p>
                <p className="text-xs text-pink-600 font-medium">Available for Donation</p>
              </div>
            </div>
          </div>
        )}

        {currentStep < 4 && <StepIndicator />}

        <div className="bg-gray-50 p-8 rounded-xl">
          {currentStep === 1 && <UserInfoStep />}
          {currentStep === 2 && <AddressStep />}
          {currentStep === 3 && <CheckoutStep />}
          {currentStep === 4 && <SuccessStep />}
        </div>
      </div>
    </div>
  )
}

function InputField({ label, name, value, onChange, type = "text", icon, placeholder, required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  )
}

export default DonateCardReceiver