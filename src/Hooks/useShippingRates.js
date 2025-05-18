import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api from "./axios";

/**
 * Custom hook to manage shipping rates
 */
export const useShippingRates = (user, productIds) => {
  const [selectedRates, setSelectedRates] = useState({});

  // Fetch shipping rates using React Query
  const {
    data: shippingRates,
    isLoading: isLoadingRates,
    refetch: refetchRates,
  } = useQuery({
    queryKey: ["shippingRates", user?.address, JSON.stringify(productIds)],
    queryFn: async () => {
      if (!user?.address || !productIds?.length) return null;

      // Prepare data for shipping calculation - using the format required by shippo/rates API
      const requestData = {
        productIds: productIds,
      };

      const response = await api.post("/shippo/rates", requestData);
      return response.data;
    },
    enabled: !!(user?.address && productIds?.length),
  });

  // Set default selected rates when shipping rates change
  useEffect(() => {
    if (shippingRates && shippingRates.length > 0) {
      const newSelectedRates = { ...selectedRates };

      shippingRates.forEach((vendorGroup) => {
        if (!selectedRates[vendorGroup.vendorId]) {
          const cheapestRate = vendorGroup.rates.find((rate) =>
            rate.attributes.includes("CHEAPEST")
          );

          if (cheapestRate) {
            newSelectedRates[vendorGroup.vendorId] = cheapestRate;
          } else if (vendorGroup.rates.length > 0) {
            newSelectedRates[vendorGroup.vendorId] = vendorGroup.rates[0];
          }
        }
      });

      // Only update if there are new rates to select
      if (
        Object.keys(newSelectedRates).length !==
        Object.keys(selectedRates).length
      ) {
        setSelectedRates(newSelectedRates);
      }
    }
  }, [selectedRates, shippingRates]);

  // Handle selecting a shipping rate
  const handleSelectRate = (vendorId, rate) => {
    setSelectedRates((prev) => ({
      ...prev,
      [vendorId]: rate,
    }));
  };

  // Calculate total shipping cost across all selected rates
  const calculateTotalShipping = (defaultShipping = 0) => {
    if (!shippingRates || Object.keys(selectedRates).length === 0)
      return defaultShipping;

    return Object.values(selectedRates).reduce((total, rate) => {
      return total + parseFloat(rate.amount);
    }, 0);
  };

  // Check if all vendor groups have a selected rate
  const allVendorsHaveRates =
    shippingRates &&
    shippingRates.length > 0 &&
    shippingRates.every((vendorGroup) => selectedRates[vendorGroup.vendorId]);

  return {
    shippingRates,
    selectedRates,
    isLoadingRates,
    refetchRates,
    handleSelectRate,
    calculateTotalShipping,
    allVendorsHaveRates,
  };
};

export default useShippingRates;
