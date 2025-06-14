import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";

// eslint-disable-next-line no-unused-vars
const PaymentForm = ({ clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/registration-success",
      },
      redirect: "if_required",
    });

    if (result.error) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: result.error.message || "Something went wrong!",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Thank you for your payment.",
      }).then(() => {
        onSuccess(); // Call success callback after the alert is closed
      });
    }

    setIsProcessing(false);
  };

  return (
    <div className="space-y-4">
      <PaymentElement />
      <button
        onClick={handleSubmit}
        disabled={!stripe || isProcessing}
        className="mt-4 w-full rounded-md bg-purple-600 py-2 text-white transition-colors hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentForm;
