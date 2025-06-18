import React from "react";
import PhoneInput from "react-phone-input-2";
import { X } from "lucide-react";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";

const AddressForm = ({ formData = {}, setFormData = () => {}, onBack = () => {} }) => {
  const [countries, setCountries] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const fetchCountries = async () => {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2"
    );
    const data = await res.json();

    // map to { name, code } and sort by name
    return data
      .map((c) => ({
        name: c.name.common,
        code: c.cca2, // ISO-3166 alpha-2
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  useEffect(() => {
    fetchCountries()
      .then(setCountries)
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-gray-200 bg-white shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Shipping Address
          </h2>
          <button
            onClick={onBack}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-md"
          >
            <X size={16} className="mr-1" />
            <span className="hidden sm:inline">Cancel</span>
          </button>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
            {/* Full Name - Full width on all screens */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors duration-200"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Address Line 1 - Full width on all screens */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address Line 1
              </label>
              <input
                type="text"
                name="line1"
                value={formData.line1 || ''}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors duration-200"
                placeholder="Street address, P.O. box"
              />
            </div>

            {/* Address Line 2 - Full width on all screens */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address Line 2 
                <span className="text-gray-500 text-xs ml-1">(Optional)</span>
              </label>
              <input
                type="text"
                name="line2"
                value={formData.line2 || ''}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors duration-200"
                placeholder="Apartment, suite, unit, building, floor, etc."
              />
            </div>

            {/* City and State - Side by side on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors duration-200"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  State/Province
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state || ''}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors duration-200"
                  placeholder="Enter state/province"
                />
              </div>
            </div>

            {/* Country and Postal Code - Side by side on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  value={formData.country || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 bg-white"
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode || ''}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors duration-200"
                  placeholder="Enter postal code"
                />
              </div>
            </div>

            {/* Phone Number - Full width with responsive styling */}
            <div className="w-full">
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <PhoneInput
                  country={"us"}
                  value={formData.phone || ''}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: "phone",
                    required: true,
                    id: "phone",
                    autoFocus: false,
                  }}
                  inputClass="!w-full !rounded-md !border !border-gray-300 !bg-white !py-2.5 !pl-12 !pr-3 focus:!border-purple-500 focus:!outline-none focus:!ring-1 focus:!ring-purple-500 !text-sm !transition-colors !duration-200"
                  containerClass="w-full"
                  buttonClass="!border-r !border-gray-300 !bg-white !rounded-l-md hover:!bg-gray-50 !transition-colors !duration-200"
                  dropdownClass="!z-50 !max-h-48 !overflow-y-auto !text-sm"
                />
              </div>
            </div>

            {/* Action Buttons - Responsive layout */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-gray-100">
              {/* <button
                type="button"
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              >
                Back
              </button> */}
              {/* <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              >
                Save Address
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;