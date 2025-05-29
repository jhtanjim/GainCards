"use client"

import { useState, useEffect } from "react"
import { Gift, ArrowLeft, Loader2 } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useMutation, useQuery } from "@tanstack/react-query"

import { DonationCardDisplay } from "./DonationCardDisplay"
import { StepIndicator } from "./StepIndicator"
import { UserInfoStep } from "./UserInfoStep"
import { AddressStep } from "./AddressStep"
import { CheckoutStep } from "./CheckoutStep"
import { SuccessStep } from "./SuccessStep"

import { useAuth } from "../../../../Context/AuthContext"
import api from "../../../../Hooks/axios"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export default function DonateCardReceiver() {
  const { cardId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [clientSecret, setClientSecret] = useState("")
  const [donationCard, setDonationCard] = useState(null)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    reason: "",
  })

  const [addressData, setAddressData] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
  })

  // Check for card data in sessionStorage first (from card selection)
  useEffect(() => {
    const storedCard = sessionStorage.getItem("donationCard")
    if (storedCard) {
      try {
        const parsedCard = JSON.parse(storedCard)
        setDonationCard(parsedCard)
      } catch (error) {
        console.error("Error parsing stored card data:", error)
      }
    }
  }, [])

  // Fetch donation card details if not in sessionStorage
  const {
    data: fetchedCard,
    isLoading: isLoadingCard,
    error: cardError,
  } = useQuery({
    queryKey: ["donationCard", cardId],
    queryFn: async () => {
      if (!cardId) {
        throw new Error("No card ID provided")
      }

      try {
        const response = await api.get(`/donation-cards/${cardId}`)
        return response.data
      } catch (error) {
        // Try alternative endpoints if the first one fails
        try {
          const altResponse = await api.get(`/pokemon/${cardId}`)
          return altResponse.data
        } catch (altError) {
          throw new Error(`Card not found with ID: ${cardId}`)
        }
      }
    },
    enabled: !!cardId && !donationCard,
    retry: 1,
  })

  // Set the fetched card if we don't have one from sessionStorage
  useEffect(() => {
    if (fetchedCard && !donationCard) {
      setDonationCard(fetchedCard)
    }
  }, [fetchedCard, donationCard])

  // Fetch shipping rates
  const {
    data: shippingRates,
    isLoading: isLoadingShipping,
    refetch: refetchShipping,
  } = useQuery({
    queryKey: ["shippingRates", addressData, donationCard?.id],
    queryFn: async () => {
      if (!addressData.city || !addressData.state || !addressData.postalCode || !donationCard?.id) {
        return null
      }

      try {
        const response = await api.post("/shippo/rates", {
          productIds: [donationCard.id],
          address: addressData,
        })
        return response.data
      } catch (error) {
        console.error("Error fetching shipping rates:", error)
        // Return default shipping if API fails
        return [
          {
            vendorId: "default",
            rates: [
              {
                objectId: "default",
                provider: "Standard",
                servicelevel: { name: "Ground" },
                amount: "12.50",
                durationTerms: "5-7 business days",
              },
            ],
          },
        ]
      }
    },
    enabled: !!(
      addressData.city &&
      addressData.state &&
      addressData.postalCode &&
      donationCard?.id &&
      currentStep >= 2
    ),
  })

  // Save address mutation
  const saveAddressMutation = useMutation({
    mutationFn: async (address) => {
      const response = await api.post("/user/address", address)
      return response.data
    },
    onError: (error) => {
      console.error("Error saving address:", error)
      // Continue anyway if address save fails
    },
  })

  // Create payment intent mutation
  const createPaymentIntentMutation = useMutation({
    mutationFn: async (paymentData) => {
      const response = await api.post("/create-payment-intent", paymentData)
      return response.data
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret)
    },
    onError: (error) => {
      console.error("Error creating payment intent:", error)
      alert("Error processing payment setup. Please try again.")
    },
  })

  // Submit donation request mutation
  const submitDonationMutation = useMutation({
    mutationFn: async (donationData) => {
      const response = await api.post("/donation-requests", donationData)
      return response.data
    },
    onError: (error) => {
      console.error("Error submitting donation request:", error)
      alert("Payment successful but error submitting request. Please contact support.")
    },
  })

  // Pre-populate form with user data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
      }))

      if (user.address) {
        setAddressData((prev) => ({
          ...prev,
          ...user.address,
        }))
      }
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target
    setAddressData((prev) => ({
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

  const handleAddressStepNext = async () => {
    try {
      // Save address if user is logged in
      if (user) {
        await saveAddressMutation.mutateAsync(addressData)
      }

      // Refetch shipping rates with new address
      if (donationCard?.id) {
        await refetchShipping()
      }
      setCurrentStep(3)
    } catch (error) {
      console.error("Error in address step:", error)
      // Continue to next step even if address save fails
      setCurrentStep(3)
    }
  }

  const handlePayment = async () => {
    try {
      const processingFee = 5.0
      const shippingCost = shippingRates?.[0]?.rates?.[0]?.amount
        ? Number.parseFloat(shippingRates[0].rates[0].amount)
        : 12.5
      const totalAmount = processingFee + shippingCost

      // Create payment intent
      await createPaymentIntentMutation.mutateAsync({
        amount: Math.round(totalAmount * 100), // Convert to cents and round
        cardId: donationCard?.id || cardId,
        formData,
        addressData,
        shippingRate: shippingRates?.[0]?.rates?.[0],
      })
    } catch (error) {
      console.error("Error creating payment intent:", error)
      alert("Error processing payment. Please try again.")
    }
  }

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Submit donation request after successful payment
      await submitDonationMutation.mutateAsync({
        cardId: donationCard?.id || cardId,
        paymentIntentId: paymentIntent.id,
        formData,
        addressData,
        shippingRate: shippingRates?.[0]?.rates?.[0],
      })

      setCurrentStep(4)
    } catch (error) {
      console.error("Error submitting donation request:", error)
      // Still proceed to success step since payment was successful
      setCurrentStep(4)
    }
  }

  const handleBackToCards = () => {
    // Clear stored card data
    sessionStorage.removeItem("donationCard")
    navigate("/donation-cards")
  }

  const handleSubmitAnother = () => {
    setCurrentStep(1)
    setClientSecret("")
    setDonationCard(null)
    sessionStorage.removeItem("donationCard")
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      reason: "",
    })
  }

  // Calculate costs
  const processingFee = 5.0
  const shippingCost = shippingRates?.[0]?.rates?.[0]?.amount
    ? Number.parseFloat(shippingRates[0].rates[0].amount)
    : 12.5
  const totalAmount = processingFee + shippingCost

  // Loading state
  if (isLoadingCard && !donationCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading card details...</span>
        </div>
      </div>
    )
  }

  // Error state - show more helpful error message
  if (cardError && !donationCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Card Not Found</h2>
          <p className="text-gray-600 mb-4">
            {cardError?.message || "The requested donation card could not be found."}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            This might happen if the card was recently removed or the link is outdated.
          </p>
          <button
            onClick={handleBackToCards}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Back to Cards
          </button>
        </div>
      </div>
    )
  }

  // No card found state
  if (!donationCard && !isLoadingCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="h-8 w-8 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Card Selected</h2>
          <p className="text-gray-600 mb-4">Please select a donation card to continue with your request.</p>
          <button
            onClick={handleBackToCards}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse Donation Cards
          </button>
        </div>
      </div>
    )
  }

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
        {donationCard && currentStep < 4 && <DonationCardDisplay card={donationCard} />}

        {currentStep < 4 && <StepIndicator currentStep={currentStep} totalSteps={3} />}

        <div className="bg-gray-50 p-8 rounded-xl">
          {currentStep === 1 && (
            <UserInfoStep
              formData={formData}
              onInputChange={handleInputChange}
              onNext={handleNextStep}
              hasUser={!!user}
            />
          )}

          {currentStep === 2 && (
            <AddressStep
              addressData={addressData}
              onInputChange={handleAddressInputChange}
              onNext={handleAddressStepNext}
              onPrevious={handlePrevStep}
              isLoading={saveAddressMutation.isLoading}
              hasUserAddress={!!user?.address}
            />
          )}

          {currentStep === 3 && (
            <Elements stripe={stripePromise}>
              <CheckoutStep
                formData={formData}
                addressData={addressData}
                totalAmount={totalAmount}
                processingFee={processingFee}
                shippingCost={shippingCost}
                onPayment={handlePayment}
                onPrevious={handlePrevStep}
                isLoading={createPaymentIntentMutation.isLoading}
                clientSecret={clientSecret}
                onPaymentSuccess={handlePaymentSuccess}
                shippingRates={shippingRates}
                isLoadingShipping={isLoadingShipping}
              />
            </Elements>
          )}

          {currentStep === 4 && <SuccessStep onSubmitAnother={handleSubmitAnother} onBackToCards={handleBackToCards} />}
        </div>
      </div>
    </div>
  )
}
