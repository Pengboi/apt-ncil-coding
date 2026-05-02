import Link from 'next/link';
import { Shirt, Camera, Sparkles, Package, Clock, Palette, Check, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From custom-printed merchandise to unforgettable event experiences, we offer premium services to make your vision a reality.
          </p>
        </div>

        {/* Main Service Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Custom Printing Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
              <Shirt className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Custom Printing Services</h2>
            <p className="text-gray-700 mb-6">
              Professional-grade printing on premium apparel and drinkware. Perfect for businesses, events, teams, and personal projects. We use state-of-the-art printing technology to ensure vibrant, long-lasting designs.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Custom T-Shirts</span>
                  <p className="text-sm text-gray-600">Classic tees, v-necks, and specialty styles</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Custom Hats</span>
                  <p className="text-sm text-gray-600">Caps, beanies, and trucker hats</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Custom Mugs</span>
                  <p className="text-sm text-gray-600">Ceramic and travel mugs in various sizes</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white rounded-lg">
                <Package className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Bulk Orders</p>
                <p className="text-xs text-gray-600">Discounts on 10+ items</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Fast Turnaround</p>
                <p className="text-xs text-gray-600">3-5 business days</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Palette className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Full Color</p>
                <p className="text-xs text-gray-600">Vibrant, lasting prints</p>
              </div>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* 360 Camera Booth Card */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 border border-amber-200">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-6">
              <Camera className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">360° Camera Booth</h2>
            <p className="text-gray-700 mb-6">
              Take your event to the next level with our state-of-the-art 360° camera booth. Guests step onto a platform while the camera rotates around them, creating stunning slow-motion videos perfect for sharing.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Perfect for Any Event</span>
                  <p className="text-sm text-gray-600">Weddings, corporate events, birthdays, proms</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Instant Sharing</span>
                  <p className="text-sm text-gray-600">Videos ready to text, email, or post immediately</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900">Props Included</span>
                  <p className="text-sm text-gray-600">Fun signs, hats, and accessories provided</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white rounded-lg">
                <Clock className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Flexible Hours</p>
                <p className="text-xs text-gray-600">2-6 hour packages</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Sparkles className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Premium Quality</p>
                <p className="text-xs text-gray-600">HD slow-motion video</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <Package className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Custom Branding</p>
                <p className="text-xs text-gray-600">Add your logo or theme</p>
              </div>
            </div>

            <Link
              href="/camera-booth"
              className="inline-flex items-center px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
            >
              View Packages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Izzy&apos;s Reflections?</h2>
            <p className="text-gray-600">Quality, service, and attention to detail in everything we do</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">We use only the best materials and equipment for lasting results</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600 text-sm">Quick production without compromising on quality</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Custom Designs</h3>
              <p className="text-gray-600 text-sm">Work with us to create exactly what you envision</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Full Service</h3>
              <p className="text-gray-600 text-sm">From design to delivery, we handle everything</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">
            Browse our products or inquire about our services today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/custom-order"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Custom Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
