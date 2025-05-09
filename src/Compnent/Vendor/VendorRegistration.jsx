import { Elements } from "@stripe/react-stripe-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { stripePromise } from "../../api/stripe";
import { getAllPlan } from "../../api/subscription";
import { registerVendor } from "../../api/vendor";
import { useAuth } from "../../Context/AuthContext";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import PlanCard from "./PlanCard";

const VendorRegistration = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentStep, setCurrentStep] = useState("plans"); // plans, address, payment
  const [addressData, setAddressData] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
  });
  const [clientSecret, setClientSecret] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);

  // Get user from authentication context
  const { user } = useAuth();
  const userId = user?.id;
  const navigate = useNavigate();

  // Query to get all subscription plans
  const { data: plans, isLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: getAllPlan,
    enabled: !!userId, // Only run the query if userId exists
  });

  // Only sort plans when the data exists
  const sortedPlans = plans ? [...plans].sort((a, b) => a.price - b.price) : [];

  // Effect to check authentication
  useEffect(() => {
    if (!user) {
      navigate("/signin", { replace: true });
    }
  }, [user, navigate]);

  // Define the vendor registration mutation
  const registerVendorMutation = useMutation({
    // Wrap the API call in a try/catch for better error handling
    mutationFn: async (data) => {
      try {
        console.log("Submitting vendor registration with data:", data);
        const response = await registerVendor(data);
        console.log("Vendor registration API response:", response);
        return response;
      } catch (error) {
        console.error("Error in vendor registration:", error);
        throw error;
      }
    },
    onSuccess: (response) => {
      console.log("Registration successful, response:", response);

      // Handle different response structures that might come from the API
      const data = response.data || response;

      // Look for client secret in different possible locations
      const clientSecret =
        data.clientSecret ||
        data.client_secret ||
        (data.payment && data.payment.clientSecret);

      console.log("Extracted client secret:", clientSecret);

      if (!clientSecret) {
        console.error("No client secret found in response:", data);
        toast.error("Could not process payment setup. Please try again.");
        setLoadingPayment(false);
        return;
      }

      setClientSecret(clientSecret);
      setCurrentStep("payment");
    },
    onError: (error) => {
      console.error("Registration error:", error);

      // Log more details about the error
      if (error.response) {
        console.error("Error response:", error.response);
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
      }

      // More specific error messages based on the error
      let errorMessage = "Failed to process registration";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.status === 401) {
        errorMessage = "Authentication error. Please log in again.";
      } else if (error.response?.status === 400) {
        errorMessage = "Invalid data submitted. Please check your information.";
      } else if (error.response?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      }

      toast.error(errorMessage);
    },
    onSettled: () => {
      setLoadingPayment(false);
    },
  });

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleContinueToAddress = () => {
    if (!selectedPlan) {
      toast.error("Please select a plan to continue");
      return;
    }
    setCurrentStep("address");
  };

  const handleContinueToPayment = async () => {
    // Validate form
    const requiredFields = [
      "name",
      "line1",
      "city",
      "state",
      "country",
      "postalCode",
      "phone",
    ];
    const missingFields = requiredFields.filter((field) => !addressData[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    setLoadingPayment(true);
    console.log("Starting payment process with plan:", selectedPlan);

    // Use the mutation
    registerVendorMutation.mutate({
      planId: selectedPlan.id,
      address: addressData,
    });
  };

  const handleBackToPlans = () => {
    setCurrentStep("plans");
  };

  const handlePaymentSuccess = () => {
    toast.success("Welcome aboard! Your vendor account is now active.");
    // Redirect or show success message
    navigate("/", { replace: true });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Registration Steps */}
      <div className="mb-10">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Pokémon Vendor Registration
        </h1>

        <div className="mx-auto mb-8 flex max-w-2xl justify-between">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep === "plans"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <span className="mt-2 text-sm">Select Plan</span>
          </div>

          <div className="relative flex-1">
            <div className="absolute left-0 top-5 h-0.5 w-full bg-gray-200">
              <div
                className={`h-0.5 bg-purple-600 ${
                  currentStep !== "plans" ? "w-full" : "w-0"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep === "address"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <span className="mt-2 text-sm">Address</span>
          </div>

          <div className="relative flex-1">
            <div className="absolute left-0 top-5 h-0.5 w-full bg-gray-200">
              <div
                className={`h-0.5 bg-purple-600 ${
                  currentStep === "payment" ? "w-full" : "w-0"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep === "payment"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              3
            </div>
            <span className="mt-2 text-sm">Payment</span>
          </div>
        </div>
      </div>

      {/* Step content */}
      {currentStep === "plans" && (
        <>
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">
              Choose Your Vendor Plan
            </h2>
            <p className="text-gray-600">
              Select the best plan for your Pokémon card business
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <p>Loading plans...</p>
            </div>
          ) : sortedPlans.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {sortedPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  selectedPlan={selectedPlan}
                  onSelect={handlePlanSelect}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <p>No plans available. Please try again later.</p>
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <button
              onClick={handleContinueToAddress}
              disabled={!selectedPlan}
              className="flex items-center rounded-md bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700 disabled:bg-gray-400"
            >
              Continue <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        </>
      )}

      {currentStep === "address" && (
        <div className="mx-auto max-w-2xl">
          <AddressForm
            formData={addressData}
            setFormData={setAddressData}
            onBack={handleBackToPlans}
          />

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleContinueToPayment}
              disabled={loadingPayment}
              className="flex items-center rounded-md bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700 disabled:bg-gray-400"
            >
              {loadingPayment ? "Processing..." : "Continue to Payment"}
              {!loadingPayment && <ArrowRight className="ml-2" size={16} />}
            </button>
          </div>
        </div>
      )}

      {currentStep === "payment" && clientSecret && (
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              Order Summary
            </h3>
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span>{selectedPlan.name}</span>
              <span>${selectedPlan.price.toFixed(2)}/month</span>
            </div>

            {selectedPlan.discountPct > 0 && (
              <div className="flex justify-between border-b border-gray-200 py-3 text-green-600">
                <span>Discount ({selectedPlan.discountPct}%)</span>
                <span>
                  -$
                  {(
                    (selectedPlan.price * selectedPlan.discountPct) /
                    100
                  ).toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between pt-3">
              <span className="font-bold">Total</span>
              <span className="font-bold">
                $
                {(
                  selectedPlan.price *
                  (1 - selectedPlan.discountPct / 100)
                ).toFixed(2)}
                /month
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              Payment Details
            </h3>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm
                clientSecret={clientSecret}
                onSuccess={handlePaymentSuccess}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorRegistration;
