import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  CheckCircle,
  ChevronLeft,
  CreditCard,
  Loader2,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useShop } from "../../../Context/ShopContext";
import { stripePromise } from "../../../api/stripe";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useShop();
  const client_secret = searchParams.get("client_secret");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!client_secret) {
      navigate("/myBag");
    } else {
      setIsLoading(false);
    }
  }, [client_secret, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-purple-600" />
      </div>
    );
  }

  const options = {
    clientSecret: client_secret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#9333ea",
      },
    },
  };

  return (
    <div className="mx-auto max-w-3xl p-4 mt-8">
      <button
        onClick={() => navigate("/myBag")}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ChevronLeft size={20} className="mr-1" />
        Back to Cart
      </button>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <CreditCard className="mr-2" size={24} /> Payment
        </h1>

        <div className="mb-6 p-3 bg-blue-50 rounded-md border border-blue-100 flex items-start">
          <Shield
            className="text-blue-500 mr-3 mt-0.5 flex-shrink-0"
            size={20}
          />
          <p className="text-sm text-blue-700">
            Your payment is secure. We use Stripe to process payments and never
            store your card details.
          </p>
        </div>

        {client_secret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm onSuccess={() => clearCart()} />
          </Elements>
        )}
      </div>
    </div>
  );
};

const CheckoutForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const handleSubmit = async (event) => {
    event?.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/payment-success",
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent?.status === "succeeded") {
      setIsPaymentComplete(true);
      if (onSuccess) onSuccess();

      setTimeout(() => {
        navigate("/myOrders");
      }, 2000);
    }
  };

  if (isPaymentComplete) {
    return (
      <div className="flex flex-col items-center py-8">
        <CheckCircle size={64} className="text-green-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Thank you for your purchase. Redirecting you to the confirmation
          page...
        </p>
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement className="mb-6" />

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 rounded-md border border-red-100 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center
          ${
            !stripe || isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
      >
        {isProcessing ? (
          <>
            <Loader2 size={20} className="animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
};

export default CheckoutPage;
