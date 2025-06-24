// Updated handleDonationComple"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { User, MapPin, Phone, Check } from "lucide-react";
import { createAddress } from "../../../api/profile"; // Adjust path as needed
import Swal from "sweetalert2";
import { useAuth } from "../../../Context/AuthContext";

export default function DonationCompletionForm({ onSubmit, donationData }) {
  const [formData, setFormData] = useState({

    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
  });
const {user}=useAuth()
    //console.log(user)
  // Mutation for saving address via API
  const { mutate: saveAddress, isLoading } = useMutation({
    mutationFn: () => createAddress(formData),
    onSuccess: async (response) => {
      // Show success message
      await Swal.fire({
        icon: "success",
        title: "Address Saved!",
        text: "Your contact information has been saved successfully.",
        confirmButtonColor: "#22c55e",
        timer: 2000,
        showConfirmButton: false
      });

      // Call the parent's onSubmit with the form data and API response
      if (onSubmit) {
        await onSubmit({ 
          addressData: formData, 
          apiResponse: response 
        });
      }
    },
    onError: (error) => {
      console.error("Error saving address:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save your contact information. Please try again.",
        confirmButtonColor: "#f87171",
      });
    },
  });
useEffect(() => {
  if (user?.address) {
    setFormData({
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['name', 'line1', 'city', 'state', 'country', 'postalCode', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields.",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    // Save address via API
    saveAddress();
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Complete Your Donation</h2>
      </div>

      {donationData && (
        <div className="bg-white p-4 rounded-lg mb-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Donation Summary</h3>
          <p className="text-sm text-gray-600">
            Your Pokémon card donation has been processed. Please complete your contact information below.
          </p>
          {donationData.id && (
            <p className="text-xs text-gray-500 mt-1">
              Donation ID: {donationData.id}
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-green-500" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Full Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              icon={<User className="h-4 w-4" />} 
            />
            <InputField 
              label="Phone Number" 
              name="phone" 
              type="tel"
              value={formData.phone} 
              onChange={handleChange} 
              icon={<Phone className="h-4 w-4" />} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <InputField 
                label="Address Line 1" 
                name="line1" 
                value={formData.line1} 
                onChange={handleChange} 
              />
            </div>
            <div className="md:col-span-2">
              <InputField 
                label="Address Line 2 (Optional)" 
                name="line2" 
                value={formData.line2} 
                onChange={handleChange}
                required={false}
              />
            </div>
            <InputField 
              label="City" 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
            />
            <InputField 
              label="State/Province" 
              name="state" 
              value={formData.state} 
              onChange={handleChange} 
            />
            <InputField 
              label="Country" 
              name="country" 
              value={formData.country} 
              onChange={handleChange} 
            />
            <InputField 
              label="Postal Code" 
              name="postalCode" 
              value={formData.postalCode} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving Address...
              </div>
            ) : (
              "Complete Donation"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, name, value, onChange, icon, type = "text", required = true }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
          required={required}
        />
      </div>
    </div>
  );
}