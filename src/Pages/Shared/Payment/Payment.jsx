import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../Compnent/CheckoutForm";
import { useShop } from "../../../Context/ShopContext";
import { stripePromise } from "../../../api/stripe";

const Payment = () => {
  const { clientSecret,clearCart  } = useShop();

  if (!clientSecret) {
    return <p>Loading payment form...</p>;
  }

  const options = {
    clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}
   
    >
      <div className="flex justify-center items-center">
        <CheckoutForm  clearCart={clearCart}  />
      </div>
    </Elements>
  );
};

export default Payment;
