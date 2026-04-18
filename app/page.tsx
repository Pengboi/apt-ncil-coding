"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Phone, Mail, MapPin,
  ChevronLeft, ChevronRight, Star, CheckCircle, X,
  Video, Lock, DoorOpen, Network
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Variants } from "framer-motion";

// Animation variants - CarmoWood style
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// Solutions Data - Intercom focused
const solutions = [
  {
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=768&q=80",
    title: "Intercom Installation",
    subtitle: "Audio & Video Entry",
    description: "Complete installation of wired and wireless intercom systems for residential and commercial properties. Professional setup with minimal disruption.",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=768&q=80",
    title: "Access Control Systems",
    subtitle: "Secure Entry Management",
    description: "Keypad, card reader, and biometric access control solutions integrated with your intercom for seamless security management.",
  },
  {
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=768&q=80",
    title: "Video Entry Systems",
    subtitle: "Visual Identification",
    description: "HD video door entry systems with smartphone connectivity, allowing you to see and speak with visitors from anywhere.",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=768&q=80",
    title: "Gate & Barrier Integration",
    subtitle: "Automated Entry",
    description: "Integration of intercom systems with automated gates, barriers, and garage doors for complete access control.",
  },
];

// Projects Data - Intercom focused
const projects = [
  {
    category: "Residential",
    location: "Kensington, London",
    title: "Apartment Block Intercom",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=768&q=80",
  },
  {
    category: "Commercial",
    location: "Canary Wharf, London",
    title: "Office Access Control",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=768&q=80",
  },
  {
    category: "Residential",
    location: "Chelsea, London",
    title: "Townhouse Video Entry",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=768&q=80",
  },
  {
    category: "Commercial",
    location: "Hampstead, London",
    title: "Gate Entry System",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=768&q=80",
  },
];

// Testimonials Data
const testimonials = [
  {
    name: "James Mitchell",
    role: "Property Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    text: "Vision Electric installed intercom systems across our entire property portfolio in West London. The professionalism and quality of work was outstanding. Tenants love the new video entry systems.",
    project: "Multi-Block Installation",
  },
  {
    name: "Sarah Thompson",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    text: "From the initial consultation to installation completion, Vision Electric were excellent. Our new video intercom with smartphone connectivity gives us peace of mind, especially when we're away from home.",
    project: "Residential Video Entry",
  },
  {
    name: "David Chen",
    role: "Office Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    text: "We needed a comprehensive access control system for our new office. Vision Electric delivered on time and on budget. The integration with our existing infrastructure was seamless.",
    project: "Commercial Access Control",
  },
  {
    name: "Emma Wilson",
    role: "Development Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    text: "Vision Electric has been our go-to contractor for all electrical and intercom work across our developments. Their attention to detail and reliability is why we keep coming back.",
    project: "Multiple Developments",
  },
];

// Certifications
const certifications = [
  "NICEIC Approved",
  "Part P Registered",
  "18th Edition Qualified",
  "£5M Insurance",
  "CHAS Accredited",
  "SafeContractor",
];

// Partners
const partners = [
  "Savills", "Knight Frank", "JLL", "Foxtons", 
  "Hamptons", "Crest Nicholson", "Barratt Homes", "Berkeley Group"
];

// Articles
const articles = [
  {
    date: "15/01/2026",
    category: "Intercoms",
    title: "Choosing the Right Video Entry System for Your Property",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=768&q=80",
    excerpt: "A comprehensive guide to selecting video intercom systems for residential and commercial properties in London.",
  },
  {
    date: "08/12/2025",
    category: "Security",
    title: "Access Control Trends for 2026",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=768&q=80",
    excerpt: "Exploring the latest innovations in access control technology and what they mean for property security.",
  },
  {
    date: "22/11/2025",
    category: "Installation",
    title: "Smart Intercom Integration with Home Automation",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=768&q=80",
    excerpt: "How modern intercom systems integrate with smart home ecosystems for seamless control and monitoring.",
  },
];

export default function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Listen for custom event from Navigation
  useEffect(() => {
    const handleOpenContact = () => setIsContactOpen(true);
    window.addEventListener('openContactModal', handleOpenContact);
    return () => window.removeEventListener('openContactModal', handleOpenContact);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#ECEBE3]">
      {/* Hero Section - CarmoWood Style */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=80"
            alt="Modern building entrance with intercom"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-extrabold text-white mb-6 leading-[0.95] tracking-tight"
          >
            Vision Electric
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-light"
          >
            Professional intercom and access control installations across Greater London.
            Securing entrances with expertise and precision.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#2563eb] text-white hover:bg-[#2563eb]/90 px-8 py-6 text-base font-medium rounded-full"
              onClick={() => setIsContactOpen(true)}
            >
              Contact us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Trust Badges - Enterprise Clients */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-0 right-0 z-10"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4">
              <p className="text-white/60 text-xs uppercase tracking-[0.2em]">
                Powering Infrastructure For
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {/* Google */}
                <div className="text-2xl md:text-3xl font-heading font-bold text-white/90 hover:text-white transition-colors">
                  Google
                </div>
                {/* Microsoft */}
                <div className="text-2xl md:text-3xl font-heading font-bold text-white/90 hover:text-white transition-colors">
                  Microsoft
                </div>
                {/* Amazon */}
                <div className="text-2xl md:text-3xl font-heading font-bold text-white/90 hover:text-white transition-colors">
                  Amazon
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Solutions Section - Enhanced with better visual hierarchy */}
      <section id="services" className="py-32 bg-[#ECEBE3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-20">
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#31261D] mb-4"
              >
                Solutions
              </h2>
              <div className="w-24 h-1 bg-[#2563eb] rounded-full" />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group cursor-pointer"
                  onClick={() => scrollToSection('contact')}
                >
                  <div className="relative overflow-hidden mb-5 rounded-lg">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#2563eb] font-semibold uppercase tracking-wider mb-2">{solution.subtitle}</p>
                    <h3 className="text-xl font-heading font-bold text-[#31261D] mb-3 group-hover:text-[#2563eb] transition-colors duration-300">{solution.title}</h3>
                    <p className="text-[#31261D]/60 text-sm leading-relaxed">{solution.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Vision Electric Section - Enhanced with better spacing */}
      <section id="about" className="py-32 bg-[#31261D] relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <div className="w-full h-full bg-gradient-to-l from-white/10 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.05] mb-4">
                  Why Vision Electric
                </h2>
                <div className="w-24 h-1 bg-[#2563eb] rounded-full" />
              </div>
              
              <p className="text-lg text-white/80 leading-relaxed">
                Vision Electric is a NICEIC approved electrical contractor specializing in intercom 
                and access control systems, dedicated to delivering secure, compliant, and 
                high-quality installations for properties across Greater London.
              </p>
              
              <p className="text-white/70 leading-relaxed">
                With over two decades of accumulated expertise in electrical installations, 
                we combine technical knowledge, innovation, and rigorous safety standards to 
                create durable, efficient, and regulation-compliant security solutions.
              </p>

              <p className="text-white/70 leading-relaxed">
                We work closely with homeowners, property managers, architects, and developers 
                to transform security requirements into completed installations—from single 
                video entry systems to multi-block access control networks.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#2563eb]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-[#2563eb]" />
                    </div>
                    <span className="text-sm text-white/90">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={scaleIn}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                  alt="Intercom installation work"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2563eb]/20 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Enhanced with better card design */}
      <section id="projects" className="py-32 bg-[#ECEBE3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
              <motion.div variants={fadeInUp}>
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#31261D] mb-4"
                >
                  Projects
                </h2>
                <div className="w-24 h-1 bg-[#2563eb] rounded-full" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Button 
                  variant="outline" 
                  className="border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white rounded-full px-6 py-3 font-medium transition-all duration-300"
                >
                  View all projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                >
                  <Card 
                    className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Badge className="bg-white/95 text-[#31261D] hover:bg-white font-medium shadow-sm">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-3 w-3 text-[#2563eb]" />
                        <p className="text-xs text-[#AD9677] font-medium">{project.location}</p>
                      </div>
                      <h3 className="text-lg font-heading font-bold text-[#31261D] group-hover:text-[#2563eb] transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Banner - Enhanced with better visual impact */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
            alt="Access control systems"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#31261D]/90 via-[#31261D]/70 to-[#31261D]/90" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                Check Out Our Portfolio of Installations
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                From residential intercom systems to enterprise data center installations, 
                see our complete range of completed projects.
              </p>
              <Button 
                size="lg"
                className="bg-[#2563eb] text-white hover:bg-[#2563eb]/90 px-10 py-7 text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Full Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced with better layout */}
      <section className="py-32 bg-[#ECEBE3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <div className="mb-16">
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#31261D] mb-4"
              >
                Testimonials
              </h2>
              <div className="w-24 h-1 bg-[#2563eb] rounded-full" />
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-white rounded-2xl p-10 shadow-xl"
                >
                  <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
                    <div className="text-center">
                      <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-[#2563eb]/20">
                        <Image
                          src={testimonials[currentTestimonial].image}
                          alt={testimonials[currentTestimonial].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#2563eb] text-[#2563eb]" />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <blockquote className="text-xl md:text-2xl text-[#31261D] leading-relaxed mb-6 font-heading font-medium italic">
                        &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                      </blockquote>
                      
                      <div className="space-y-1">
                        <p className="font-bold text-[#31261D] text-lg">
                          {testimonials[currentTestimonial].name}
                        </p>
                        <p className="text-[#AD9677]">
                          {testimonials[currentTestimonial].role}
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                          <div className="w-8 h-px bg-[#2563eb]" />
                          <p className="text-sm text-[#2563eb] font-medium">
                            {testimonials[currentTestimonial].project}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-center items-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-[#2563eb] w-8' 
                        : 'bg-[#AD9677]/30 w-2 hover:bg-[#AD9677]/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section - Enhanced with better styling */}
      <section className="py-20 bg-[#ECEBE3] border-y border-[#DBC8B6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-center text-[#AD9677] text-sm uppercase tracking-[0.2em] mb-10">
              Trusted By Leading Property Partners
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {partners.map((partner, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="text-center"
                >
                  <div className="text-lg md:text-xl font-heading font-bold text-[#31261D]/40 hover:text-[#2563eb] transition-colors duration-300">
                    {partner}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Section - Enhanced with better card design */}
      <section className="py-32 bg-[#ECEBE3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
              <motion.div variants={fadeInUp}>
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#31261D] mb-4"
                >
                  Articles
                </h2>
                <div className="w-24 h-1 bg-[#2563eb] rounded-full" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Button 
                  variant="outline" 
                  className="border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white rounded-full px-6 py-3 font-medium transition-all duration-300"
                >
                  View all articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white h-full">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4 text-sm">
                        <Badge variant="secondary" className="text-[#2563eb] bg-[#2563eb]/10 border-0 font-medium">
                          {article.category}
                        </Badge>
                        <span className="text-[#AD9677]">{article.date}</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-[#31261D] group-hover:text-[#2563eb] transition-colors mb-3 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-[#31261D]/60 text-sm leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section - Enhanced with better visual hierarchy */}
      <section id="contact" className="py-32 bg-[#31261D] relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight"
              >
                Ready to Secure Your Property?
              </h2>
              <div className="w-24 h-1 bg-[#2563eb] rounded-full mx-auto mb-8" />
            </motion.div>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Get a free, no-obligation quote for your intercom or access control installation. 
              We respond within 24 hours.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <Button 
                size="lg"
                className="bg-[#2563eb] text-white hover:bg-[#2563eb]/90 px-10 py-7 text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setIsContactOpen(true)}
              >
                Contact us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal - CarmoWood Style */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden bg-[#ECEBE3] border-[#DBC8B6]">
          <div className="relative h-32 bg-[#2563eb]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
            <div className="relative z-10 p-6 flex items-end h-full">
              <div>
                <p className="text-white/80 text-sm uppercase tracking-[0.2em] mb-1">Get in Touch</p>
                <DialogHeader className="text-left">
                  <DialogTitle className="text-2xl font-heading font-bold text-white">
                    Contact us
                  </DialogTitle>
                </DialogHeader>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsContactOpen(false); }}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-[#31261D]">Name *</Label>
                  <Input 
                    id="contact-name" 
                    placeholder="Your name" 
                    className="bg-white border-[#DBC8B6] focus:border-[#2563eb] rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-[#31261D]">Email *</Label>
                  <Input 
                    id="contact-email" 
                    type="email" 
                    placeholder="your@email.com" 
                    className="bg-white border-[#DBC8B6] focus:border-[#2563eb] rounded-lg"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-phone" className="text-[#31261D]">Telephone *</Label>
                <Input 
                  id="contact-phone" 
                  placeholder="+44 20 1234 5678" 
                  className="bg-white border-[#DBC8B6] focus:border-[#2563eb] rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-address" className="text-[#31261D]">Address</Label>
                <Input 
                  id="contact-address" 
                  placeholder="Your address" 
                  className="bg-white border-[#DBC8B6] focus:border-[#2563eb] rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-service" className="text-[#31261D]">Service Required</Label>
                <Input 
                  id="contact-service" 
                  placeholder="e.g., Video intercom, Access control, etc." 
                  className="bg-white border-[#DBC8B6] focus:border-[#2563eb] rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-[#31261D]">Message</Label>
                <Textarea 
                  id="contact-message" 
                  placeholder="Tell us about your project..."
                  rows={4}
                  className="bg-white border-[#DBC8B6] focus:border-[#2563eb] rounded-lg"
                />
              </div>
              
              <div className="flex items-start gap-2">
                <input type="checkbox" id="consent" className="mt-1 accent-[#2563eb]" />
                <Label htmlFor="consent" className="text-sm font-normal text-[#31261D]/70">
                  I have read and agree to the Privacy Policy.
                </Label>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-[#2563eb] text-white hover:bg-[#2563eb]/90 py-6 rounded-full font-medium"
              >
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
