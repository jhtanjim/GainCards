import React, { useState } from 'react';
import { User, MapPin, MessageSquare, CreditCard, Heart, Package } from 'lucide-react';

const DonateCardReceiver = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // User Information
    username: '',
    email: '',
    phone: '',
    
    // Address Information
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    
    // Request Details
    reason: '',
    preferredCards: '',
    urgency: 'normal'
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setCurrentStep(4); // Go to success step
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    alert('Payment successful! Your request has been submitted.');
    
    // Reset form
    setFormData({
      username: '',
      email: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      reason: '',
      preferredCards: '',
      urgency: 'normal'
    });
    setCurrentStep(1);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {step}
          </div>
          {step < 3 && (
            <div className={`w-12 h-1 mx-2 ${
              currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
            }`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Step 1: User Information
  const UserInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h3>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          icon={<User className="h-4 w-4" />}
          required
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleNextStep}
          disabled={!formData.username || !formData.email || !formData.phone}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next: Address Details
        </button>
      </div>
    </div>
  );

  // Step 2: Address Information
  const AddressStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Shipping Address</h3>
        <p className="text-gray-600">Where should we send your card?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <InputField
            label="Address Line 1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
            icon={<MapPin className="h-4 w-4" />}
            required
          />
        </div>
        <div className="md:col-span-2">
          <InputField
            label="Address Line 2 (Optional)"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
          />
        </div>
        <InputField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="State/Province"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={handlePrevStep}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Previous
        </button>
        <button
          onClick={handleNextStep}
          disabled={!formData.addressLine1 || !formData.city || !formData.state || !formData.country || !formData.postalCode}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next: Request Details
        </button>
      </div>
    </div>
  );

  // Step 3: Request Details & Checkout
  const RequestDetailsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Request Details</h3>
        <p className="text-gray-600">Tell us why you need this card</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Why do you need this card? *
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Please explain your situation and why you would benefit from receiving a donated card..."
            required
          />
        </div>
        
        <InputField
          label="Preferred Card Types (Optional)"
          name="preferredCards"
          value={formData.preferredCards}
          onChange={handleInputChange}
          placeholder="e.g., Pokémon, Yu-Gi-Oh, Magic: The Gathering"
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Request Urgency</label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="normal">Normal (2-3 weeks)</option>
            <option value="urgent">Urgent (1 week)</option>
            <option value="emergency">Emergency (3-5 days)</option>
          </select>
        </div>
        
        {/* Checkout Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Shipping & Processing
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Processing Fee:</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Cost:</span>
              <span>{formData.urgency === 'emergency' ? '$15.00' : formData.urgency === 'urgent' ? '$10.00' : '$5.00'}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${formData.urgency === 'emergency' ? '20.00' : formData.urgency === 'urgent' ? '15.00' : '10.00'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={handlePrevStep}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Previous
        </button>
        <button
          onClick={handlePayment}
          disabled={!formData.reason || loading}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          <CreditCard className="h-4 w-4" />
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  );

  // Success Step
  const SuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
        <Heart className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800">Request Submitted Successfully!</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Thank you for your request. We'll review your application and match you with available donated cards. 
        You'll receive an email confirmation shortly.
      </p>
      <button
        onClick={() => setCurrentStep(1)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
      >
        Submit Another Request
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
          <Heart className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Request Donated Card</h2>
      </div>

      {currentStep < 4 && <StepIndicator />}

      <div className="bg-white p-8 rounded-xl shadow-sm">
        {currentStep === 1 && <UserInfoStep />}
        {currentStep === 2 && <AddressStep />}
        {currentStep === 3 && <RequestDetailsStep />}
        {currentStep === 4 && <SuccessStep />}
      </div>
    </div>
  );
};

function InputField({ label, name, value, onChange, type = "text", icon, placeholder, required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            icon ? 'pl-10' : ''
          }`}
        />
      </div>
    </div>
  );
}

export default DonateCardReceiver;