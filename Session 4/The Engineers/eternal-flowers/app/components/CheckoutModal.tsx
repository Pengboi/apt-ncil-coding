'use client';

import { useState } from 'react';
import { CartItem } from '../types';
import ProductImage from './ProductImage';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onBackToCart: () => void;
  onOrderComplete?: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingPostcode: string;
  shippingCountry: string;
  sameAsShipping: boolean;
  billingAddress1: string;
  billingAddress2: string;
  billingCity: string;
  billingPostcode: string;
  billingCountry: string;
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onOrderComplete?.();
    setCurrentStep(4);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep(1);
      setFormData(initialFormData);
      setErrors({});
    }, 300);
  };

  const steps = [
    { number: 1, title: 'Details' },
    { number: 2, title: 'Delivery' },
    { number: 3, title: 'Review' },
  ];

  if (cartItems.length === 0 && isOpen) {
    return (
      <>
        <div 
          className={`fixed inset-0 bg-[var(--charcoal)]/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={handleClose}
        />
        <div className={`checkout-sidebar fixed top-0 right-0 h-full w-full max-w-2xl bg-[var(--cream)] z-50 shadow-2xl flex flex-col ${isOpen ? 'open' : ''}`}>
          <div className="flex items-center justify-between p-6 border-b border-[var(--linen)]">
            <h2 className="font-display text-2xl font-medium text-[var(--charcoal)]">Checkout</h2>
            <button onClick={handleClose} className="p-2 hover:bg-[var(--linen)] rounded-full transition-colors">
              <svg className="w-5 h-5 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <svg className="w-12 h-12 text-[var(--taupe)] opacity-30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p className="text-xl text-[var(--taupe)] font-display italic mb-4">Your cart is empty</p>
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
        className={`fixed inset-0 bg-[var(--charcoal)]/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />
      
      {/* Sidebar */}
      <div className={`checkout-sidebar fixed top-0 right-0 h-full w-full max-w-2xl bg-[var(--cream)] z-50 shadow-2xl flex flex-col ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--linen)]">
          <div>
            <h2 className="font-display text-2xl font-medium text-[var(--charcoal)]">Checkout</h2>
            {currentStep < 4 && (
              <p className="text-xs text-[var(--taupe)] mt-1 uppercase tracking-widest">
                Step {currentStep} of 3: {steps[currentStep - 1]?.title}
              </p>
            )}
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-[var(--linen)] rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <svg className="w-5 h-5 text-[var(--charcoal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        {currentStep < 4 && (
          <div className="px-6 py-5 bg-[var(--linen)]/50">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-all duration-300 ${
                    currentStep >= step.number 
                      ? 'bg-[var(--burgundy)] border-[var(--burgundy)] text-[var(--cream)]' 
                      : 'bg-transparent border-[var(--taupe)]/30 text-[var(--taupe)]'
                  }`}>
                    {currentStep > step.number ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : step.number}
                  </div>
                  <span className={`ml-2 text-xs font-medium uppercase tracking-wider hidden sm:block ${
                    currentStep >= step.number ? 'text-[var(--charcoal)]' : 'text-[var(--taupe)]'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-[2px] mx-3 rounded ${
                      currentStep > step.number ? 'bg-[var(--burgundy)]' : 'bg-[var(--taupe)]/20'
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
              <h3 className="font-display text-xl font-medium text-[var(--charcoal)] mb-6">Your Details</h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                    First Name <span className="text-[var(--burgundy)]">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`input-field ${errors.firstName ? 'error' : ''}`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <p className="text-xs text-[var(--burgundy)] mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                    Last Name <span className="text-[var(--burgundy)]">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`input-field ${errors.lastName ? 'error' : ''}`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <p className="text-xs text-[var(--burgundy)] mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                  Email Address <span className="text-[var(--burgundy)]">*</span>
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`input-field ${errors.email ? 'error' : ''}`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-xs text-[var(--burgundy)] mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                  Phone Number <span className="text-[var(--burgundy)]">*</span>
                </label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`input-field ${errors.phone ? 'error' : ''}`}
                  placeholder="+44 123 456 7890"
                />
                {errors.phone && <p className="text-xs text-[var(--burgundy)] mt-1">{errors.phone}</p>}
                <p className="text-[10px] text-[var(--taupe)] mt-1">We&apos;ll only use this to contact you about your order</p>
              </div>
            </div>
          )}

          {/* Step 2: Shipping Address */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="font-display text-xl font-medium text-[var(--charcoal)] mb-6">Delivery Address</h3>
              
              <div>
                <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                  Street Address <span className="text-[var(--burgundy)]">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.shippingAddress1}
                  onChange={(e) => handleInputChange('shippingAddress1', e.target.value)}
                  className={`input-field ${errors.shippingAddress1 ? 'error' : ''}`}
                  placeholder="123 Main Street"
                />
                {errors.shippingAddress1 && <p className="text-xs text-[var(--burgundy)] mt-1">{errors.shippingAddress1}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
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

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                    City <span className="text-[var(--burgundy)]">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.shippingCity}
                    onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                    className={`input-field ${errors.shippingCity ? 'error' : ''}`}
                    placeholder="London"
                  />
                  {errors.shippingCity && <p className="text-xs text-[var(--burgundy)] mt-1">{errors.shippingCity}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                    Postcode <span className="text-[var(--burgundy)]">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.shippingPostcode}
                    onChange={(e) => handleInputChange('shippingPostcode', e.target.value.toUpperCase())}
                    className={`input-field ${errors.shippingPostcode ? 'error' : ''}`}
                    placeholder="SW1A 1AA"
                  />
                  {errors.shippingPostcode && <p className="text-xs text-[var(--burgundy)] mt-1">{errors.shippingPostcode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">Country/Region</label>
                <select 
                  value={formData.shippingCountry}
                  onChange={(e) => handleInputChange('shippingCountry', e.target.value)}
                  className="select-field"
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
                <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
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
                <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                  Gift Message (Optional)
                </label>
                <textarea 
                  rows={3}
                  value={formData.giftMessage}
                  onChange={(e) => handleInputChange('giftMessage', e.target.value)}
                  className="input-field"
                  placeholder="Add a personal message for the recipient..."
                />
                <p className="text-[10px] text-[var(--taupe)] mt-1">This will be printed on a card and included with your order</p>
              </div>

              {/* Billing Address Section */}
              <div className="border-t border-[var(--linen)] pt-6 mt-6">
                <h3 className="font-display text-xl font-medium text-[var(--charcoal)] mb-6">Billing Address</h3>
                
                <label className="flex items-center gap-3 p-4 bg-[var(--linen)]/50 rounded-lg cursor-pointer hover:bg-[var(--linen)] transition-colors">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.sameAsShipping ? 'bg-[var(--burgundy)] border-[var(--burgundy)]' : 'border-[var(--taupe)]'}`}>
                    {formData.sameAsShipping && (
                      <svg className="w-3 h-3 text-[var(--cream)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </div>
                  <input 
                    type="checkbox"
                    checked={formData.sameAsShipping}
                    onChange={(e) => handleInputChange('sameAsShipping', e.target.checked)}
                    className="hidden"
                  />
                  <span className="text-sm font-medium text-[var(--charcoal)]">Same as delivery address</span>
                </label>

                {!formData.sameAsShipping && (
                  <div className="mt-6 space-y-6 animate-fade-in-up">
                    <div>
                      <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                        Billing Street Address <span className="text-[var(--burgundy)]">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={formData.billingAddress1}
                        onChange={(e) => handleInputChange('billingAddress1', e.target.value)}
                        className={`input-field ${errors.billingAddress1 ? 'error' : ''}`}
                        placeholder="123 Main Street"
                      />
                      {errors.billingAddress1 && <p className="text-xs text-[var(--burgundy)] mt-1">{errors.billingAddress1}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
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

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                          Billing City <span className="text-[var(--burgundy)]">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={formData.billingCity}
                          onChange={(e) => handleInputChange('billingCity', e.target.value)}
                          className={`input-field ${errors.billingCity ? 'error' : ''}`}
                          placeholder="London"
                        />
                        {errors.billingCity && <p className="text-xs text-[var(--burgundy)] mt-1">{errors.billingCity}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                          Billing Postcode <span className="text-[var(--burgundy)]">*</span>
                        </label>
                        <input 
                          type="text" 
                          value={formData.billingPostcode}
                          onChange={(e) => handleInputChange('billingPostcode', e.target.value.toUpperCase())}
                          className={`input-field ${errors.billingPostcode ? 'error' : ''}`}
                          placeholder="SW1A 1AA"
                        />
                        {errors.billingPostcode && <p className="text-xs text-[var(--burgundy)] mt-1">{errors.billingPostcode}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">Billing Country/Region</label>
                      <select 
                        value={formData.billingCountry}
                        onChange={(e) => handleInputChange('billingCountry', e.target.value)}
                        className="select-field"
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

          {/* Step 3: Review & Payment */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="font-display text-xl font-medium text-[var(--charcoal)] mb-4">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.selectedColor || 'default'}-${item.ribbonText || 'no-ribbon'}-${index}`} className="flex gap-3 bg-white p-3 rounded-lg border border-[var(--linen)]">
                    <ProductImage 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-medium text-[var(--charcoal)] text-sm truncate">{item.name}</h4>
                      {item.selectedColor && (
                        <p className="text-[10px] text-[var(--taupe)] capitalize">
                          Colour: {item.selectedColor.replace('-', ' ')}
                        </p>
                      )}
                      {item.ribbonText && (
                        <p className="text-[10px] text-[var(--burgundy)] truncate font-italic-display">
                          Ribbon: &ldquo;{item.ribbonText}&rdquo;
                        </p>
                      )}
                      {item.glitter && (
                        <p className="text-[10px] text-[var(--champagne)] truncate">
                          Glitter Finish (+£5)
                        </p>
                      )}
                      <p className="text-xs text-[var(--taupe)]">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[var(--charcoal)] text-sm">£{((item.price + (item.glitter ? 5 : 0)) * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Summary */}
              <div className="bg-[var(--linen)]/50 p-4 rounded-lg">
                <h4 className="text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-3">Delivering To</h4>
                <p className="text-sm text-[var(--taupe)]">
                  {formData.firstName} {formData.lastName}<br />
                  {formData.shippingAddress1}<br />
                  {formData.shippingAddress2 && <>{formData.shippingAddress2}<br /></>}
                  {formData.shippingCity}, {formData.shippingPostcode}<br />
                  {formData.shippingCountry === 'UK' ? 'United Kingdom' : formData.shippingCountry}
                </p>
                {formData.giftMessage && (
                  <div className="mt-3 pt-3 border-t border-[var(--linen)]">
                    <p className="text-[10px] text-[var(--burgundy)] font-medium uppercase tracking-wider">Gift message included</p>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="border-t border-[var(--linen)] pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--taupe)]">Subtotal</span>
                  <span className="text-[var(--charcoal)]">£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--taupe)]">Shipping</span>
                  <span className="text-[var(--charcoal)]">{shippingCost === 0 ? 'FREE' : `£${shippingCost.toFixed(2)}`}</span>
                </div>
                {shippingCost === 0 && (
                  <p className="text-[10px] text-[var(--burgundy)] mb-2">You qualify for free shipping!</p>
                )}
                <div className="flex justify-between text-lg font-medium border-t border-[var(--linen)] pt-2">
                  <span className="font-display text-[var(--charcoal)]">Total</span>
                  <span className="font-display text-[var(--burgundy)]">£{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white p-6 rounded-lg border border-[var(--linen)]">
                <div className="flex items-center justify-between mb-5">
                  <h4 className="font-display text-lg font-medium text-[var(--charcoal)]">Payment Details</h4>
                  <div className="flex gap-2">
                    <div className="w-10 h-6 bg-[var(--charcoal)] rounded flex items-center justify-center">
                      <div className="w-6 h-4 border border-[var(--cream)]/40 rounded-sm" />
                    </div>
                    <div className="w-10 h-6 bg-[var(--burgundy)] rounded flex items-center justify-center">
                      <div className="w-5 h-3 rounded-full border border-[var(--cream)]/60" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="input-field pr-12"
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                          const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
                          e.target.value = formatted;
                        }}
                      />
                      <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-4 text-[var(--taupe)]" fill="none" stroke="currentColor" viewBox="0 0 24 16" strokeWidth={1.5}>
                        <rect x="1" y="1" width="22" height="14" rx="2" />
                        <line x1="1" y1="6" x2="23" y2="6" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                        Expiry Date
                      </label>
                      <input 
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        className="input-field"
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                          if (val.length >= 3) {
                            e.target.value = val.slice(0, 2) + '/' + val.slice(2);
                          } else {
                            e.target.value = val;
                          }
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                        CVC
                      </label>
                      <input 
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        className="input-field"
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-medium text-[var(--charcoal)] uppercase tracking-[0.2em] mb-2">
                      Name on Card
                    </label>
                    <input 
                      type="text"
                      placeholder="As it appears on your card"
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div className="mt-5 pt-4 border-t border-[var(--linen)] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--champagne)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <p className="text-[10px] text-[var(--taupe)]">
                    Your payment details are encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in-up py-12">
              <div className="w-16 h-16 bg-[var(--burgundy)] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[var(--cream)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="font-display text-3xl font-medium text-[var(--charcoal)] mb-3">Order Placed</h3>
              <p className="text-[var(--taupe)] mb-8 max-w-sm leading-relaxed">
                Thank you for your order, {formData.firstName}. We&apos;ve sent a confirmation to {formData.email}.
              </p>
              <div className="bg-[var(--linen)] px-8 py-4 rounded-lg mb-8">
                <p className="text-[10px] text-[var(--taupe)] uppercase tracking-widest mb-1">Order Total</p>
                <p className="font-display text-3xl font-medium text-[var(--burgundy)]">£{finalTotal.toFixed(2)}</p>
              </div>
              <button onClick={handleClose} className="btn-primary">
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {currentStep < 4 && (
          <div className="border-t border-[var(--linen)] p-6 space-y-3">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <button 
                  onClick={handleBack}
                  className="flex-1 py-3 px-6 border border-[var(--taupe)]/30 text-[var(--charcoal)] text-xs font-medium uppercase tracking-widest rounded-full hover:bg-[var(--linen)] transition-colors"
                  disabled={isSubmitting}
                >
                  Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button 
                  onClick={handleNext}
                  className="flex-1 py-3 px-6 bg-[var(--burgundy)] text-[var(--cream)] text-xs font-medium uppercase tracking-widest rounded-full hover:bg-[var(--burgundy-light)] transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-6 bg-[var(--burgundy)] text-[var(--cream)] text-xs font-medium uppercase tracking-widest rounded-full hover:bg-[var(--burgundy-light)] transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[var(--cream)]/30 border-t-[var(--cream)] rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              )}
            </div>
            
            {currentStep === 1 && (
              <button 
                onClick={onBackToCart}
                className="w-full py-3 text-[var(--burgundy)] text-xs font-medium uppercase tracking-widest hover:text-[var(--burgundy-light)] transition-colors text-center"
              >
                Back to Cart
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
