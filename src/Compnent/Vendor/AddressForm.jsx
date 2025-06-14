import React from "react";
import PhoneInput from "react-phone-input-2";
import { X } from "lucide-react";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";

const AddressForm = ({ formData, setFormData, onBack }) => {
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
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>

            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
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
   <div className="w-full md:col-span-2">
  <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
    Phone Number
  </label>
  <PhoneInput
    country={"us"}
    value={formData.phone}
    onChange={handlePhoneChange}
    inputProps={{
      name: "phone",
      required: true,
      id: "phone",
      autoFocus: false,
    }}
    inputClass="!w-full !rounded-md !border !border-gray-300 !bg-white !py-2 !pl-12 !pr-3 focus:!border-purple-500 focus:!outline-none focus:!ring-1 focus:!ring-purple-500 text-sm"
    containerClass="w-full"
    buttonClass="!border-r !border-gray-300 !bg-white"
    dropdownClass="!z-50"
  />
</div>

      </div>
    </div>
  );
};

export default AddressForm;
