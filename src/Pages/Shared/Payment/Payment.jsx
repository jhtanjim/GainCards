import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useAuth } from "../../../Context/AuthContext";
import { useShop } from "../../../Context/ShopContext";
import api from "../../../Hooks/axios";

// Replace with your Stripe publishable key from environment variables
const stripePromise = loadStripe("pk_test_your_stripe_key");

// CheckoutForm component that contains the actual payment form
const CheckoutForm = ({ subtotal, shipping, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setCartItems } = useShop();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  // Calculate final amount
  const amount = subtotal + shipping;

  // Create payment intent when component mounts
  useEffect(() => {
    // Create a PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const response = await api.post("/create-payment-intent", {
          amount: amount * 100, // convert to cents for Stripe
          customer_email: user.email,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    if (user && amount > 0) {
      createPaymentIntent();
    }
  }, [amount, user]);

  // Create order mutation
  const { mutate: createOrder } = useMutation({
    mutationFn: async (orderData) => {
      const response = await api.post("/orders", orderData);
      return response.data;
    },
    onSuccess: (data) => {
      // Show success message and clear cart
      setIsProcessing(false);
      Swal.fire({
        title: "Order Placed Successfully!",
        text: `Your order #${data.orderId} has been placed.`,
        icon: "success",
        confirmButtonText: "Continue Shopping",
      }).then(() => {
        setCartItems([]);
        navigate("/orders");
      });
    },
    onError: (error) => {
      setIsProcessing(false);
      Swal.fire({
        title: "Order Failed",
        text: error.message || "There was an error processing your order.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: cardholderName,
          email: user.email,
          address: {
            line1: user.address.line1,
            line2: user.address.line2,
            city: user.address.city,
            state: user.address.state,
            postal_code: user.address.postalCode,
            country: user.address.country,
          },
        },
      },
    });

    if (result.error) {
      // Show error to your customer
      setIsProcessing(false);
      Swal.fire({
        title: "Payment Failed",
        text: result.error.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } else {
      if (result.paymentIntent.status === "succeeded") {
        // Payment succeeded, create the order
        const orderData = {
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity || 1,
            price: item.price,
          })),
          shippingAddress: user.address,
          totalAmount: amount,
          paymentIntentId: result.paymentIntent.id,
          // Include other necessary order details
        };

        createOrder(orderData);
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true, // We're collecting this separately
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Cardholder Name
        </label>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Name on card"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Card Details
        </label>
        <div className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-indigo-500">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-6">
        <Lock size={16} className="mr-2" />
        <span>
          Your payment is secured with SSL encryption. We do not store your card
          details.
        </span>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing || !clientSecret}
        className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 transition duration-300 ${
          !stripe || isProcessing || !clientSecret
            ? "opacity-70 cursor-not-allowed"
            : ""
        }`}
      >
        {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};
