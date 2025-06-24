import {
  CreditCard,
  Loader2,
  Package,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "../../../../error-boundary";
import AddressForm from "../../../Compnent/Vendor/AddressForm";
import { useAuth } from "../../../Context/AuthContext";
import { useShop } from "../../../Context/ShopContext";
import useAddressForm from "../../../Hooks/useAddressForm";
import useShippingRates from "../../../Hooks/useShippingRates";
import { placeOrder } from "../../../api/orders";

const CartPage = () => {
  const { cartItems: shopCart, removeItem } = useShop();
  const { user, isAuthenticated ,fetchUserData} = useAuth();
  const navigate = useNavigate();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Ensure cart is defined with a default empty array
  const cart = shopCart || [];

  // Group cart items by vendor
  const vendorGroups = {};

  cart.forEach((item) => {
    if (!vendorGroups[item.vendorId]) {
      vendorGroups[item.vendorId] = [];
    }
    vendorGroups[item.vendorId].push(item);
  });

  // Flatten all product IDs for shipping calculation
  const allProductIds = cart.map((item) => item.id);

  // Handle address form
  const {
    showAddressForm,
    setShowAddressForm,
    addressFormData,
    setAddressFormData,
    handleAddressSubmit,
    isSavingAddress,
  } = useAddressForm(user, () => {fetchUserData();refetchRates()});

  // Get shipping rates
  const {
    shippingRates,
    selectedRates,
    isLoadingRates,
    refetchRates,
    handleSelectRate,
    calculateTotalShipping,
    allVendorsHaveRates,
  } = useShippingRates(user, allProductIds);

  // Calculate cart totals
  const subtotal = cart.reduce((total, item) => total + (item.price || 0), 0);
  const shippingTotal =
    typeof calculateTotalShipping === "function" ? calculateTotalShipping() : 0;

  // Handle checkout process
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      // Redirect to login if not logged in
      navigate("/signin?redirect=/myBag");
      return;
    }

    if (!user.address && !showAddressForm) {
      setShowAddressForm(true);
      return;
    }

    if (cart.length === 0) {
      return;
    }

    try {
      setIsProcessingPayment(true);

      // Prepare order data with items grouped by vendor
      // Prepare order data with items grouped by vendor
      const orderData = Object.entries(vendorGroups).map(
        ([vendorId, items]) => {
          // Get selected shipping rate for this vendor
          const shippingRate = selectedRates[vendorId] || null;

          return {
            vendorId,
            items: items.map((item) => item.id),
            shipping: shippingRate
              ? {
                  rateId: shippingRate.objectId,
                  amount: parseFloat(shippingRate.amount),
                  provider: shippingRate.provider,
                  service: shippingRate.servicelevel?.name || "Standard",
                  estimatedDays: shippingRate.estimatedDays || null,
                }
              : null,
          };
        }
      );

      const data = await placeOrder(orderData);
      const { paymentIntent } = data;

      //console.log(paymentIntent.clientSecret);
      navigate(`/checkout?client_secret=${paymentIntent.clientSecret}`);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      alert("Something went wrong. Please try again.");
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

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-6xl p-4 mt-8">
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingCart size={64} className="text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any Pokemon cards to your cart yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-4 mt-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <ShoppingCart className="mr-2" size={28} /> Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="w-full lg:w-2/3">
          {Object.entries(vendorGroups).map(([vendorId, items]) => (
            <div
              key={vendorId}
              className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="border-b border-gray-200 p-4 bg-gray-50 rounded-t-lg">
                <div className="flex items-center">
                  <Package size={20} className="text-gray-600 mr-2" />
                  <h3 className="font-medium text-gray-800">
                    Vendor {vendorId.substring(0, 8)}...
                  </h3>
                </div>
              </div>

              {/* Item list */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-4 flex items-center">
                    <div className="w-20 h-28 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      {item.frontImageUrl ? (
                        <img
                          src={item.frontImageUrl}
                          alt={item.title}
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
                        {item.player} - {item.brand}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Card #{item.cardNumber} • {item.grade}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.certificationNumber}
                      </p>
                    </div>

                    <div className="ml-4 flex flex-col items-end">
                      <span className="font-medium text-gray-900">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-600 hover:text-red-800 mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping options for this vendor */}
              {isAuthenticated && user.address && !showAddressForm && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center mb-2">
                    <Truck size={18} className="text-gray-600 mr-2" />
                    <h4 className="font-medium text-gray-800">
                      Shipping Options
                    </h4>
                  </div>

                  {isLoadingRates ? (
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Loader2 className="animate-spin" size={16} />
                      <span>Loading shipping options...</span>
                    </div>
                  ) : (
                    <>
                      {/* Find rates for this vendor */}
                      {(() => {
                        // Make sure we're looking for the correct vendor ID format
                        const vendorRates = shippingRates?.find(
                          (group) => group.vendorId === vendorId
                        );

                        if (
                          !vendorRates ||
                          !vendorRates.rates ||
                          vendorRates.rates.length === 0
                        ) {
                          return (
                            <div className="flex items-center justify-between p-2 rounded-md my-1 bg-yellow-50 border border-yellow-200">
                              <span className="text-yellow-700 text-sm">
                                No shipping options available for this vendor
                              </span>
                            </div>
                          );
                        }

                        return vendorRates.rates.map((rate) => (
                          <div
                            key={rate.objectId}
                            className={`flex items-center justify-between p-2 rounded-md cursor-pointer my-1 border ${
                              selectedRates[vendorId]?.objectId ===
                              rate.objectId
                                ? "border-purple-500 bg-purple-50"
                                : "border-gray-200 hover:bg-gray-100"
                            }`}
                            onClick={() => handleSelectRate(vendorId, rate)}
                          >
                            <div className="flex items-center">
                              <input
                                type="radio"
                                checked={
                                  selectedRates[vendorId]?.objectId ===
                                  rate.objectId
                                }
                                onChange={() =>
                                  handleSelectRate(vendorId, rate)
                                }
                                className="mr-2 text-purple-600 focus:ring-purple-500"
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
                                    <p className="text-xs text-purple-600 mt-1">
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
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-1/2">
          {showAddressForm ? (
            <div className="mb-6">
              <AddressForm
                formData={addressFormData}
                setFormData={setAddressFormData}
                
              />
              <button
                onClick={handleAddressSubmit}
                disabled={isSavingAddress}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors mt-4 flex items-center justify-center"
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
                Order Summary
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {isLoadingRates ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <span className="font-medium">
                      ${shippingTotal.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">
                    ${(subtotal + shippingTotal).toFixed(2)}
                  </span>
                </div>
              </div>

              {isAuthenticated ? (
                <div>
                  {user.address && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-gray-800">
                          Shipping Address
                        </h4>
                        <button
                          onClick={() => setShowAddressForm(true)}
                          className="text-xs text-purple-600 hover:text-purple-800"
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
                    onClick={handleCheckout}
                    disabled={
                      isProcessingPayment ||
                      isLoadingRates ||
                      !shippingRates ||
                      Object.keys(selectedRates).length === 0 ||
                      !allVendorsHaveRates
                    }
                    className={`w-full font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center
                      ${
                        isProcessingPayment ||
                        isLoadingRates ||
                        !shippingRates ||
                        Object.keys(selectedRates).length === 0 ||
                        !allVendorsHaveRates
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
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
                        Proceed to Checkout
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/signin?redirect=/cart")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
                >
                  Sign In to Checkout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Wrap CartPage with ErrorBoundary
const CartPageWithErrorBoundary = () => (
  <ErrorBoundary>
    <CartPage />
  </ErrorBoundary>
);

export default CartPageWithErrorBoundary;