import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const VendorSignup = () => {
  const { vendorSignUp } = useAuth()
  const [countries, setCountries] = useState([])
  
  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      const sortedCountries = data
        .map(country => country.name.common)
        .sort((a, b) => a.localeCompare(b));
      setCountries(sortedCountries);
    };
  
    fetchCountries();
  }, []);
  
  // Set up state for form data and UI states
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    storeName: '',
    businessType: 'retail', // Default business type
    businessAddress: '',
    phoneNumber: '',
    taxId: '',
    website: '',
    description: '',
    country: 'Pallet Town'
  })
  
  const [files, setFiles] = useState({
    profilePicture: null,
    businessLogo: null,
    businessDocument: null
  })
  
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target
    if (uploadedFiles[0]) {
      setFiles(prev => ({
        ...prev,
        [name]: uploadedFiles[0]
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (!formData.storeName.trim()) {
      setError('Store name is required')
      return
    }

    if (!formData.businessAddress.trim()) {
      setError('Business address is required')
      return
    }

    if (!formData.phoneNumber.trim()) {
      setError('Phone number is required')
      return
    }

    // Set loading state
    setIsLoading(true)

    // Create FormData object for API request
    const submitData = new FormData()
    
    // Add all form fields
    Object.keys(formData).forEach(key => {
      if (key !== 'confirmPassword') { // Don't send confirmPassword to API
        submitData.append(key, formData[key])
      }
    })
    
    // Add files
    Object.keys(files).forEach(key => {
      if (files[key]) {
        submitData.append(key, files[key])
      }
    })

    // Make API call with error handling
    try {
      const response = await vendorSignUp(submitData)
      console.log('Vendor registration success:', response)
      
      // Navigate to vendor dashboard or approval waiting page
      navigate('/vendor/pending-approval')
    } catch (err) {
      console.error('Vendor registration error:', err)
      setError(
        err.response?.data?.message || 
        'An error occurred during registration. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Become a GainCards Vendor</h1>
          <p className="mt-2 text-gray-600">Join our marketplace and start selling your Pokémon card collection!</p>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Account Information Section */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          {/* Business Information Section */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                  Store Name
                </label>
                <input
                  id="storeName"
                  name="storeName"
                  type="text"
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={formData.storeName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
                  Business Type
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={formData.businessType}
                  onChange={handleChange}
                >
                  <option value="retail">Retail Store</option>
                  <option value="online">Online Only</option>
                  <option value="individual">Individual Seller</option>
                  <option value="distributor">Distributor</option>
                </select>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Business Phone
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700">
                  Business Address
                </label>
                <input
                  id="businessAddress"
                  name="businessAddress"
                  type="text"
                  required
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={formData.businessAddress}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                  Tax ID / Business Registration Number
                </label>
                <input
                  id="taxId"
                  name="taxId"
                  type="text"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={formData.taxId}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Website (Optional)
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="businessLogo" className="block text-sm font-medium text-gray-700">
                  Business Logo
                </label>
                <input
                  id="businessLogo"
                  name="businessLogo"
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  onChange={handleFileChange}
                />
              </div>

              <div>
                <label htmlFor="businessDocument" className="block text-sm font-medium text-gray-700">
                  Business Registration Document (PDF)
                </label>
                <input
                  id="businessDocument"
                  name="businessDocument"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  onChange={handleFileChange}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Business Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your business and what kind of Pokémon cards you specialize in..."
                />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label htmlFor="terms" className="block ml-2 text-sm text-gray-900">
              I agree to the{' '}
              <Link to="/terms-vendors" className="font-medium text-yellow-600 hover:text-yellow-500">
                Vendor Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link to="/seller-policy" className="font-medium text-yellow-600 hover:text-yellow-500">
                Seller Policy
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
            >
              {isLoading ? 'Submitting Application...' : 'Apply to Become a Vendor'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have a vendor account?{' '}
            <Link to="/signin" className="font-medium text-yellow-600 hover:text-yellow-500">
              Sign in
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Looking to register as a collector?{' '}
            <Link to="/signup" className="font-medium text-yellow-600 hover:text-yellow-500">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default VendorSignup