import React from "react";
import PhoneInput from "react-phone-input-2";
import { X } from "lucide-react";
import "react-phone-input-2/lib/style.css";

const AddressForm = ({ formData, setFormData, onBack }) => {
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

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Shipping Address</h2>
        <button
          onClick={onBack}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <X size={16} className="mr-1" /> Cancel
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Full Name */}
        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>

        {/* Address Line 1 */}
        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Address Line 1
          </label>
          <input
            type="text"
            name="line1"
            value={formData.line1}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Address Line 2 */}
        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            name="line2"
            value={formData.line2}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* City */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* State */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            State/Province
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Country */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Postal Code */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        {/* Phone */}
        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <PhoneInput
            country={"us"}
            value={formData.phone}
            onChange={handlePhoneChange}
            inputClass="!w-full !rounded-md !border-gray-300 !p-2 focus:!border-purple-500 focus:!outline-none focus:!ring-1 focus:!ring-purple-500"
            inputProps={{
              name: "phone",
              required: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
