"use client"

import { useState } from "react"
import { createPokemon } from "../../../api/pokemondata"
import { Upload, Info } from "lucide-react"
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

      await createPokemon(data)

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
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="input" required />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="input" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="input" min="0" step="0.01" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input type="number" name="year" value={formData.year} onChange={handleInputChange} className="input" required />
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
            <InputField label="Certification Number" name="certificationNumber" value={formData.certificationNumber} onChange={handleInputChange} />
            <SelectField label="Label Type" name="labelType" value={formData.labelType} onChange={handleInputChange} options={["Premium", "Limited", "Rare"]} />
            <InputField label="Brand" name="brand" value={formData.brand} onChange={handleInputChange} />
            <InputField label="Sport" name="sport" value={formData.sport} onChange={handleInputChange} />
            <InputField label="Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
            <InputField label="Player/Pokemon" name="player" value={formData.player} onChange={handleInputChange} />
            <InputField label="Variety/Pedigree" name="varietyPedigree" value={formData.varietyPedigree} onChange={handleInputChange} />
            <InputField label="Grade" name="grade" value={formData.grade} onChange={handleInputChange} />
            <InputField label="Population" name="population" type="number" value={formData.population} onChange={handleInputChange} />
            <InputField label="Vendor ID" name="vendorId" value={formData.vendorId} onChange={handleInputChange} />
            <div className="flex items-center">
              <input type="checkbox" name="hasReverseBarcode" checked={formData.hasReverseBarcode} onChange={handleInputChange} className="h-5 w-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500" />
              <label className="ml-2 block text-sm text-gray-700">Has Reverse Barcode</label>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-yellow-500" />
            Card Images
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUpload label="Front Image" file={frontImage} setFile={(e) => handleImageChange(e, "front")} />
            <ImageUpload label="Back Image" file={backImage} setFile={(e) => handleImageChange(e, "back")} />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Add Card"}
          </button>
        </div>
      </form>
    </div>
  )
}

// Reusable InputField Component
function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} className="input" required />
    </div>
  )
}

// Reusable SelectField Component
function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select name={name} value={value} onChange={onChange} className="input" required>
        <option value="">Select a value</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

// Reusable ImageUpload Component
function ImageUpload({ label, file, setFile }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500">
              <span>Upload a file</span>
              <input type="file" accept="image/*" onChange={setFile} className="sr-only" required />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          {file && <p className="text-xs text-green-600 font-medium">Selected: {file.name}</p>}
        </div>
      </div>
    </div>
  )
}
