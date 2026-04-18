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

      {/* Solutions Section - CarmoWood Grid Style */}
      <section id="services" className="py-24 bg-[#ECEBE3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#31261D] mb-16"
            >
              Solutions
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group cursor-pointer"
                  onClick={() => scrollToSection('contact')}
                >
                  <Card className="overflow-hidden border-0 shadow-none bg-transparent">
                    <div className="relative aspect-[4/3] overflow-hidden mb-4">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardContent className="p-0">
                      <p className="text-sm text-[#AD9677] font-medium mb-1">{solution.subtitle}</p>
                      <h3 className="text-xl font-heading font-bold text-[#31261D] mb-2">{solution.title}</h3>
                      <p className="text-[#31261D]/60 text-sm line-clamp-2">{solution.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Vision Electric Section - CarmoWood Style */}
      <section id="about" className="py-24 bg-[#31261D]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[0.95]">
                Why Vision Electric
              </h2>
              
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

              <div className="flex flex-wrap gap-3 pt-4">
                {certifications.map((cert, index) => (
                  <Badge key={index} variant="secondary" className="px-4 py-2 text-sm bg-white/10 text-white border-0">
                    <CheckCircle className="h-3 w-3 mr-1 text-[#2563eb]" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={scaleIn}
              className="relative aspect-[4/3] lg:aspect-square overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                alt="Intercom installation work"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section - CarmoWood Carousel Style */}
      <section id="projects" className="py-24 bg-[#ECEBE3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#31261D]"
              >
                Projects
              </motion.h2>
              <motion.div variants={fadeInUp}>
                <Button 
                  variant="outline" 
                  className="border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white rounded-full"
                >
                  know more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map((project, index) => (
                  <Card 
                    key={index} 
                    className="group overflow-hidden border-0 shadow-none bg-transparent cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden mb-4">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-[#ECEBE3]/90 text-[#31261D] hover:bg-[#ECEBE3] font-medium">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-0">
                      <p className="text-sm text-[#AD9677] mb-1">{project.location}</p>
                      <h3 className="text-lg font-heading font-bold text-[#31261D] group-hover:text-[#2563eb] transition-colors">
                        {project.title}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Check Portfolio Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
            alt="Access control systems"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#31261D]/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
            Check Out Our Portfolio of Installations
          </h2>
          <Button 
            size="lg"
            className="bg-[#2563eb] text-white hover:bg-[#2563eb]/90 px-8 py-6 text-base font-medium rounded-full"
          >
            Check our portfolio
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Testimonials Section - CarmoWood Carousel */}
      <section className="py-24 bg-[#ECEBE3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#31261D] mb-16"
          >
            Testimonials
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <blockquote className="text-xl md:text-2xl text-[#31261D] leading-relaxed mb-8 font-heading font-medium">
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </blockquote>
                
                <div className="space-y-1">
                  <p className="font-bold text-[#31261D] text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-[#AD9677]">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-sm text-[#2563eb]">
                    Project: {testimonials[currentTestimonial].project}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-[#2563eb] w-8' 
                      : 'bg-[#AD9677]/30 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-[#ECEBE3] border-y border-[#DBC8B6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[#AD9677] text-sm uppercase tracking-[0.2em] mb-8">
            Trusted By Leading Property Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="text-xl font-heading font-bold text-[#31261D]/30 hover:text-[#2563eb] transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles/Blog Section - CarmoWood Style */}
      <section className="py-24 bg-[#ECEBE3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#31261D]"
              >
                Articles
              </motion.h2>
              <motion.div variants={fadeInUp}>
                <Button 
                  variant="outline" 
                  className="border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white rounded-full"
                >
                  know more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="group overflow-hidden border-0 shadow-none bg-transparent cursor-pointer h-full">
                    <div className="relative aspect-[16/10] overflow-hidden mb-4">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3 mb-3 text-sm text-[#AD9677]">
                        <span>{article.date}</span>
                        <span>•</span>
                        <Badge variant="secondary" className="text-[#2563eb] bg-[#2563eb]/10 border-0">
                          {article.category}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-[#31261D] group-hover:text-[#2563eb] transition-colors mb-3">
                        {article.title}
                      </h3>
                      <p className="text-[#31261D]/60 text-sm line-clamp-2">
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

      {/* Footer Contact CTA */}
      <section id="contact" className="py-24 bg-[#31261D]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6"
            >
              Ready to Secure Your Property?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-white/70 max-w-2xl mx-auto mb-8"
            >
              Get a free, no-obligation quote for your intercom or access control installation. 
              We respond within 24 hours.
            </motion.p>
            <motion.div variants={fadeInUp}>
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
