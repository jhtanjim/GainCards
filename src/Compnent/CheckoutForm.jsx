import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // <-- initialize
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success", // or your real domain
      },
      redirect: "if_required", // avoids full-page reload
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      setMessage("Payment successful!");
      // Redirect after short delay
      setTimeout(() => {
        navigate("/myOrders"); // or "/orders", etc.
      }, 2000);
    }

    setIsProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <PaymentElement />
      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Pay now"}
      </button>
      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
    </form>
  );
};

export default CheckoutForm;
