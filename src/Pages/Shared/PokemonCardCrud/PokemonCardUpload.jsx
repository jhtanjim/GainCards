"use client"

import { useState } from "react"
import { createPokemon } from "../../../api/pokemondata"
import { Upload, Info, ImageIcon } from "lucide-react"
import Swal from "sweetalert2"

export default function PokemonCardUpload() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
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
    population: "",
    vendorId: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    distanceUnit: "cm",
    massUnit: "kg",
  })

  const [frontImage, setFrontImage] = useState(null)
  const [backImage, setBackImage] = useState(null)
  const [frontImagePreview, setFrontImagePreview] = useState(null)
  const [backImagePreview, setBackImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)

  // Compress image function
  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        canvas.toBlob(resolve, "image/jpeg", quality)
      }

      img.src = URL.createObjectURL(file)
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const inputValue = type === "checkbox" ? checked : type === "number" ? Number(value) : value

    setFormData({
      ...formData,
      [name]: inputValue,
    })
  }

  const handleImageChange = async (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Compress the image
      const compressedFile = await compressImage(file)

      // Create preview
      const previewUrl = URL.createObjectURL(compressedFile)

      if (type === "front") {
        setFrontImage(compressedFile)
        setFrontImagePreview(previewUrl)
      } else {
        setBackImage(compressedFile)
        setBackImagePreview(previewUrl)
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

      await createPokemon(data)

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
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
        population: "",
        vendorId: "",
        length: "",
        width: "",
        height: "",
        weight: "",
        distanceUnit: "cm",
        massUnit: "kg",
      })
      setFrontImage(null)
      setBackImage(null)
      setFrontImagePreview(null)
      setBackImagePreview(null)

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Pokemon card added successfully!",
        confirmButtonColor: "#facc15",
      })
    } catch (error) {
      console.error("Error adding Pokemon card:", error)

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add Pokemon card. Please try again.",
        confirmButtonColor: "#f87171",
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-yellow-500" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter card title"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Describe the card condition, rarity, etc."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              >
                <option value="">Select Year</option>
                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Card Details Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-yellow-500" />
            Card Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Certification Number"
              name="certificationNumber"
              value={formData.certificationNumber}
              onChange={handleInputChange}
              placeholder="e.g., PSA123456789"
            />

            <SelectField
              label="Label Type"
              name="labelType"
              value={formData.labelType}
              onChange={handleInputChange}
              options={["Premium", "Limited", "Rare", "Common", "Uncommon", "Ultra Rare", "Secret Rare"]}
            />

            <SelectField
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              options={["Pokemon", "Topps", "Panini", "Upper Deck", "Wizards of the Coast", "Other"]}
            />

            <SelectField
              label="Sport/Category"
              name="sport"
              value={formData.sport}
              onChange={handleInputChange}
              options={["TCG Cards",  "Gaming Cards", "Collectible Cards"]}
            />

            <InputField
              label="Card Number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="e.g., 025/102"
            />

            <InputField
              label="Player/Pokemon"
              name="player"
              value={formData.player}
              onChange={handleInputChange}
              placeholder="e.g., Pikachu, Charizard"
            />

            <SelectField
              label="Variety/Pedigree"
              name="varietyPedigree"
              value={formData.varietyPedigree}
              onChange={handleInputChange}
              options={["Base Set", "Shadowless", "1st Edition", "Unlimited", "Promo", "Japanese", "Error Card"]}
            />

            <SelectField
              label="Grade"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              options={[
                "PSA 10",
                "PSA 9",
                "PSA 8",
                "PSA 7",
                "PSA 6",
                "PSA 5",
                "PSA 4",
                "PSA 3",
                "PSA 2",
                "PSA 1",
                "BGS 10",
                "BGS 9.5",
                "BGS 9",
                "BGS 8.5",
                "BGS 8",
                "CGC 10",
                "CGC 9.5",
                "CGC 9",
                "Ungraded",
              ]}
            />

            <InputField
              label="Population"
              name="population"
              type="number"
              value={formData.population}
              onChange={handleInputChange}
              placeholder="Population count"
              min="0"
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="hasReverseBarcode"
                checked={formData.hasReverseBarcode}
                onChange={handleInputChange}
                className="h-5 w-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
              />
              <label className="text-sm font-medium text-gray-700">Has Reverse Barcode</label>
            </div>
          </div>
        </div>

        {/* Packaging & Dimensions Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-yellow-500" />
            Packaging & Dimensions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Length"
              name="length"
              type="number"
              value={formData.length}
              onChange={handleInputChange}
              placeholder="0.0"
              step="0.1"
              min="0"
            />
            <InputField
              label="Width"
              name="width"
              type="number"
              value={formData.width}
              onChange={handleInputChange}
              placeholder="0.0"
              step="0.1"
              min="0"
            />
            <InputField
              label="Height"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="0.0"
              step="0.1"
              min="0"
            />
            <InputField
              label="Weight"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="0.0"
              step="0.01"
              min="0"
            />
            <SelectField
              label="Distance Unit"
              name="distanceUnit"
              value={formData.distanceUnit}
              onChange={handleInputChange}
              options={["cm", "inch", "mm"]}
            />
            <SelectField
              label="Mass Unit"
              name="massUnit"
              value={formData.massUnit}
              onChange={handleInputChange}
              options={["kg", "g", "lb", "oz"]}
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-yellow-500" />
            Card Images (Auto-compressed)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUpload
              label="Front Image"
              file={frontImage}
              preview={frontImagePreview}
              setFile={(e) => handleImageChange(e, "front")}
            />
            <ImageUpload
              label="Back Image"
              file={backImage}
              preview={backImagePreview}
              setFile={(e) => handleImageChange(e, "back")}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </div>
            ) : (
              "Add Card"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

// Reusable InputField Component
function InputField({ label, name, value, onChange, type = "text", placeholder = "", ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
        {...props}
      />
    </div>
  )
}

// Reusable SelectField Component
function SelectField({ label, name, value, onChange, options, placeholder = "Select an option" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

// Enhanced ImageUpload Component with preview and compression info
function ImageUpload({ label, file, preview, setFile }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
        <div className="space-y-2 text-center">
          {preview ? (
            <div className="space-y-2">
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="mx-auto h-32 w-32 object-cover rounded-lg border-2 border-yellow-200"
              />
              <p className="text-xs text-green-600 font-medium">✓ {file?.name} (Compressed)</p>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-500">
                  <span>Upload a file</span>
                  <input type="file" accept="image/*" onChange={setFile} className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              <p className="text-xs text-blue-500">Images will be automatically compressed</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
