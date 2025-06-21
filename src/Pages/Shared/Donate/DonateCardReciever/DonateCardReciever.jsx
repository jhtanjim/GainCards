import {
  CreditCard,
  Gift,
  Heart,
  Loader2,
  MapPin,
  MessageSquare,
  Truck,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ErrorBoundary } from "../../../../../error-boundary";
import { placeOrder } from "../../../../api/orders";
import AddressForm from "../../../../Compnent/Vendor/AddressForm";
import { useAuth } from "../../../../Context/AuthContext";
import useAddressForm from "../../../../Hooks/useAddressForm";
import useShippingRates from "../../../../Hooks/useShippingRates";

const DonateCardReceiver = () => {
  const { user, isAuthenticated,fetchUserData } = useAuth();
  const navigate = useNavigate();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [donationCard, setDonationCard] = useState(null);
  const [donationForm, setDonationForm] = useState({
    username: "",
    reason: "",
  });

  // Get donation card from sessionStorage
  useEffect(() => {
    const storedCard = sessionStorage.getItem("donationCard");
    if (storedCard) {
      setDonationCard(JSON.parse(storedCard));
    } else {
      // Redirect back if no donation card found
      navigate("/");
    }
  }, [navigate]);

  // Handle address form
  const {
    showAddressForm,
    setShowAddressForm,
    addressFormData,
    setAddressFormData,
    handleAddressSubmit,
    isSavingAddress,
  } = useAddressForm(user, () => {fetchUserData();refetchRates()});

  // Get shipping rates for donation card
  const productIds = donationCard ? [donationCard.id] : [];

  const {
    shippingRates,
    selectedRates,
    isLoadingRates,
    refetchRates,
    handleSelectRate,
    calculateTotalShipping,
    allVendorsHaveRates,
  } = useShippingRates(user, productIds);

  // Calculate shipping total
  const shippingTotal =
    typeof calculateTotalShipping === "function" ? calculateTotalShipping() : 0;

  // Handle form input changes
  const handleFormChange = (field, value) => {
    setDonationForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validate form
  const isFormValid = () => {
    return (
      donationForm.username.trim() !== "" &&
      donationForm.reason.trim() !== "" &&
      donationForm.reason.trim().length >= 20
    );
  };

  // Handle donation request checkout
  const handleDonationCheckout = async () => {
    if (!isAuthenticated) {
      navigate("/signin?redirect=/donateCardReceiver");
      return;
    }

    if (!user.address && !showAddressForm) {
      setShowAddressForm(true);
      return;
    }

    if (!isFormValid()) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all required fields. Reason must be at least 20 characters.",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    if (!donationCard) {
      Swal.fire({
        icon: "error",
        title: "No Card Selected",
        text: "No donation card found. Please select a card first.",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    try {
      setIsProcessingPayment(true);

      // Get selected shipping rate
      const vendorId = donationCard.vendorId;
      const shippingRate = selectedRates[vendorId] || null;

      if (!shippingRate) {
        Swal.fire({
          icon: "warning",
          title: "Select Shipping",
          text: "Please select a shipping option.",
          confirmButtonColor: "#ef4444",
        });
        return;
      }

      // Prepare donation order data
      const orderData = [
        {
          vendorId: donationCard.vendorId,
          items: [donationCard.id],
          isDonation: true,
          donationDetails: {
            username: donationForm.username.trim(),
            reason: donationForm.reason.trim(),
            requestedAt: new Date().toISOString(),
          },
          shipping: {
            rateId: shippingRate.objectId,
            amount: parseFloat(shippingRate.amount),
            provider: shippingRate.provider,
            service: shippingRate.servicelevel?.name || "Standard",
            estimatedDays: shippingRate.estimatedDays || null,
          },
        },
      ];

      const data = await placeOrder(orderData);
      const { paymentIntent } = data;

      // Clear the donation card from session storage
      sessionStorage.removeItem("donationCard");

      // Navigate to payment (user only pays for shipping)
      navigate(
        `/checkout?client_secret=${paymentIntent.clientSecret}&donation=true`
      );
    } catch (error) {
      console.error("Error creating donation request:", error);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Show address form if user is not logged in or doesn't have an address
  useEffect(() => {
    if (isAuthenticated && !user.address) {
      setShowAddressForm(true);
    }
  }, [user]);

  if (!donationCard) {
    return (
      <div className="mx-auto max-w-6xl p-4 mt-8">
        <div className="flex flex-col items-center justify-center py-12">
          <Gift size={64} className="text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No donation card selected
          </h2>
          <p className="text-gray-600 mb-6">
            Please select a donation card first.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Browse Cards
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-4 mt-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <Gift className="mr-2 text-pink-500" size={28} />
        Request Donation Card
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Donation Card & Form Section */}
        <div className="w-full lg:w-2/3">
          {/* Donation Card Display */}
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 p-4 bg-pink-50 rounded-t-lg">
              <div className="flex items-center">
                <Gift size={20} className="text-pink-600 mr-2" />
                <h3 className="font-medium text-gray-800">Donation Card</h3>
              </div>
            </div>

            <div className="p-4 flex items-center">
              <div className="w-20 h-28 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                {donationCard.frontImageUrl ? (
                  <img
                    src={donationCard.frontImageUrl}
                    alt={donationCard.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No image
                  </div>
                )}
              </div>

              <div className="ml-4 flex-grow">
                <h4 className="font-medium text-gray-900">
                  {donationCard.player} - {donationCard.brand}
                </h4>
                <p className="text-sm text-gray-600">
                  Card #{donationCard.cardNumber} •{" "}
                  {donationCard.grade || "Ungraded"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {donationCard.certificationNumber || "No certification"}
                </p>
                <div className="mt-2">
                  <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs font-medium">
                    Donation Item
                  </span>
                </div>
              </div>

              <div className="ml-4 flex flex-col items-end">
                <span className="font-bold text-pink-600 text-lg">FREE</span>
                <span className="text-xs text-gray-500">Donation</span>
              </div>
            </div>

            {/* Shipping options */}
            {isAuthenticated && user.address && !showAddressForm && (
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center mb-2">
                  <Truck size={18} className="text-gray-600 mr-2" />
                  <h4 className="font-medium text-gray-800">
                    Shipping Options (You pay shipping only)
                  </h4>
                </div>

                {isLoadingRates ? (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Loader2 className="animate-spin" size={16} />
                    <span>Loading shipping options...</span>
                  </div>
                ) : (
                  <>
                    {(() => {
                      const vendorRates = shippingRates?.find(
                        (group) => group.vendorId === donationCard.vendorId
                      );

                      if (
                        !vendorRates ||
                        !vendorRates.rates ||
                        vendorRates.rates.length === 0
                      ) {
                        return (
                          <div className="flex items-center justify-between p-2 rounded-md my-1 bg-yellow-50 border border-yellow-200">
                            <span className="text-yellow-700 text-sm">
                              No shipping options available
                            </span>
                          </div>
                        );
                      }

                      return vendorRates.rates.map((rate) => (
                        <div
                          key={rate.objectId}
                          className={`flex items-center justify-between p-2 rounded-md cursor-pointer my-1 border ${
                            selectedRates[donationCard.vendorId]?.objectId ===
                            rate.objectId
                              ? "border-pink-500 bg-pink-50"
                              : "border-gray-200 hover:bg-gray-100"
                          }`}
                          onClick={() =>
                            handleSelectRate(donationCard.vendorId, rate)
                          }
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              checked={
                                selectedRates[donationCard.vendorId]
                                  ?.objectId === rate.objectId
                              }
                              onChange={() =>
                                handleSelectRate(donationCard.vendorId, rate)
                              }
                              className="mr-2 text-pink-600 focus:ring-pink-500"
                            />
                            <div>
                              <p className="font-medium">
                                {rate.provider} - {rate.servicelevel.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {rate.durationTerms ||
                                  `Est. delivery: ${rate.estimatedDays} days`}
                              </p>
                              {rate.attributes &&
                                rate.attributes.length > 0 && (
                                  <p className="text-xs text-pink-600 mt-1">
                                    {rate.attributes.includes("CHEAPEST") &&
                                      "Cheapest • "}
                                    {rate.attributes.includes("FASTEST") &&
                                      "Fastest • "}
                                    {rate.attributes.includes("BESTVALUE") &&
                                      "Best Value"}
                                  </p>
                                )}
                            </div>
                          </div>
                          <span className="font-medium">
                            ${parseFloat(rate.amount).toFixed(2)}
                          </span>
                        </div>
                      ));
                    })()}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Donation Request Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Heart className="mr-2 text-pink-500" size={20} />
              Tell us why you'd like this card
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <User size={16} className="inline mr-1" />
                  Your Name/Username *
                </label>
                <input
                  type="text"
                  id="username"
                  value={donationForm.username}
                  onChange={(e) => handleFormChange("username", e.target.value)}
                  placeholder="Enter your name or username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <MessageSquare size={16} className="inline mr-1" />
                  Why do you need this card? *
                </label>
                <textarea
                  id="reason"
                  value={donationForm.reason}
                  onChange={(e) => handleFormChange("reason", e.target.value)}
                  placeholder="Please explain why you would like to receive this donation card. Tell us about your collection, your passion for the sport/player, or any special reason. (Minimum 20 characters)"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                  minLength={20}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {donationForm.reason.length}/20 minimum characters
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-1/3">
          {showAddressForm ? (
            <div className="mb-6">
              <AddressForm
                formData={addressFormData}
                setFormData={setAddressFormData}
                onBack={() => setShowAddressForm(false)}
              />
              <button
                onClick={handleAddressSubmit}
                disabled={isSavingAddress}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-md transition-colors mt-4 flex items-center justify-center"
              >
                {isSavingAddress ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Address & Continue"
                )}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Donation Summary
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Card Value</span>
                  <span className="font-medium text-pink-600">FREE</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Cost</span>
                  {isLoadingRates ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <span className="font-medium">
                      ${shippingTotal.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">You Pay</span>
                  <span className="font-bold text-gray-900">
                    ${shippingTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mb-4 p-3 bg-pink-50 rounded-md border border-pink-200">
                <p className="text-sm text-pink-700">
                  <Gift size={14} className="inline mr-1" />
                  You're receiving this card as a donation! You only pay for
                  shipping.
                </p>
              </div>

              {isAuthenticated ? (
                <div>
                  {user.address && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-gray-800 flex items-center">
                          <MapPin size={14} className="mr-1" />
                          Shipping Address
                        </h4>
                        <button
                          onClick={() => setShowAddressForm(true)}
                          className="text-xs text-pink-600 hover:text-pink-800"
                        >
                          Change
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        {user.address.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user.address.line1}
                      </p>
                      {user.address.line2 && (
                        <p className="text-sm text-gray-600">
                          {user.address.line2}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        {user.address.city}, {user.address.state}{" "}
                        {user.address.postalCode}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user.address.country}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleDonationCheckout}
                    disabled={
                      isProcessingPayment ||
                      isLoadingRates ||
                      !isFormValid() ||
                      !shippingRates ||
                      Object.keys(selectedRates).length === 0 ||
                      !allVendorsHaveRates
                    }
                    className={`w-full font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center
                      ${
                        isProcessingPayment ||
                        isLoadingRates ||
                        !isFormValid() ||
                        !shippingRates ||
                        Object.keys(selectedRates).length === 0 ||
                        !allVendorsHaveRates
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-pink-500 hover:bg-pink-600 text-white"
                      }`}
                  >
                    {isProcessingPayment ? (
                      <>
                        <Loader2 size={20} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} className="mr-2" />
                        Request Donation
                      </>
                    )}
                  </button>

                  {!isFormValid() && (
                    <p className="text-xs text-red-500 mt-2 text-center">
                      Please complete the form above
                    </p>
                  )}
                </div>
              ) : (
                <button
                  onClick={() =>
                    navigate("/signin?redirect=/donateCardReceiver")
                  }
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
                >
                  Sign In to Request
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Wrap with ErrorBoundary
const DonateCardReceiverWithErrorBoundary = () => (
  <ErrorBoundary>
    <DonateCardReceiver />
  </ErrorBoundary>
);

export default DonateCardReceiverWithErrorBoundary;
