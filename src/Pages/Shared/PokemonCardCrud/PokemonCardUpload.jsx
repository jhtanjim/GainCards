import React, { useState } from 'react';
import { createPokemon } from '../../../api/pokemondata';

const PokemonCardUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    certificationNumber: '',
    labelType: '',
    hasReverseBarcode: false,
    year: '',
    brand: '',
    sport: 'TCG Cards',
    cardNumber: '',
    player: '',
    varietyPedigree: '',
    grade: '',
    population: 0,
    vendorId: ''
  });

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    const inputValue = type === 'checkbox' ? checked : 
                       type === 'number' ? Number(value) : 
                       value;
    
    setFormData({
      ...formData,
      [name]: inputValue
    });
  };

  const handleImageChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'front') {
        setFrontImage(e.target.files[0]);
      } else {
        setBackImage(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Create FormData object to send both file and text data
      const data = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      
      // Append images if they exist
      if (frontImage) data.append('frontImage', frontImage);
      if (backImage) data.append('backImage', backImage);

      // Send data to API
      const response = await createPokemon(data);
      
      // Reset form on success
      setFormData({
        title: '',
        description: '',
        price: 0,
        certificationNumber: '',
        labelType: '',
        hasReverseBarcode: false,
        year: '',
        brand: '',
        sport: 'TCG Cards',
        cardNumber: '',
        player: '',
        varietyPedigree: '',
        grade: '',
        population: 0,
        vendorId: ''
      });
      setFrontImage(null);
      setBackImage(null);
      
      // Show success message
      setMessage({ 
        text: 'Pokemon card added successfully!', 
        type: 'success' 
      });
      
    } catch (error) {
      console.error('Error adding Pokemon card:', error);
      setMessage({ 
        text: 'Failed to add Pokemon card. Please try again.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6  rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Pokemon Card</h2>
      
      {message.text && (
        <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          {/* Certification Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Certification Number</label>
            <input
              type="text"
              name="certificationNumber"
              value={formData.certificationNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          {/* Label Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Label Type</label>
            <input
              type="text"
              name="labelType"
              value={formData.labelType}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          {/* Has Reverse Barcode */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="hasReverseBarcode"
              checked={formData.hasReverseBarcode}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">Has Reverse Barcode</label>
          </div>
          
          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          {/* Sport */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Sport</label>
            <input
              type="text"
              name="sport"
              value={formData.sport}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          {/* Player */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Player/Pokemon</label>
            <input
              type="text"
              name="player"
              value={formData.player}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          {/* Variety Pedigree */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Variety/Pedigree</label>
            <input
              type="text"
              name="varietyPedigree"
              value={formData.varietyPedigree}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          {/* Grade */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Grade</label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          {/* Population */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Population</label>
            <input
              type="number"
              name="population"
              value={formData.population}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              min="0"
              required
            />
          </div>
          
          {/* Vendor ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Vendor ID</label>
            <input
              type="text"
              name="vendorId"
              value={formData.vendorId}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          
          {/* Front Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Front Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'front')}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {frontImage && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Selected: {frontImage.name}</p>
              </div>
            )}
          </div>
          
          {/* Back Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Back Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'back')}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {backImage && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Selected: {backImage.name}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Add Pokemon Card'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PokemonCardUpload;