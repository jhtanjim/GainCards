import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createAddress } from "../api/profile";

/**
 * Custom hook to manage address form state and submission
 */
const useAddressForm = (user, onAddressSaved) => {
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Form data for the address form
  const [addressFormData, setAddressFormData] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
  });

  // Check if user has address directly from user object
  useEffect(() => {
    if (user && user.address) {
      // Pre-fill the form data with existing address from user object
      setAddressFormData({
        name: user.address.name || "",
        line1: user.address.line1 || "",
        line2: user.address.line2 || "",
        city: user.address.city || "",
        state: user.address.state || "",
        country: user.address.country || "",
        postalCode: user.address.postalCode || "",
        phone: user.address.phone || "",
      });
    }
  }, [user]);

  // Mutation for saving user address
  const { mutate: saveAddress, isLoading: isSavingAddress } = useMutation({
    mutationFn: () => createAddress(addressFormData),
    onSuccess: () => {
      setShowAddressForm(false);
      if (onAddressSaved) onAddressSaved();
    },
    onError: (error) => {
      console.error("Error saving address:", error);
    },
  });

  // When user submits the address form
  const handleAddressSubmit = () => {
    saveAddress();
  };

  return {
    showAddressForm,
    setShowAddressForm,
    addressFormData,
    setAddressFormData,
    handleAddressSubmit,
    isSavingAddress,
  };
};

export default useAddressForm;
