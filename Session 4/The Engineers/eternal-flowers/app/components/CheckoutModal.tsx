'use client';

import { useState } from 'react';
import { Product } from '../data/products';
import ProductImage from './ProductImage';

interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  ribbonText?: string;
  glitter?: boolean;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onBackToCart: () => void;
  onOrderComplete?: () => void;
}

interface FormData {
  // Customer Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Shipping Address
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingPostcode: string;
  shippingCountry: string;
  
  // Billing Address
  sameAsShipping: boolean;
  billingAddress1: string;
  billingAddress2: string;
  billingCity: string;
  billingPostcode: string;
  billingCountry: string;
  
  // Additional
  deliveryNotes: string;
  giftMessage: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  shippingAddress1: '',
  shippingAddress2: '',
  shippingCity: '',
  shippingPostcode: '',
  shippingCountry: 'UK',
  sameAsShipping: true,
  billingAddress1: '',
  billingAddress2: '',
  billingCity: '',
  billingPostcode: '',
  billingCountry: 'UK',
  deliveryNotes: '',
  giftMessage: '',
};

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  onBackToCart,
  onOrderComplete 
}: CheckoutModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price + (item.glitter ? 5 : 0)) * item.quantity, 0);
  const shippingCost = total >= 50 ? 0 : 4.99;
  const finalTotal = total + shippingCost;

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => { const newErrors = { ...prev }; delete newErrors[field]; return newErrors; });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[\d\s+\-()]{10,20}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    if (step === 2) {
      if (!formData.shippingAddress1.trim()) newErrors.shippingAddress1 = 'Street address is required';
      if (!formData.shippingCity.trim()) newErrors.shippingCity = 'City is required';
      if (!formData.shippingPostcode.trim()) {
        newErrors.shippingPostcode = 'Postcode is required';
      } else if (!/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(formData.shippingPostcode.replace(/\s/g, ''))) {
        newErrors.shippingPostcode = 'Please enter a valid UK postcode';
      }

      if (!formData.sameAsShipping) {
        if (!formData.billingAddress1.trim()) newErrors.billingAddress1 = 'Billing street address is required';
        if (!formData.billingCity.trim()) newErrors.billingCity = 'Billing city is required';
        if (!formData.billingPostcode.trim()) {
          newErrors.billingPostcode = 'Billing postcode is required';
        } else if (!/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(formData.billingPostcode.replace(/\s/g, ''))) {
          newErrors.billingPostcode = 'Please enter a valid UK postcode';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    onOrderComplete?.();
    setCurrentStep(4); // Success step
  };

  const handleClose = () => {
    onClose();
    // Reset after a delay so the close animation completes
    setTimeout(() => {
      setCurrentStep(1);
      setFormData(initialFormData);
      setErrors({});
    }, 300);
  };

  const steps = [
    { number: 1, title: 'Customer Info' },
    { number: 2, title: 'Address' },
    { number: 3, title: 'Review & Pay' },
  ];

  if (cartItems.length === 0 && isOpen) {
    return (
      <>
        <div 
          className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={handleClose}
        />
        <div className={`checkout-sidebar fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-50 shadow-2xl flex flex-col ${isOpen ? 'open' : ''}`}>
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="font-display text-2xl font-bold">Checkout</h2>
            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <span className="text-6xl mb-4">🛒</span>
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <button onClick={handleClose} className="btn-primary">
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />
      
      {/* Sidebar */}
      <div className={`checkout-sidebar fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-50 shadow-2xl flex flex-col ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="font-display text-2xl font-bold">Checkout</h2>
            {currentStep < 4 && (
              <p className="text-sm text-gray-500 mt-1">
                Step {currentStep} of 3: {steps[currentStep - 1]?.title}
              </p>
            )}
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        {currentStep < 4 && (
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step.number 
                      ? 'bg-gradient-to-r from-emerald-600 to-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded ${
                      currentStep > step.number ? 'bg-emerald-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Customer Information */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="font-display text-xl font-semibold mb-4">Customer Information</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`input-field ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`input-field ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`input-field ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  placeholder="+44 123 456 7890"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                <p className="text-xs text-gray-500 mt-1">We'll only use this to contact you about your order</p>
              </div>
            </div>
          )}

          {/* Step 2: Shipping Address */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="font-display text-xl font-semibold mb-4">Shipping Address</h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.shippingAddress1}
                  onChange={(e) => handleInputChange('shippingAddress1', e.target.value)}
                  className={`input-field ${errors.shippingAddress1 ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                  placeholder="123 Main Street"
                />
                {errors.shippingAddress1 && <p className="text-red-500 text-sm mt-1">{errors.shippingAddress1}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Apartment, Suite, etc. (Optional)
                </label>
                <input 
                  type="text" 
                  value={formData.shippingAddress2}
                  onChange={(e) => handleInputChange('shippingAddress2', e.target.value)}
                  className="input-field"
                  placeholder="Apt 4B, Floor 2, etc."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.shippingCity}
                    onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                    className={`input-field ${errors.shippingCity ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="London"
                  />
                  {errors.shippingCity && <p className="text-red-500 text-sm mt-1">{errors.shippingCity}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Postcode <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.shippingPostcode}
                    onChange={(e) => handleInputChange('shippingPostcode', e.target.value.toUpperCase())}
                    className={`input-field ${errors.shippingPostcode ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="SW1A 1AA"
                  />
                  {errors.shippingPostcode && <p className="text-red-500 text-sm mt-1">{errors.shippingPostcode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country/Region</label>
                <select 
                  value={formData.shippingCountry}
                  onChange={(e) => handleInputChange('shippingCountry', e.target.value)}
                  className="input-field"
                >
                  <option value="UK">United Kingdom</option>
                  <option value="IE">Ireland</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                  <option value="ES">Spain</option>
                  <option value="IT">Italy</option>
                  <option value="NL">Netherlands</option>
                  <option value="BE">Belgium</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Notes (Optional)
                </label>
                <textarea 
                  rows={3}
                  value={formData.deliveryNotes}
                  onChange={(e) => handleInputChange('deliveryNotes', e.target.value)}
                  className="input-field"
                  placeholder="Leave at front door, ring bell, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gift Message (Optional)
                </label>
                <textarea 
                  rows={3}
                  value={formData.giftMessage}
                  onChange={(e) => handleInputChange('giftMessage', e.target.value)}
                  className="input-field"
                  placeholder="Add a personal message for the recipient..."
                />
                <p className="text-xs text-gray-500 mt-1">This will be printed on a card and included with your order</p>
              </div>

              {/* Billing Address Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="font-display text-xl font-semibold mb-4">Billing Address</h3>
                
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                  <input 
                    type="checkbox"
                    checked={formData.sameAsShipping}
                    onChange={(e) => handleInputChange('sameAsShipping', e.target.checked)}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="font-medium text-gray-700">Same as shipping address</span>
                </label>

                {!formData.sameAsShipping && (
                  <div className="mt-4 space-y-4 animate-fade-in-up">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Billing Street Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={formData.billingAddress1}
                        onChange={(e) => handleInputChange('billingAddress1', e.target.value)}
                        className={`input-field ${errors.billingAddress1 ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                        placeholder="123 Main Street"
                      />
                      {errors.billingAddress1 && <p className="text-red-500 text-sm mt-1">{errors.billingAddress1}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Apartment, Suite, etc. (Optional)
                      </label>
                      <input 
                        type="text" 
                        value={formData.billingAddress2}
                        onChange={(e) => handleInputChange('billingAddress2', e.target.value)}
                        className="input-field"
                        placeholder="Apt 4B, Floor 2, etc."
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Billing City <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={formData.billingCity}
                          onChange={(e) => handleInputChange('billingCity', e.target.value)}
                          className={`input-field ${errors.billingCity ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                          placeholder="London"
                        />
                        {errors.billingCity && <p className="text-red-500 text-sm mt-1">{errors.billingCity}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Billing Postcode <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={formData.billingPostcode}
                          onChange={(e) => handleInputChange('billingPostcode', e.target.value.toUpperCase())}
                          className={`input-field ${errors.billingPostcode ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
                          placeholder="SW1A 1AA"
                        />
                        {errors.billingPostcode && <p className="text-red-500 text-sm mt-1">{errors.billingPostcode}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Billing Country/Region</label>
                      <select 
                        value={formData.billingCountry}
                        onChange={(e) => handleInputChange('billingCountry', e.target.value)}
                        className="input-field"
                      >
                        <option value="UK">United Kingdom</option>
                        <option value="IE">Ireland</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                        <option value="ES">Spain</option>
                        <option value="IT">Italy</option>
                        <option value="NL">Netherlands</option>
                        <option value="BE">Belgium</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Review & Payment Placeholder */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="font-display text-xl font-semibold mb-4">Order Summary</h3>
              
              {/* Hero Image with Products */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg mb-4">
                <ProductImage 
                  src="/images/home-page-image.JPG" 
                  alt="Girl holding beautiful pink eternal flower bouquet"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm font-medium">Your Beautiful Selection</p>
                  <p className="text-xs opacity-80">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
                </div>
              </div>
              
              {/* Items */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.selectedColor || 'default'}-${item.ribbonText || 'no-ribbon'}-${index}`} className="flex gap-3 bg-gray-50 p-3 rounded-xl">
                    <ProductImage 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h4>
                      {item.selectedColor && (
                        <p className="text-xs text-gray-500 capitalize">
                          Color: {item.selectedColor.replace('-', ' ')}
                        </p>
                      )}
                      {item.ribbonText && (
                        <p className="text-xs text-emerald-600 truncate">
                          Ribbon: "{item.ribbonText}"
                        </p>
                      )}
                      {item.glitter && (
                        <p className="text-xs text-purple-600 truncate">
                          ✨ Glitter Finish (+£5)
                        </p>
                      )}
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">£{((item.price + (item.glitter ? 5 : 0)) * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Summary */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">Delivering To:</h4>
                <p className="text-sm text-gray-700">
                  {formData.firstName} {formData.lastName}<br />
                  {formData.shippingAddress1}<br />
                  {formData.shippingAddress2 && <>{formData.shippingAddress2}<br /></>}
                  {formData.shippingCity}, {formData.shippingPostcode}<br />
                  {formData.shippingCountry === 'UK' ? 'United Kingdom' : formData.shippingCountry}
                </p>
                {formData.giftMessage && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-emerald-600 font-medium">Gift message included</p>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `£${shippingCost.toFixed(2)}`}</span>
                </div>
                {shippingCost === 0 && (
                  <p className="text-xs text-emerald-600 mb-2">You qualify for free shipping!</p>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-emerald-600">£{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Placeholder */}
              <div className="bg-gradient-to-r from-emerald-50 to-purple-50 p-6 rounded-xl border-2 border-dashed border-emerald-300">
                <div className="text-center">
                  <span className="text-4xl mb-3 block">💳</span>
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Integration Coming Soon</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    This is a demo checkout. In production, this would connect to Stripe or PayPal.
                  </p>
                  <div className="flex justify-center gap-2 text-2xl">
                    <span>💳</span>
                    <span>📱</span>
                    <span>🍎</span>
                    <span>🅿️</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in-up">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Order Placed!</h3>
              <p className="text-gray-600 mb-6 max-w-sm">
                Thank you for your order, {formData.firstName}! We've sent a confirmation email to {formData.email}.
              </p>
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <p className="text-sm text-gray-500 mb-1">Order Total</p>
                <p className="text-2xl font-bold text-emerald-600">£{finalTotal.toFixed(2)}</p>
              </div>
              <button onClick={handleClose} className="btn-primary">
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {currentStep < 4 && (
          <div className="border-t p-6 space-y-3">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <button 
                  onClick={handleBack}
                  className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  ← Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button 
                  onClick={handleNext}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-600 via-purple-600 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-all"
                >
                  Continue →
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-600 via-purple-600 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>💳</span> Place Order
                    </>
                  )}
                </button>
              )}
            </div>
            
            {currentStep === 1 && (
              <button 
                onClick={onBackToCart}
                className="w-full py-3 text-emerald-600 font-semibold hover:underline"
              >
                ← Back to Cart
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
