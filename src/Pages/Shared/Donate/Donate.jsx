"use client"

import { useState } from "react"
import { donatePokemon } from "../../../api/pokemondata"
import { Upload, Info, Check } from "lucide-react"
import Swal from "sweetalert2"
import DonationCompletionForm from "./DonationCompletionForm"

export default function Donate() {
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
  const [showCompletionForm, setShowCompletionForm] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const inputValue = type === "checkbox" ? checked : type === "number" ? Number(value) : value
    setFormData({ ...formData, [name]: inputValue })
  }

  const handleImageChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      type === "front" ? setFrontImage(e.target.files[0]) : setBackImage(e.target.files[0])
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

      await donatePokemon(data)

      setShowCompletionForm(true)
    } catch (error) {
      console.error("Error donating Pokémon card:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to donate Pokémon card. Please try again.",
        confirmButtonColor: "#f87171",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDonationComplete = async (donorData) => {
    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your donation was successful!",
      confirmButtonColor: "#22c55e",
    })

    // Reset everything
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
    setShowCompletionForm(false)
  }

  if (showCompletionForm) {
    return <DonationCompletionForm onSubmit={handleDonationComplete} />
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center">
          <Upload className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Donate Pokémon Card</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <Section title="Basic Information" icon={<Info className="h-5 w-5 text-yellow-500" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Title" name="title" value={formData.title} onChange={handleInputChange} />
            <InputField label="Year" name="year" type="number" value={formData.year} onChange={handleInputChange} />
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="input" required />
            </div>
            <InputField label="Price ($)" name="price" type="number" value={formData.price} onChange={handleInputChange} />
          </div>
        </Section>

        {/* Card Details Section */}
        <Section title="Card Details" icon={<Info className="h-5 w-5 text-yellow-500" />}>
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
              <input type="checkbox" name="hasReverseBarcode" checked={formData.hasReverseBarcode} onChange={handleInputChange} className="h-5 w-5 text-yellow-500 border-gray-300 rounded" />
              <label className="ml-2 text-sm text-gray-700">Has Reverse Barcode</label>
            </div>
          </div>
        </Section>

        {/* Image Upload Section */}
        <Section title="Card Images" icon={<Info className="h-5 w-5 text-yellow-500" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUpload label="Front Image" file={frontImage} setFile={(e) => handleImageChange(e, "front")} />
            <ImageUpload label="Back Image" file={backImage} setFile={(e) => handleImageChange(e, "back")} />
          </div>
        </Section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Donate Card"}
          </button>
        </div>
      </form>
    </div>
  )
}

function Section({ title, icon, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        {icon} {title}
      </h3>
      {children}
    </div>
  )
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} className="input" required />
    </div>
  )
}

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

function ImageUpload({ label, file, setFile }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <label className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500">
            <span>Upload a file</span>
            <input type="file" accept="image/*" onChange={setFile} className="sr-only" required />
          </label>
          {file && <p className="text-xs text-green-600 font-medium">Selected: {file.name}</p>}
        </div>
      </div>
    </div>
  )
}
