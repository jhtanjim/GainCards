import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";

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
      toast.error(result.error.message);
    } else {
      toast.success("Payment successful!");
      onSuccess();
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
