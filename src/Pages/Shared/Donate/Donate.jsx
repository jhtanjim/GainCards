"use client"

import { useState } from "react"
import { donatePokemon } from "../../../api/pokemondata"
import { Upload, Info, Check, Heart, ImageIcon } from "lucide-react"
import Swal from "sweetalert2"
import DonationCompletionForm from "./DonationCompletionForm"

export default function Donate() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
  })

  const [frontImage, setFrontImage] = useState(null)
  const [backImage, setBackImage] = useState(null)
  const [frontImagePreview, setFrontImagePreview] = useState(null)
  const [backImagePreview, setBackImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showCompletionForm, setShowCompletionForm] = useState(false)
  const [donationData, setDonationData] = useState(null)

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
    setFormData({ ...formData, [name]: inputValue })
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

      const response = await donatePokemon(data)
      setDonationData(response)
      setShowCompletionForm(true)
    } catch (error) {
      console.error("Error donating Pokémon card:", error)
      Swal.fire({
        icon: "error",
        title: "Donation Failed",
        text: "Failed to donate Pokémon card. Please try again.",
        confirmButtonColor: "#f87171",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDonationComplete = async (completionData) => {
    try {
      const { addressData, apiResponse } = completionData

      //console.log("Address saved:", apiResponse)
      //console.log("Address data:", addressData)

      await Swal.fire({
        icon: "success",
        title: "Donation Complete!",
        html: `
          <div class="text-center">
            <div class="text-6xl mb-4">🎉</div>
            <p class="mb-2 text-lg font-semibold">Your Pokémon card donation is now complete!</p>
            <p class="text-gray-600 mb-2">Thank you for your generous contribution to our community.</p>
            <p class="text-sm text-gray-500">Your contact information has been saved securely.</p>
          </div>
        `,
        confirmButtonColor: "#22c55e",
        confirmButtonText: "Continue",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
      })

      resetForm()
    } catch (error) {
      console.error("Error completing donation:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
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
    })
    setFrontImage(null)
    setBackImage(null)
    setFrontImagePreview(null)
    setBackImagePreview(null)
    setShowCompletionForm(false)
    setDonationData(null)
  }

  if (showCompletionForm) {
    return <DonationCompletionForm onSubmit={handleDonationComplete} donationData={donationData} />
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Donate Pokémon Card</h2>
          <p className="text-gray-600 text-sm">Share your collection with the community</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <Section title="Basic Information" icon={<Info className="h-5 w-5 text-green-500" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Card Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Charizard Base Set Holo"
              required
            />

            <SelectField
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              options={Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)}
              placeholder="Select year"
              required
            />

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                required
                placeholder="Describe your Pokémon card's condition, rarity, and any special features. This helps others understand what makes your donation special!"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
            </div>
          </div>
        </Section>

        {/* Card Details Section */}
        <Section title="Card Details" icon={<Info className="h-5 w-5 text-green-500" />}>
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
              options={["Premium", "Limited", "Rare", "Common", "Uncommon", "Ultra Rare", "Secret Rare", "Promo"]}
              placeholder="Select label type"
            />

            <SelectField
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              options={["Pokemon", "Topps", "Panini", "Upper Deck", "Wizards of the Coast", "Other"]}
              placeholder="Select brand"
            />

            <SelectField
              label="Category"
              name="sport"
              value={formData.sport}
              onChange={handleInputChange}
              options={["TCG Cards", "Sports Cards", "Gaming Cards", "Collectible Cards"]}
              placeholder="Select category"
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
              options={[
                "Base Set",
                "Shadowless",
                "1st Edition",
                "Unlimited",
                "Promo",
                "Japanese",
                "Error Card",
                "Other",
              ]}
              placeholder="Select variety"
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
              placeholder="Select grade"
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

            <InputField
              label="Vendor ID (Optional)"
              name="vendorId"
              value={formData.vendorId}
              onChange={handleInputChange}
              placeholder="Internal vendor identifier"
              required={false}
            />

            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                name="hasReverseBarcode"
                checked={formData.hasReverseBarcode}
                onChange={handleInputChange}
                className="h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-green-500"
              />
              <div>
                <label className="text-sm font-medium text-gray-700">Has Reverse Barcode</label>
                <p className="text-xs text-gray-500">Check if your card has a barcode on the back</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Image Upload Section */}
        <Section title="Card Images" icon={<ImageIcon className="h-5 w-5 text-green-500" />}>
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-800">Photo Tips for Better Donations</h4>
                <ul className="text-xs text-blue-700 mt-1 space-y-1">
                  <li>• Use good lighting and avoid shadows</li>
                  <li>• Take photos straight-on to show the card clearly</li>
                  <li>• Images will be automatically compressed for optimal quality</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUpload
              label="Front Image"
              file={frontImage}
              preview={frontImagePreview}
              setFile={(e) => handleImageChange(e, "front")}
              required
            />
            <ImageUpload
              label="Back Image"
              file={backImage}
              preview={backImagePreview}
              setFile={(e) => handleImageChange(e, "back")}
              required
            />
          </div>
        </Section>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Donation...
              </>
            ) : (
              <>
                <Heart className="h-4 w-4" />
                Donate Card
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

function Section({ title, icon, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        {icon} {title}
      </h3>
      {children}
    </div>
  )
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  step,
  required = true,
  placeholder = "",
  ...props
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        step={step}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
        required={required}
        {...props}
      />
    </div>
  )
}

function SelectField({ label, name, value, onChange, options, placeholder = "Select an option", required = true }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
        required={required}
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

function ImageUpload({ label, file, preview, setFile, required = true }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200">
        <div className="space-y-2 text-center">
          {preview ? (
            <div className="space-y-2">
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="mx-auto h-32 w-32 object-cover rounded-lg border-2 border-green-200 shadow-sm"
              />
              <p className="text-xs text-green-600 font-medium flex items-center justify-center gap-1">
                <Check className="h-3 w-3" />
                {file?.name} (Compressed)
              </p>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 px-2 py-1">
                  <span>Upload a file</span>
                  <input type="file" accept="image/*" onChange={setFile} className="sr-only" required={required} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              <p className="text-xs text-green-500">Images will be automatically compressed</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
