"use client"

import { useState } from "react"
import { createPokemon } from "../../../api/pokemondata"
import { Upload, Info, CheckCircle, AlertCircle } from "lucide-react"
import Swal from "sweetalert2"

export default function PokemonCardUpload() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    certificationNumber: "",
    labelType: "",
    hasReverseBarcode: false,
    year: "",
    brand: "",
    sport: "TCG Cards",
    cardNumber: "",
    player: "",
    varietyPedigree: "",
    grade: "",
    population: 0,
    vendorId: "",
  })

  const [frontImage, setFrontImage] = useState(null)
  const [backImage, setBackImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    // Handle different input types
    const inputValue = type === "checkbox" ? checked : type === "number" ? Number(value) : value

    setFormData({
      ...formData,
      [name]: inputValue,
    })
  }

  const handleImageChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      if (type === "front") {
        setFrontImage(e.target.files[0])
      } else {
        setBackImage(e.target.files[0])
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
  
    try {
      const data = new FormData()
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key])
      })
      if (frontImage) data.append("frontImage", frontImage)
      if (backImage) data.append("backImage", backImage)
  
      const response = await createPokemon(data)
  
      // Reset form
      setFormData({
        title: "",
        description: "",
        price: 0,
        certificationNumber: "",
        labelType: "",
        hasReverseBarcode: false,
        year: "",
        brand: "",
        sport: "TCG Cards",
        cardNumber: "",
        player: "",
        varietyPedigree: "",
        grade: "",
        population: 0,
        vendorId: "",
      })
      setFrontImage(null)
      setBackImage(null)
  
      // SweetAlert success
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Pokemon card added successfully!",
        confirmButtonColor: "#facc15", // Tailwind yellow-400
      })
    } catch (error) {
      console.error("Error adding Pokemon card:", error)
  
      // SweetAlert error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add Pokemon card. Please try again.",
        confirmButtonColor: "#f87171", // Tailwind red-400
      })
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center">
          <Upload className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Add New Pokemon Card</h2>
      </div>

      {/* {message.text && (
        <div
          className={`p-4 mb-6 rounded-lg flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border-l-4 border-green-500"
              : "bg-red-100 text-red-800 border-l-4 border-red-500"
          }`}
        >
          {message.type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          {message.text}
        </div>
      )} */}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-yellow-500" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                required
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-yellow-500" />
            Card Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Certification Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Certification Number</label>
              <input
                type="text"
                name="certificationNumber"
                value={formData.certificationNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                required
              />
            </div>

            {/* Label Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label Type</label>
              <input
                type="text"
                name="labelType"
                value={formData.labelType}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                required
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                required
              />
            </div>

            {/* Sport */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
              <input
                type="text"
                name="sport"
                value={formData.sport}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                required
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                required
              />
            </div>

            {/* Player */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Player/Pokemon</label>
              <input
                type="text"
                name="player"
                value={formData.player}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                required
              />
            </div>

            {/* Variety Pedigree */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variety/Pedigree</label>
              <input
                type="text"
                name="varietyPedigree"
                value={formData.varietyPedigree}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                required
              />
            </div>

            {/* Grade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                required
              />
            </div>

            {/* Population */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Population</label>
              <input
                type="number"
                name="population"
                value={formData.population}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                min="0"
                required
              />
            </div>

            {/* Vendor ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vendor ID</label>
              <input
                type="text"
                name="vendorId"
                value={formData.vendorId}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
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
                className="h-5 w-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
              />
              <label className="ml-2 block text-sm text-gray-700">Has Reverse Barcode</label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-yellow-500" />
            Card Images
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Front Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Front Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="front-image"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="front-image"
                        name="front-image"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "front")}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  {frontImage && <p className="text-xs text-green-600 font-medium">Selected: {frontImage.name}</p>}
                </div>
              </div>
            </div>

            {/* Back Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Back Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="back-image"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="back-image"
                        name="back-image"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "back")}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  {backImage && <p className="text-xs text-green-600 font-medium">Selected: {backImage.name}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-medium rounded-lg shadow-md hover:from-yellow-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Add Pokemon Card"}
          </button>
        </div>
      </form>
    </div>
  )
}
