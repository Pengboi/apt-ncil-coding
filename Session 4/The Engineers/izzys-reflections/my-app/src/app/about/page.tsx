import { Heart, Target, Users, Award, Sparkles, Shirt, Camera } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-6">About Izzy&apos;s Reflections</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We&apos;re more than just a printing company. We&apos;re memory makers, brand builders, and experience creators. 
            Founded with a passion for quality and creativity, we help individuals and businesses bring their visions to life.
          </p>
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="bg-gradient-to-br from-black-secondary to-black-tertiary border border-gold-primary/20 rounded-2xl p-8 h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gold-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-black-primary font-bold">IR</span>
              </div>
              <p className="text-gold-primary font-semibold">Est. 2024</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-gray-400 mb-4">
              Izzy&apos;s Reflections began with a simple idea: everyone deserves to express themselves and capture life&apos;s special moments. What started as a small custom printing operation has grown into a full-service creative studio offering both premium custom merchandise and cutting-edge 360° camera booth experiences.
            </p>
            <p className="text-gray-400">
              Our name reflects our belief that every project we work on is a reflection of our clients&apos; unique personalities, brands, and celebrations. We take pride in delivering products and experiences that exceed expectations every single time.
            </p>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="bg-black-secondary rounded-2xl p-8 md:p-12 mb-16 border border-gold-primary/20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission & Values</h2>
            <p className="text-gray-400">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black-tertiary p-6 rounded-xl shadow-sm border border-gold-primary/10">
              <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center mb-4 border border-gold-primary/20">
                <Target className="h-6 w-6 text-gold-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Quality First</h3>
              <p className="text-gray-400">
                We never compromise on quality. From the materials we use to the equipment we operate, everything meets our high standards.
              </p>
            </div>

            <div className="bg-black-tertiary p-6 rounded-xl shadow-sm border border-gold-primary/10">
              <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center mb-4 border border-gold-primary/20">
                <Heart className="h-6 w-6 text-gold-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Customer Care</h3>
              <p className="text-gray-400">
                Your satisfaction is our priority. We listen, we adapt, and we go above and beyond to make sure you&apos;re happy with the results.
              </p>
            </div>

            <div className="bg-black-tertiary p-6 rounded-xl shadow-sm border border-gold-primary/10">
              <div className="w-12 h-12 bg-gold-primary/10 rounded-full flex items-center justify-center mb-4 border border-gold-primary/20">
                <Sparkles className="h-6 w-6 text-gold-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Creative Innovation</h3>
              <p className="text-gray-400">
                We stay ahead of trends and technology to offer you the best creative solutions available. Innovation drives everything we do.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What We Offer</h2>
            <p className="text-gray-400">Two distinct services, one commitment to excellence</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black-secondary border-2 border-gold-primary/20 rounded-xl p-8 hover:border-gold-primary/40 transition-colors">
              <div className="w-14 h-14 bg-gold-primary rounded-full flex items-center justify-center mb-6">
                <Shirt className="h-7 w-7 text-black-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Custom Printing</h3>
              <p className="text-gray-400 mb-4">
                Premium custom printing on shirts, hats, and mugs. Perfect for:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-primary rounded-full mr-3"></span>
                  Business branding and uniforms
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-primary rounded-full mr-3"></span>
                  Event merchandise and gifts
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-primary rounded-full mr-3"></span>
                  Team sports and clubs
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-primary rounded-full mr-3"></span>
                  Personal projects and gifts
                </li>
              </ul>
            </div>

            <div className="bg-black-secondary border-2 border-gold-primary/20 rounded-xl p-8 hover:border-gold-primary/40 transition-colors">
              <div className="w-14 h-14 bg-gold-primary rounded-full flex items-center justify-center mb-6">
                <Camera className="h-7 w-7 text-black-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">360° Camera Booth</h3>
              <p className="text-gray-400 mb-4">
                Unforgettable video experiences for:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-primary rounded-full mr-3"></span>
                  Weddings and receptions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-primary rounded-full mr-3"></span>
                  Corporate events and parties
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-primary rounded-full mr-3"></span>
                  Birthday celebrations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-gold-primary rounded-full mr-3"></span>
                  Proms and formal events
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-black-secondary to-black-tertiary rounded-2xl p-8 md:p-12 mb-16 border border-gold-primary/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 text-gold-primary">1000+</div>
              <div className="text-gray-400">Products Printed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-gold-primary">50+</div>
              <div className="text-gray-400">Events Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-gold-primary">100%</div>
              <div className="text-gray-400">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-gold-primary">24h</div>
              <div className="text-gray-400">Response Time</div>
            </div>
          </div>
        </div>

        {/* Team Section Placeholder */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Meet the Team</h2>
          <p className="text-gray-400">The creative minds behind Izzy&apos;s Reflections</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-black-secondary border-2 border-gold-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="h-12 w-12 text-gold-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white">Isabella</h3>
            <p className="text-gold-primary mb-2">Founder & Creative Director</p>
            <p className="text-gray-400 text-sm">
              Visionary leader with a passion for bringing creative ideas to life
            </p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 bg-black-secondary border-2 border-gold-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="h-12 w-12 text-gold-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white">Production Team</h3>
            <p className="text-gold-primary mb-2">Expert Printers</p>
            <p className="text-gray-400 text-sm">
              Skilled craftsmen ensuring every print meets our quality standards
            </p>
          </div>

          <div className="text-center">
            <div className="w-32 h-32 bg-black-secondary border-2 border-gold-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="h-12 w-12 text-gold-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white">Event Team</h3>
            <p className="text-gold-primary mb-2">Booth Operators</p>
            <p className="text-gray-400 text-sm">
              Friendly professionals making every event memorable
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
