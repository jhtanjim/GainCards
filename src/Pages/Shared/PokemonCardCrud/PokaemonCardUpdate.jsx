import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { updatePokemon } from "../../../api/pokemondata";
import Swal from "sweetalert2";

const PokemonCardUpdate = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const pokemon = location.state?.pokemon;

  if (!pokemon) {
    Swal.fire({
      icon: 'error',
      title: 'No Data Found',
      text: 'No Pokémon data found. Please go back and try again.',
      confirmButtonColor: '#3085d6'
    }).then(() => {
      navigate(-1); // Navigate back after alert is closed
    });
    
    return (
      <div className="text-center mt-10 text-red-500">
        No Pokémon data found. Please go back and try again.
      </div>
    );
  }

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

    // Prepare form data for image upload
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("year", formData.year);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("sport", formData.sport);
    formDataToSend.append("cardNumber", formData.cardNumber);
    formDataToSend.append("player", formData.player);
    formDataToSend.append("varietyPedigree", formData.varietyPedigree);
    formDataToSend.append("certificationNumber", formData.certificationNumber);
    formDataToSend.append("labelType", formData.labelType);
    formDataToSend.append("hasReverseBarcode", formData.hasReverseBarcode);
    formDataToSend.append("grade", formData.grade);
    formDataToSend.append("population", formData.population);

    // Append images if selected
    if (frontImage) {
      formDataToSend.append("frontImage", frontImage);
    }
    if (backImage) {
      formDataToSend.append("backImage", backImage);
    }

    try {
      await updatePokemon(id, formDataToSend); // Use the API method for updating with FormData
      
      // Success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Pokémon card updated successfully!',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        // After confirmation, you could navigate back to cards list
        navigate('/myCards');
      });
      
    } catch (error) {
      console.error("Error updating card:", error);
      
      // Error message
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
        navigate('/my-cards');
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Pokémon Card</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Title */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-4 py-3"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-4 py-3"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded px-4 py-3"
            required
          />
        </div>

        {/* Front Image Upload */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Front Image</label>
          <input
            type="file"
            name="frontImage"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "front")}
            className="w-full border rounded px-4 py-3"
          />
          {formData.frontImageUrl && !frontImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Current image: {formData.frontImageUrl.split('/').pop()}</p>
              <img src={formData.frontImageUrl} alt="Front" className="h-20 mt-1 rounded" />
            </div>
          )}
        </div>

        {/* Back Image Upload */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Back Image</label>
          <input
            type="file"
            name="backImage"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "back")}
            className="w-full border rounded px-4 py-3"
          />
          {formData.backImageUrl && !backImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Current image: {formData.backImageUrl.split('/').pop()}</p>
              <img src={formData.backImageUrl} alt="Back" className="h-20 mt-1 rounded" />
            </div>
          )}
        </div>

        {/* Year */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border rounded px-4 py-3"
            required
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border rounded px-4 py-3"
            required
          />
        </div>

        {/* Sport */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Sport</label>
          <input
            type="text"
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            className="w-full border rounded px-4 py-3"
            required
          />
        </div>

        {/* Card Number */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="w-full border rounded px-4 py-3"
            required
          />
        </div>

        {/* Player */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Player</label>
          <input
            type="text"
            name="player"
            value={formData.player}
            onChange={handleChange}
            className="w-full border rounded px-4 py-3"
            required
          />
        </div>

        {/* Variety Pedigree */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Variety Pedigree</label>
          <input
            type="text"
            name="varietyPedigree"
            value={formData.varietyPedigree}
            onChange={handleChange}
            className="w-full border rounded px-4 py-3"
            required
          />
        </div>

        {/* Certification Number */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Certification Number</label>
          <input
            type="text"
            name="certificationNumber"
            value={formData.certificationNumber}
            onChange={handleChange}
            className="w-full border rounded px-4 py-3"
            required
          />
        </div>

        {/* Label Type */}
   {/* Label Type (Select Dropdown) */}
   <div>
          <label className="block font-semibold text-gray-700 mb-2">Label Type</label>
          <select
            name="labelType"
            value={formData.labelType}
            onChange={handleChange}
            className="w-full border rounded px-4 py-3"
            required
          >
            <option value="">Select Label Type</option>
            <option value="Premium">Premium</option>
            <option value="Rare">Rare</option>
            <option value="Limited">Limited</option>
          </select>
        </div>

        {/* Grade */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Grade</label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full border rounded px-4 py-3"
            required
          />
        </div>

        {/* Population */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Population</label>
          <input
            type="number"
            name="population"
            value={formData.population}
            onChange={handleChange}
            className="w-full border rounded px-4 py-3"
            required
          />
        </div>

        {/* Reverse Barcode */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="hasReverseBarcode"
            checked={formData.hasReverseBarcode}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="font-semibold text-gray-700">Has Reverse Barcode?</label>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-full"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full"
          >
            {loading ? "Updating..." : "Update Card"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PokemonCardUpdate;