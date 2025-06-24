import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { updatePokemon } from "../../../api/pokemondata";
import Swal from "sweetalert2";

const PokemonCardUpdate = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const pokemon = location.state?.pokemon;
//console.log(pokemon)
  // Early return if no pokemon data
  if (!pokemon) {
    Swal.fire({
      icon: 'error',
      title: 'No Data Found',
      text: 'No Pokémon data found. Please go back and try again.',
      confirmButtonColor: '#3085d6'
    }).then(() => {
      navigate(-1);
    });
    
    return (
      <div className="text-center mt-10 text-red-500">
        No Pokémon data found. Please go back and try again.
      </div>
    );
  }

  // Initialize form data with all pokemon properties
  const [formData, setFormData] = useState({
    title: pokemon.title || "",
    description: pokemon.description || "",
    price: pokemon.price || "",
    frontImageUrl: pokemon.frontImageUrl || "",
    backImageUrl: pokemon.backImageUrl || "",
    year: pokemon.year || "",
    brand: pokemon.brand || "",
    sport: pokemon.sport || "",
    cardNumber: pokemon.cardNumber || "",
    player: pokemon.player || "",
    varietyPedigree: pokemon.varietyPedigree || "",
    certificationNumber: pokemon.certificationNumber || "",
    labelType: pokemon.labelType || "",
    hasReverseBarcode: pokemon.hasReverseBarcode || false,
    grade: pokemon.grade || "",
    population: pokemon.population || "",
    // Fixed: Use pokemon instead of undefined cardData
    length: pokemon.length || "",
    width: pokemon.width || "",
    height: pokemon.height || "",
    weight: pokemon.weight || "",
    distanceUnit: pokemon.distanceUnit || "cm",
    massUnit: pokemon.massUnit || "kg",
  });

  const [loading, setLoading] = useState(false);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: 'Please select an image smaller than 5MB',
          confirmButtonColor: '#3085d6'
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please select a valid image file',
          confirmButtonColor: '#3085d6'
        });
        return;
      }

      if (type === "front") {
        setFrontImage(file);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Front image selected',
          text: file.name,
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
      } else {
        setBackImage(file);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Back image selected',
          text: file.name,
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
      }
    }
  };
const getSuccessNavigationRoute = () => {
  const currentPath = location.pathname;
  
  if (currentPath.startsWith('/admin')) {
    return '/admin/products'; // or '/admin/all-cards' depending on where you want to redirect
  } else if (currentPath.startsWith('/vendor')) {
    return '/vendor/products';
  } else {
    return '/pokemon'; // default route for regular users
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Show loading state with SweetAlert
    Swal.fire({
      title: 'Updating...',
      html: 'Please wait while we update your card',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    setLoading(true);

    // Prepare form data for submission
    const formDataToSend = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      if (key !== 'frontImageUrl' && key !== 'backImageUrl') {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append images if selected
    if (frontImage) {
      formDataToSend.append("frontImage", frontImage);
    }
    if (backImage) {
      formDataToSend.append("backImage", backImage);
    }

    try {
      await updatePokemon(id, formDataToSend);
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Pokémon card updated successfully!',
        confirmButtonColor: '#3085d6'
      }).then(() => {
  navigate(getSuccessNavigationRoute());
      });
      
    } catch (error) {
      console.error("Error updating card:", error);
      
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: `Failed to update card: ${error.message || 'Please try again.'}`,
        confirmButtonColor: '#3085d6'
      });
      
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Discard Changes?',
      text: "You're about to discard all changes. This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, discard!',
      cancelButtonText: 'No, keep editing'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/vendor/products'); // Fixed: consistent navigation
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Update Pokémon Card</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter card title"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your Pokémon card..."
              required
            />
          </div>
        </div>

        {/* Images Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Card Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Front Image */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Front Image</label>
              <input
                type="file"
                name="frontImage"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "front")}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.frontImageUrl && !frontImage && (
                <div className="mt-3 p-3 bg-white rounded-lg border">
                  <p className="text-sm text-gray-600 mb-2">Current image: {formData.frontImageUrl.split('/').pop()}</p>
                  <img src={formData.frontImageUrl} alt="Front" className="h-24 w-auto rounded" />
                </div>
              )}
            </div>

            {/* Back Image */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Back Image</label>
              <input
                type="file"
                name="backImage"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "back")}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.backImageUrl && !backImage && (
                <div className="mt-3 p-3 bg-white rounded-lg border">
                  <p className="text-sm text-gray-600 mb-2">Current image: {formData.backImageUrl.split('/').pop()}</p>
                  <img src={formData.backImageUrl} alt="Back" className="h-24 w-auto rounded" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card Details Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Card Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Year */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Year *</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 1998"
                required
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Brand *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Wizards of the Coast"
                required
              />
            </div>

            {/* Sport */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Sport/Category *</label>
              <input
                type="text"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Trading Card Game"
                required
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Card Number *</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 4/102"
                required
              />
            </div>

            {/* Player */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Player/Character *</label>
              <input
                type="text"
                name="player"
                value={formData.player}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Charizard"
                required
              />
            </div>

            {/* Variety Pedigree */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Variety/Pedigree *</label>
              <input
                type="text"
                name="varietyPedigree"
                value={formData.varietyPedigree}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Holo Rare"
                required
              />
            </div>
          </div>
        </div>

        {/* Certification Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Certification Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Certification Number */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Certification Number *</label>
              <input
                type="text"
                name="certificationNumber"
                value={formData.certificationNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., PSA123456"
                required
              />
            </div>

            {/* Label Type */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Label Type *</label>
              <select
                name="labelType"
                value={formData.labelType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Label Type</option>
                <option value="Premium">Premium</option>
                <option value="Rare">Rare</option>
                <option value="Limited">Limited</option>
                <option value="Standard">Standard</option>
                <option value="Special">Special</option>
              </select>
            </div>

            {/* Grade */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Grade *</label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., PSA 10"
                required
              />
            </div>

            {/* Population */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Population *</label>
              <input
                type="number"
                name="population"
                value={formData.population}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 1000"
                min="0"
                required
              />
            </div>

            {/* Reverse Barcode Checkbox */}
            <div className="flex items-center space-x-3 mt-8">
              <input
                type="checkbox"
                name="hasReverseBarcode"
                checked={formData.hasReverseBarcode}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="font-semibold text-gray-700">Has Reverse Barcode</label>
            </div>
          </div>
        </div>

        {/* Physical Dimensions Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Physical Dimensions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Length */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Length</label>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.0"
                min="0"
                step="0.1"
              />
            </div>

            {/* Width */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Width</label>
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.0"
                min="0"
                step="0.1"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Height</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.0"
                min="0"
                step="0.1"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Weight</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.0"
                min="0"
                step="0.01"
              />
            </div>

            {/* Distance Unit */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Distance Unit</label>
              <select
                name="distanceUnit"
                value={formData.distanceUnit}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="cm">Centimeters (cm)</option>
                <option value="mm">Millimeters (mm)</option>
                <option value="in">Inches (in)</option>
              </select>
            </div>

            {/* Mass Unit */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Mass Unit</label>
              <select
                name="massUnit"
                value={formData.massUnit}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="g">Grams (g)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="oz">Ounces (oz)</option>
                <option value="lb">Pounds (lb)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:transform-none"
          >
            {loading ? "Updating..." : "Update Card"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PokemonCardUpdate;